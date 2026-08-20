import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/cinema/Editorial";
import { Reveal } from "@/components/ui/Reveal";
import { CareersForm } from "@/components/forms/CareersForm";
import { careerRoles } from "@/content/process";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Allscope Concrete hires full-time and in-house: concreters, finishers, pump operators and supervisors for commercial pours across Sydney. Send an expression of interest any time.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />

      <div className="container-x pb-8 pt-24 md:pb-10 md:pt-28">
        <Reveal>
          <p className="eyebrow">Careers</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            We love pouring concrete
          </h1>
          <p className="measure mt-3 text-lg leading-relaxed text-ink-2">
            That&apos;s the company motto, and the crew is hired to mean it.
            Allscope&apos;s team is full-time and in-house, with nothing
            outsourced, so a spot on it matters. Here&apos;s who fits and how
            to reach us.
          </p>
        </Reveal>
      </div>

      {/* Roles + apply, side by side */}
      <section
        id="apply"
        className="container-x scroll-mt-24 border-t border-line-750 py-12 md:py-16"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who Allscope hires">
              Roles on the crew
            </SectionHeading>
            <Reveal delay={80}>
              <ul className="mt-6 divide-y divide-line-750 border-y border-line-750">
                {careerRoles.map((r) => (
                  <li key={r.title} className="py-3">
                    <span className="display text-lg text-ink">{r.title}</span>
                    <span className="mt-0.5 block text-[0.85rem] leading-relaxed text-ink-3">
                      {r.note}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-2">
                The work is commercial: multi-residential, industrial and live
                operating sites across Sydney, with pours planned before the
                day so nobody is guessing on the deck. Bring a White Card,
                reliable transport and references from crews you&apos;ve
                poured with.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="How to apply">
              Put your name in
            </SectionHeading>
            <Reveal delay={140}>
              <p className="measure mt-3 leading-relaxed text-ink-2">
                There&apos;s no portal, and you don&apos;t need to wait for an
                ad. Send your tickets and the work you&apos;ve done; if it fits
                a current or upcoming crew, Allscope will call. Your details
                are used for recruitment only, never shared, and deleted on
                request. See the{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-red-350"
                >
                  privacy policy
                </Link>
                .
              </p>
              <div className="mt-6">
                <CareersForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
