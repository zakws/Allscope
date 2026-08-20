"use client";

import { useActionState, useEffect, useRef } from "react";
import { Arrow } from "@/components/cinema/Editorial";
import { Field, fieldAria } from "@/components/ui/Field";
import { FileUploader } from "@/components/ui/FileUploader";
import { ErrorSummary, FormResult } from "@/components/ui/FormStatus";
import { submitTender } from "@/lib/actions";
import { track } from "@/lib/analytics";
import { site } from "@/content/site";
import { Honeypot } from "./Honeypot";

const sectorOptions = ["Commercial", "Multi-residential", "Industrial", "Mixed-use", "Hospitality", "Other"];
const stageOptions = ["Tender / pricing", "Early contractor involvement", "Awarded, mobilising", "Under construction", "Other"];
const packageOptions = [
  "Placement and finishing",
  "Suspended slabs / podium",
  "Basement / below-ground",
  "Live-site / staged works",
  "Industrial slab / floor",
  "Not sure, see scope summary",
];

/**
 * Tender submission: a well-sectioned single form (numbered fieldsets) rather
 * than a wizard, so nothing is lost between steps and the whole package can be
 * reviewed before sending. All validation is duplicated server-side.
 */
export function TenderForm() {
  const [state, formAction, pending] = useActionState(submitTender, null);
  const startedTracked = useRef(false);

  useEffect(() => {
    if (!state) return;
    if (state.ok) track("tender_submit");
    else track("tender_validation_failure");
  }, [state]);

  if (state?.ok) {
    return (
      <FormResult
        state={state}
        successHeading="Package received"
        whatHappensNext={`${site.responseWording} Keep your reference handy if you call.`}
      />
    );
  }

  const err = (key: string) => (state && !state.ok ? state.fieldErrors?.[key] : undefined);

  return (
    <form
      action={formAction}
      noValidate
      className="relative space-y-12"
      aria-describedby="tender-form-note"
      onFocusCapture={() => {
        if (!startedTracked.current) {
          startedTracked.current = true;
          track("tender_start");
        }
      }}
    >
      <Honeypot />
      <ErrorSummary state={state} />

      <fieldset className="space-y-5">
        <legend className="flex items-center gap-3">
          <span className="tech-label text-red-350">01</span>
          <span className="display text-2xl text-ink">Your details</span>
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="company" label="Company" required error={err("company")}>
            <input className="field-input" name="company" autoComplete="organization" required {...fieldAria("company", err("company"))} />
          </Field>
          <Field id="fullName" label="Full name" required error={err("fullName")}>
            <input className="field-input" name="fullName" autoComplete="name" required {...fieldAria("fullName", err("fullName"))} />
          </Field>
          <Field id="role" label="Role" required error={err("role")} description="e.g. Estimator, Contracts Administrator, Project Manager">
            <input className="field-input" name="role" required {...fieldAria("role", err("role"), true)} />
          </Field>
          <Field id="preferredContact" label="Preferred contact" required error={err("preferredContact")}>
            <select className="field-input" name="preferredContact" defaultValue="email" {...fieldAria("preferredContact", err("preferredContact"))}>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </Field>
          <Field id="email" label="Email" required error={err("email")}>
            <input className="field-input" type="email" name="email" autoComplete="email" required {...fieldAria("email", err("email"))} />
          </Field>
          <Field id="phone" label="Phone" required error={err("phone")}>
            <input className="field-input" type="tel" name="phone" autoComplete="tel" required {...fieldAria("phone", err("phone"))} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="flex items-center gap-3">
          <span className="tech-label text-red-350">02</span>
          <span className="display text-2xl text-ink">Project</span>
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="projectName" label="Project name" required error={err("projectName")}>
            <input className="field-input" name="projectName" required {...fieldAria("projectName", err("projectName"))} />
          </Field>
          <Field id="siteAddress" label="Site address / suburb" required error={err("siteAddress")}>
            <input className="field-input" name="siteAddress" required {...fieldAria("siteAddress", err("siteAddress"))} />
          </Field>
          <Field id="builder" label="Builder / developer" optionalLabel error={err("builder")}>
            <input className="field-input" name="builder" {...fieldAria("builder", err("builder"))} />
          </Field>
          <Field id="sector" label="Sector" required error={err("sector")}>
            <select className="field-input" name="sector" defaultValue="" required {...fieldAria("sector", err("sector"))}>
              <option value="" disabled>
                Select…
              </option>
              {sectorOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field id="stage" label="Current stage" required error={err("stage")}>
            <select className="field-input" name="stage" defaultValue="" required {...fieldAria("stage", err("stage"))}>
              <option value="" disabled>
                Select…
              </option>
              {stageOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field id="expectedStart" label="Expected start on site" optionalLabel error={err("expectedStart")}>
            <input className="field-input" type="month" name="expectedStart" {...fieldAria("expectedStart", err("expectedStart"))} />
          </Field>
          <Field id="tenderClose" label="Tender closing date" optionalLabel error={err("tenderClose")}>
            <input className="field-input" type="date" name="tenderClose" {...fieldAria("tenderClose", err("tenderClose"))} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="flex items-center gap-3">
          <span className="tech-label text-red-350">03</span>
          <span className="display text-2xl text-ink">Package</span>
        </legend>
        <Field
          id="scopeSummary"
          label="Scope summary"
          required
          error={err("scopeSummary")}
          description="A few lines is enough: what's being poured, roughly how much, and anything unusual."
        >
          <textarea className="field-input min-h-32" name="scopeSummary" required {...fieldAria("scopeSummary", err("scopeSummary"), true)} />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="packageType" label="Closest package type" required error={err("packageType")}>
            <select className="field-input" name="packageType" defaultValue="" required {...fieldAria("packageType", err("packageType"))}>
              <option value="" disabled>
                Select…
              </option>
              {packageOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field id="volumeEstimate" label="Estimated concrete volume" optionalLabel error={err("volumeEstimate")} description="If known, e.g. 3,000 m³">
            <input className="field-input" name="volumeEstimate" {...fieldAria("volumeEstimate", err("volumeEstimate"), true)} />
          </Field>
        </div>
        <Field id="programmeNote" label="Programme or sequencing note" optionalLabel error={err("programmeNote")}>
          <textarea className="field-input min-h-24" name="programmeNote" {...fieldAria("programmeNote", err("programmeNote"))} />
        </Field>
        <Field id="constraints" label="Special site constraints" optionalLabel error={err("constraints")} description="Live operations, access limits, night works, staging.">
          <textarea className="field-input min-h-24" name="constraints" {...fieldAria("constraints", err("constraints"), true)} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="flex items-center gap-3">
          <span className="tech-label text-red-350">04</span>
          <span className="display text-2xl text-ink">Documents</span>
        </legend>
        <p className="measure text-[0.9rem] text-ink-2">
          Drawings, scope documents, programme, BOQ or schedules. Larger sets or CAD
          files (DWG/DXF): send a file-share link in the scope summary instead.
        </p>
        <FileUploader name="documents" label="Tender documents" analyticsEvent="tender_file_upload" />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="flex items-center gap-3">
          <span className="tech-label text-red-350">05</span>
          <span className="display text-2xl text-ink">Consent</span>
        </legend>
        {(
          [
            ["privacyConsent", "I have read the privacy statement and understand how these details and documents will be handled."],
            ["contactConsent", "Allscope may contact me about this package."],
            ["authorisedConsent", "I am authorised to share the attached documents for tender purposes."],
          ] as const
        ).map(([name, label]) => (
          <div key={name} className="flex items-start gap-3">
            <input
              type="checkbox"
              id={name}
              name={name}
              className="mt-1 h-5 w-5 shrink-0 accent-(--brand-red)"
              aria-invalid={err(name) ? true : undefined}
              aria-describedby={err(name) ? `${name}-error` : undefined}
            />
            <label htmlFor={name} className="text-[0.9rem] leading-relaxed text-ink-2">
              {label}
            </label>
          </div>
        ))}
        {(["privacyConsent", "contactConsent", "authorisedConsent"] as const).map(
          (name) =>
            err(name) && (
              <p key={name} id={`${name}-error`} className="text-[0.8rem] font-medium text-error">
                {err(name)}
              </p>
            ),
        )}
      </fieldset>

      <div>
        <p id="tender-form-note" className="tech-label mb-4 text-ink-3">
          Files upload when you submit. On slower connections large packages take a
          minute. Leave the page open.
        </p>
        <button
          type="submit"
          className="btn-solid min-h-[44px] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Sending package…" : "Submit tender package"}
          <Arrow />
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {pending ? "Uploading your tender package, please wait." : ""}
        </span>
      </div>
    </form>
  );
}
