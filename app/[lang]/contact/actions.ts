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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramNotification({
  name,
  email,
  company,
  message,
  locale,
}: {
  name: string;
  email: string;
  company?: string;
  message: string;
  locale: string;
}): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("[contact] (dev mode: no Telegram credentials) submission:", {
      name,
      email,
      company,
      message,
      locale,
    });
    return true;
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "N/A");
  const safeMessage = escapeHtml(message);

  const text =
    `📬 <b>New Contact Inquiry - USelf Labs</b>\n\n` +
    `👤 <b>Name:</b> ${safeName}\n` +
    `📧 <b>Email:</b> ${safeEmail}\n` +
    `🏢 <b>Company:</b> ${safeCompany}\n` +
    `🌐 <b>Language:</b> ${locale.toUpperCase()}\n\n` +
    `💬 <b>Message:</b>\n${safeMessage}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const errData = await res.text();
      console.error("[contact] Telegram API error:", errData);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Failed to send Telegram notification:", err);
    return false;
  }
}

export async function submitContactForm(
  locale: Locale,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const dictionary = getDictionary(locale);
  const validation = dictionary.contact.form.validation;

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

  const sent = await sendTelegramNotification({
    name,
    email,
    company,
    message,
    locale,
  });

  if (!sent && process.env.TELEGRAM_BOT_TOKEN) {
    return {
      status: "error",
      errors: {
        message: dictionary.contact.form.error.body,
      },
    };
  }

  return { status: "success", errors: {} };
}
