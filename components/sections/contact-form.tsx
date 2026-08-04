"use client";

import { useActionState, useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/[lang]/contact/actions";

const initialState: ContactFormState = { status: "idle", errors: {} };

/** Field order is also the order errors are focused in. */
const FIELD_ORDER = ["name", "email", "message"] as const;

export function ContactForm({
  locale,
  form,
}: {
  locale: Locale;
  form: Dictionary["contact"]["form"];
}) {
  const action = submitContactForm.bind(null, locale);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Move focus to the first invalid field so keyboard and screen reader users
  // are not left to hunt for what failed.
  useEffect(() => {
    if (state.status !== "error") return;
    const firstInvalid = FIELD_ORDER.find((key) => state.errors[key]);
    if (!firstInvalid) return;
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
      ?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[10px] border border-border bg-surface-raised p-8"
      >
        <h2 className="text-xl font-semibold text-text-primary">
          {form.success.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {form.success.body}
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-5"
      noValidate
    >
      <div aria-live="polite">
        {state.status === "error" && (
          <div className="rounded-[10px] border border-danger-border bg-danger-surface px-4 py-3 text-sm">
            <p className="font-semibold text-danger-text">{form.error.title}</p>
            <p className="mt-1 text-text-muted">{form.error.body}</p>
          </div>
        )}
      </div>

      <Field
        id="name"
        name="name"
        label={form.name.label}
        helper={form.name.helper}
        error={state.errors.name}
        autoComplete="name"
      />
      <Field
        id="email"
        name="email"
        type="email"
        inputMode="email"
        spellCheck={false}
        label={form.email.label}
        helper={form.email.helper}
        error={state.errors.email}
        autoComplete="email"
      />
      <Field
        id="company"
        name="company"
        label={form.company.label}
        helper={form.company.helper}
        autoComplete="organization"
      />
      <Field
        id="message"
        name="message"
        label={form.message.label}
        helper={form.message.helper}
        error={state.errors.message}
        autoComplete="off"
        textarea
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-accent-solid px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-solid-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? form.submitting : form.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  helper,
  error,
  type = "text",
  inputMode,
  autoComplete,
  spellCheck,
  textarea,
}: {
  id: string;
  name: string;
  label: string;
  helper?: string;
  error?: string;
  type?: string;
  inputMode?: "email" | "tel" | "url" | "text";
  autoComplete?: string;
  spellCheck?: boolean;
  textarea?: boolean;
}) {
  const describedBy =
    [helper && `${id}-helper`, error && `${id}-error`]
      .filter(Boolean)
      .join(" ") || undefined;

  const fieldClassName = `rounded-[10px] border bg-surface px-4 py-3 text-sm text-text-primary transition-colors ${
    error ? "border-danger-border" : "border-border-strong"
  }`;

  const shared = {
    id,
    name,
    autoComplete,
    spellCheck,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    className: fieldClassName,
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      {textarea ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} />
      )}
      {helper && (
        <p id={`${id}-helper`} className="text-xs text-text-muted">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
