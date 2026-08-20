import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

/**
 * Editorial primitives for the redesign — quiet, left-aligned, red-accented.
 */

/** Uppercase eyebrow + display heading. The site's standard section opener. */
export function SectionHeading({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-5xl">
        {children}
      </h2>
    </Reveal>
  );
}

/**
 * Closing band, one per page: a declarative two-sentence promise used as the
 * heading, then a single action. Same shape everywhere, copy varies.
 */
export function CTABand({
  line1,
  line2,
  action = { label: "Send a tender", href: "/tenders" },
  secondary,
}: {
  line1: string;
  line2: string;
  action?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-line-750">
      <div className="container-x py-24 md:py-32">
        <Reveal>
          <h2 className="display max-w-4xl text-3xl text-ink md:text-5xl">
            {line1}
            <br />
            <span className="text-concrete-400">{line2}</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={action.href} className="btn-solid">
              {action.label}
              <Arrow />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn-line">
                {secondary.label}
                <Arrow className="btn-arrow" />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 10h13M11 4.5 16.5 10 11 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Fine orange rule — the only sanctioned orange, drawn quietly by CSS. */
export function Hairline({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`hairline-orange ${className}`} />;
}
