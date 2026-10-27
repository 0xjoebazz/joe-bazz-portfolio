"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contact, serviceOptions } from "@/content/contact";
import {
  validateContact,
  validateContactField,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/contact-validation";

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  service: "",
  message: "",
};

const fieldOrder: ContactField[] = ["name", "email", "service", "message"];

export function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const sendingRef = useRef(false);
  const fieldRefs = useRef<
    Record<ContactField, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>
  >({
    name: null,
    email: null,
    service: null,
    message: null,
  });

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setResult(null);
    setErrors((current) => {
      if (!(field in current)) return current;
      const error = validateContactField(field, value);
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }

  function validateField(field: ContactField, value: string) {
    const error = validateContactField(field, value);
    setErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = event.currentTarget;
    const validation = validateContact(values);
    if (!validation.success) {
      setErrors(validation.errors);
      setResult(null);
      const firstInvalidField = fieldOrder.find(
        (field) => validation.errors[field],
      );
      if (firstInvalidField) fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    const formData = new FormData(form);
    const website = formData.get("website");
    sendingRef.current = true;
    setIsSending(true);
    setErrors({});
    setResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          website: typeof website === "string" ? website : "",
        }),
      });

      const responseBody: unknown = await response.json();
      if (
        !response.ok ||
        typeof responseBody !== "object" ||
        responseBody === null ||
        !("success" in responseBody) ||
        responseBody.success !== true
      ) {
        throw new Error("Contact submission failed.");
      }

      setValues(emptyValues);
      setErrors({});
      form.reset();
      setResult("success");
    } catch {
      setResult("error");
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSending}
      className="min-w-0 space-y-5 rounded-xl border border-subtle bg-surface/40 p-5 sm:p-7"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm font-medium"
        >
          Name <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          ref={(element) => {
            fieldRefs.current.name = element;
          }}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          onBlur={(event) => validateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="min-h-11 w-full rounded-lg border border-subtle bg-background/70 px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {errors.name ? (
          <p id="contact-name-error" className="mt-1 text-sm text-red-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-sm font-medium"
        >
          Email <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          ref={(element) => {
            fieldRefs.current.email = element;
          }}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={(event) => validateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="min-h-11 w-full rounded-lg border border-subtle bg-background/70 px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {errors.email ? (
          <p id="contact-email-error" className="mt-1 text-sm text-red-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-service"
          className="mb-2 block text-sm font-medium"
        >
          Service <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <select
          ref={(element) => {
            fieldRefs.current.service = element;
          }}
          id="contact-service"
          name="service"
          required
          value={values.service}
          onChange={(event) => updateField("service", event.target.value)}
          onBlur={(event) => validateField("service", event.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={
            errors.service ? "contact-service-error" : undefined
          }
          className="min-h-11 w-full rounded-lg border border-subtle bg-background-secondary px-3 py-2 text-foreground focus:border-accent focus:outline-none"
        >
          <option value="">Select a service</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service ? (
          <p id="contact-service-error" className="mt-1 text-sm text-red-300">
            {errors.service}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium"
        >
          Message <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <textarea
          ref={(element) => {
            fieldRefs.current.message = element;
          }}
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          onBlur={(event) => validateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className="min-h-32 w-full resize-y rounded-lg border border-subtle bg-background/70 px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1 text-sm text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {result === "success" ? (
        <p role="status" className="text-sm text-accent">
          {contact.copy.successMessage}
        </p>
      ) : null}
      {result === "error" ? (
        <p role="alert" className="text-sm text-red-300">
          {contact.copy.errorMessage}{" "}
          <a
            href={`mailto:${contact.email}`}
            className="min-h-11 break-all text-foreground underline underline-offset-4 hover:text-accent"
          >
            {contact.email}
          </a>
        </p>
      ) : null}

      <Button type="submit" disabled={isSending} className="w-full sm:w-auto">
        {isSending ? "Sending..." : contact.copy.submitLabel}
      </Button>
    </form>
  );
}
