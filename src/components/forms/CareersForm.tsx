"use client";

import { useActionState, useEffect } from "react";
import { Btn } from "@/components/ui/Btn";
import { Field, fieldAria } from "@/components/ui/Field";
import { FileUploader } from "@/components/ui/FileUploader";
import { ErrorSummary, FormResult } from "@/components/ui/FormStatus";
import { submitCareers } from "@/lib/actions";
import { track } from "@/lib/analytics";
import { careerRoles } from "@/content/process";
import { Honeypot } from "./Honeypot";

export function CareersForm() {
  const [state, formAction, pending] = useActionState(submitCareers, null);

  useEffect(() => {
    if (state?.ok) track("careers_application");
  }, [state]);

  if (state?.ok) {
    return (
      <FormResult
        state={state}
        successHeading="Expression of interest received"
        whatHappensNext="If your experience fits a current or upcoming crew, Allscope will be in touch. Your details are kept private and used only for recruitment."
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
        <Field id="roleInterest" label="Role you're interested in" required error={err("roleInterest")}>
          <select className="field-input" name="roleInterest" defaultValue="" required {...fieldAria("roleInterest", err("roleInterest"))}>
            <option value="" disabled>
              Select…
            </option>
            {careerRoles.map((r) => (
              <option key={r.title}>{r.title}</option>
            ))}
            <option>Other / general</option>
          </select>
        </Field>
        <Field id="email" label="Email" required error={err("email")}>
          <input className="field-input" type="email" name="email" autoComplete="email" required {...fieldAria("email", err("email"))} />
        </Field>
        <Field id="phone" label="Phone" required error={err("phone")}>
          <input className="field-input" type="tel" name="phone" autoComplete="tel" required {...fieldAria("phone", err("phone"))} />
        </Field>
      </div>
      <Field
        id="tickets"
        label="Tickets and licences"
        optionalLabel
        error={err("tickets")}
        description="e.g. White Card, EWP, first aid, driver's licence class."
      >
        <input className="field-input" name="tickets" {...fieldAria("tickets", err("tickets"), true)} />
      </Field>
      <Field
        id="experience"
        label="Experience summary"
        required
        error={err("experience")}
        description="A few lines: the kind of work you've done, and the crews or projects you've worked on."
      >
        <textarea className="field-input min-h-32" name="experience" required {...fieldAria("experience", err("experience"), true)} />
      </Field>
      <div>
        <p className="mb-2 text-[0.9rem] font-medium text-ink">CV or tickets <span className="text-[0.75rem] font-normal text-ink-3">optional</span></p>
        <FileUploader name="cv" label="CV or ticket files" maxFiles={3} />
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          className="mt-1 h-5 w-5 shrink-0 accent-(--signal-orange)"
          aria-invalid={err("privacyConsent") ? true : undefined}
          aria-describedby={err("privacyConsent") ? "careers-consent-error" : undefined}
        />
        <label htmlFor="privacyConsent" className="text-[0.9rem] leading-relaxed text-ink-2">
          I have read the privacy statement and consent to Allscope holding these
          details for recruitment purposes.
        </label>
      </div>
      {err("privacyConsent") && (
        <p id="careers-consent-error" className="text-[0.8rem] font-medium text-error">
          {err("privacyConsent")}
        </p>
      )}
      <Btn type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Sending…" : "Submit expression of interest"}
      </Btn>
    </form>
  );
}
