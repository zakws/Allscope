import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/cinema/Editorial";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, email or send a short enquiry to Allscope Concrete. Tender packages go through the tender page, which takes document uploads.",
  path: "/contact",
});

const faqs = [
  {
    q: "When can I call?",
    a: "Any time. The phone is on 24/7, and late at night an SMS is best.",
  },
  {
    q: "How do you quote?",
    a: "Most quotes are priced from the drawings. Site visits happen when a job needs one.",
  },
  {
    q: "What are your payment terms?",
    a: "Invoices are issued on 14-day terms.",
  },
  {
    q: "Can you show insurance documentation?",
    a: "Yes. Insurance documentation is available on request.",
  },
  {
    q: "Can you provide references?",
    a: "Yes. Project references are available on request.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="container-x pb-12 pt-24 md:pb-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display display-tight mt-3 text-5xl text-ink md:text-7xl">
            Contact Allscope
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            Call, email or use the form below. Every enquiry is read.
          </p>
        </Reveal>

        <Reveal className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-line-750 bg-bg-900 px-5 py-4">
            <p className="text-[0.95rem] leading-relaxed text-ink-2">
              <span className="font-medium text-ink">Pricing a job?</span>{" "}
              Drawings, scope and programme go through the tender page.
            </p>
            <Link href="/tenders" className="btn-solid min-h-[44px]">
              Send a tender
              <Arrow />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-3xl text-ink">General enquiry</h2>
              <div className="mt-5">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={100} className="space-y-6">
              <div className="border border-line-750 bg-bg-900 p-6">
                <div className="space-y-5">
                  <div>
                    <p className="tech-label text-ink-3">Phone</p>
                    <a
                      href={site.phoneHref}
                      className="mt-1 block py-2 text-2xl font-medium text-ink transition-colors hover:text-red-350"
                    >
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    <p className="tech-label text-ink-3">Email</p>
                    <span className="block py-2 text-lg text-ink-3">Email: {site.emailPending}</span>
                  </div>
                  <div>
                    <p className="tech-label text-ink-3">Service area</p>
                    <p className="mt-2 text-ink-2">{site.serviceArea}</p>
                    <p className="mt-1 text-[0.85rem] text-ink-3">
                      Based in {site.baseRegion}.
                    </p>
                  </div>
                  <div className="border-t border-line-750 pt-5">
                    <p className="tech-label text-ink-3">Looking for work?</p>
                    <Link
                      href="/careers"
                      className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-ink transition-colors hover:text-red-350"
                    >
                      Join the team
                      <Arrow />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border border-line-750 p-6">
                <h2 className="tech-label text-ink-3">Common questions</h2>
                <div className="mt-2 divide-y divide-line-750">
                  {faqs.map((faq) => (
                    <details key={faq.q} className="group py-3">
                      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-ink-3 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="pb-2 text-[0.9rem] leading-relaxed text-ink-2">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}
