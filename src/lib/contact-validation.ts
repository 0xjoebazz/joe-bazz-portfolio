import { serviceOptions } from "@/content/contact";

export type ContactFormValues = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export type ContactField = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactValidationResult =
  | { success: true; data: ContactFormValues }
  | { success: false; errors: ContactFieldErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactField(
  field: ContactField,
  value: unknown,
): string | undefined {
  const trimmedValue = getStringValue(value);

  switch (field) {
    case "name":
      if (trimmedValue.length < 2 || trimmedValue.length > 100) {
        return "Name must be between 2 and 100 characters.";
      }
      return undefined;
    case "email":
      if (
        trimmedValue.length > 254 ||
        !emailPattern.test(trimmedValue)
      ) {
        return "Enter a valid email address (maximum 254 characters).";
      }
      return undefined;
    case "service":
      if (!serviceOptions.some((option) => option === trimmedValue)) {
        return "Choose one of the listed services.";
      }
      return undefined;
    case "message":
      if (trimmedValue.length < 10 || trimmedValue.length > 2000) {
        return "Message must be between 10 and 2000 characters.";
      }
      return undefined;
  }
}

export function validateContact(value: unknown): ContactValidationResult {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {
      success: false,
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address.",
        service: "Choose one of the listed services.",
        message: "Enter a message.",
      },
    };
  }

  const input = value as Record<string, unknown>;
  const data: ContactFormValues = {
    name: getStringValue(input.name),
    email: getStringValue(input.email),
    service: getStringValue(input.service),
    message: getStringValue(input.message),
  };
  const errors: ContactFieldErrors = {};

  for (const field of ["name", "email", "service", "message"] as const) {
    const error = validateContactField(field, data[field]);
    if (error) errors[field] = error;
  }

  return Object.keys(errors).length > 0
    ? { success: false, errors }
    : { success: true, data };
}
