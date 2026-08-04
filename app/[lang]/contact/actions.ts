"use server";

import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  locale: Locale,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validation = getDictionary(locale).contact.form.validation;

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactFormState["errors"] = {};
  if (!name) errors.name = validation.nameRequired;
  if (!email) errors.email = validation.emailRequired;
  else if (!EMAIL_PATTERN.test(email)) errors.email = validation.emailInvalid;
  if (!message) errors.message = validation.messageRequired;

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  // TODO(user): wire this up to a real email or CRM service (e.g. Resend,
  // Postmark, HubSpot). For now submissions are only logged server-side.
  console.log("[contact] new submission", { name, email, company, message });

  return { status: "success", errors: {} };
}
