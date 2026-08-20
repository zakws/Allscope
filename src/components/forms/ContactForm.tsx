"use client";

import { useActionState, useEffect } from "react";
import { Field, fieldAria } from "@/components/ui/Field";
import { ErrorSummary, FormResult } from "@/components/ui/FormStatus";
import { submitContact } from "@/lib/actions";
import { track } from "@/lib/analytics";
import { site } from "@/content/site";
import { Honeypot } from "./Honeypot";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  useEffect(() => {
    if (state?.ok) track("contact_submission");
  }, [state]);

  if (state?.ok) {
    return (
      <FormResult
        state={state}
        successHeading="Message received"
        whatHappensNext={site.responseWording}
      />
    );
  }

  const err = (key: string) => (state && !state.ok ? state.fieldErrors?.[key] : undefined);

  return (
    <form action={formAction} noValidate className="relative space-y-5">
      <Honeypot />
      <ErrorSummary state={state} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="fullName" label="Full name" required error={err("fullName")}>
          <input className="field-input" name="fullName" autoComplete="name" required {...fieldAria("fullName", err("fullName"))} />
        </Field>
        <Field id="company" label="Company" optionalLabel error={err("company")}>
          <input className="field-input" name="company" autoComplete="organization" {...fieldAria("company", err("company"))} />
        </Field>
        <Field id="email" label="Email" required error={err("email")}>
          <input className="field-input" type="email" name="email" autoComplete="email" required {...fieldAria("email", err("email"))} />
        </Field>
        <Field id="phone" label="Phone" optionalLabel error={err("phone")}>
          <input className="field-input" type="tel" name="phone" autoComplete="tel" {...fieldAria("phone", err("phone"))} />
        </Field>
      </div>
      <Field id="message" label="How can Allscope help?" required error={err("message")}>
        <textarea className="field-input min-h-36" name="message" required {...fieldAria("message", err("message"))} />
      </Field>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          className="mt-1 h-5 w-5 shrink-0 accent-(--brand-red)"
          aria-invalid={err("privacyConsent") ? true : undefined}
          aria-describedby={err("privacyConsent") ? "contact-consent-error" : undefined}
        />
        <label htmlFor="privacyConsent" className="text-[0.9rem] leading-relaxed text-ink-2">
          I have read the privacy statement and consent to being contacted about this
          enquiry.
        </label>
      </div>
      {err("privacyConsent") && (
        <p id="contact-consent-error" className="text-[0.8rem] font-medium text-error">
          {err("privacyConsent")}
        </p>
      )}
      <button
        type="submit"
        className="btn-solid min-h-[44px] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        aria-busy={pending}
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
