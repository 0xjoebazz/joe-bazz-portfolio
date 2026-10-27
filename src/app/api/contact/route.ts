import { Resend } from "resend";
import { validateContact } from "@/lib/contact-validation";

const MAX_BODY_BYTES = 10 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, { status });
}

function methodNotAllowed() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}

async function readBodyWithinLimit(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return { tooLarge: true as const };
  }

  if (!request.body) return { text: "", tooLarge: false as const };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return { tooLarge: true as const };
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return {
      text: new TextDecoder("utf-8", { fatal: true }).decode(body),
      tooLarge: false as const,
    };
  } catch {
    return { invalidEncoding: true as const };
  }
}

function isRateLimited(ip: string, now: number) {
  const current = rateLimit.get(ip);
  if (current && current.resetAt > now) {
    if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
    current.count += 1;
    return false;
  }

  rateLimit.set(ip, {
    count: 1,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  });

  if (rateLimit.size > 1000) {
    for (const [key, entry] of rateLimit) {
      if (entry.resetAt <= now) rateLimit.delete(key);
    }
  }

  return false;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function sanitizeSubjectValue(value: string) {
  return value.replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, "");
}

export async function POST(request: Request) {
  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const bodyResult = await readBodyWithinLimit(request);
  if ("tooLarge" in bodyResult && bodyResult.tooLarge) {
    return jsonResponse({ error: "Request body is too large." }, 413);
  }
  if ("invalidEncoding" in bodyResult) {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyResult.text);
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  if (
    typeof body === "object" &&
    body !== null &&
    !Array.isArray(body) &&
    "website" in body &&
    body.website !== undefined &&
    body.website !== null &&
    (typeof body.website !== "string" || body.website.length > 0)
  ) {
    return jsonResponse({ success: true }, 200);
  }

  const validation = validateContact(body);
  if (!validation.success) {
    return jsonResponse(
      { error: "Please correct the highlighted fields.", fieldErrors: validation.errors },
      400,
    );
  }

  // This in-memory limit is only a light safeguard on serverless hosting.
  if (isRateLimited(getClientIp(request), Date.now())) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "Contact email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
    );
    return jsonResponse({ error: "Unable to send your message." }, 500);
  }

  const { name, email, service, message } = validation.data;
  const subject = `New portfolio message: ${sanitizeSubjectValue(service)} from ${sanitizeSubjectValue(name)}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });

    if (error || !data?.id) {
      console.error("Resend failed to send a contact email.");
      return jsonResponse({ error: "Unable to send your message." }, 500);
    }
  } catch {
    console.error("Resend failed to send a contact email.");
    return jsonResponse({ error: "Unable to send your message." }, 500);
  }

  return jsonResponse({ success: true }, 200);
}

export function GET() {
  return methodNotAllowed();
}

export function HEAD() {
  return methodNotAllowed();
}

export function PUT() {
  return methodNotAllowed();
}

export function PATCH() {
  return methodNotAllowed();
}

export function DELETE() {
  return methodNotAllowed();
}

export function OPTIONS() {
  return methodNotAllowed();
}
