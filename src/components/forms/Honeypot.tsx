"use client";

import { useEffect, useRef } from "react";

/**
 * Accessible spam protection: a honeypot field hidden from real users
 * (aria-hidden + visually removed + tabindex -1) and a form-start timestamp
 * for a minimum-fill-time check server-side. No CAPTCHA at launch;
 * Turnstile keys can be added later (see docs/INTEGRATIONS.md).
 */
export function Honeypot() {
  const startedRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Set imperatively on mount so the server-rendered markup stays stable.
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);
  return (
    <>
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field blank</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="form_started_at" defaultValue="0" ref={startedRef} />
    </>
  );
}
