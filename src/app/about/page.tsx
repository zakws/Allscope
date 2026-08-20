import type { Metadata } from "next";
import Image from "next/image";
import { CTABand, Hairline, SectionHeading } from "@/components/cinema/Editorial";
import { Reveal } from "@/components/ui/Reveal";
import { capabilityImages } from "@/content/projects-data.gen";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Allscope Concrete is a Sydney concreting subcontractor led by Ali, with a full-time in-house crew and its own plant. Who the company is, how it runs, and the builders it has delivered for.",
  path: "/about",
});

/** Company facts, published on the old Allscope site. Each stated once. */
const facts = [
  {
    term: "Crew",
    copy: "Full-time and in-house. Allscope doesn't outsource labour, so the people on your deck this month are the same ones next month.",
  },
  {
    term: "Plant",
    copy: "The company owns its equipment, including the boom pump. No hire costs sit inside a quote.",
  },
  {
    term: "Availability",
    copy: "Reachable 24/7. If it's late, send an SMS and it'll be answered.",
  },
  {
    term: "Terms",
    copy: "Invoices are issued on 14-day terms.",
  },
  {
    term: "Paperwork",
    copy: "Insurance documentation and project references are available on request.",
  },
];

/** Verbatim references from the old site. */
const testimonials = [
  {
    quote:
      "Ali displayed a thorough understanding of OHS management of his team, adhering to the construction program and quality management. I would recommend All Scope Concreting to any prospective client.",
    name: "Jayson Munnings",
    role: "Director",
  },
  {
    quote:
      "Ali will go out of his way to make sure that the client (Builder) and his fellow contractors are satisfied.",
    name: "John Sassen",
    role: "Project Manager",
  },
];

/** Head contractors named factually from the published project record. */
const builders = [
  {
    name: "Binah",
    record:
      "Ed.Square, Babylon and Auburn Square, across the multi-residential and mixed-use record",
  },
  {
    name: "Total Construction",
    record: "Kennards Self Storage, Macquarie Park",
  },
  {
    name: "Versatile Construction",
    record:
      "Sydney International Airport T1 departures works and Oran Park Hotel",
  },
];

const pourWide = capabilityImages.find((img) => img.assetId === "OWN-CAP-149");
const driveway = capabilityImages.find((img) => img.assetId === "OWN-CAP-197");

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <div className="container-x pb-12 pt-24 md:pb-16 md:pt-28">
        <Reveal>
          <p className="eyebrow">About Allscope</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-4xl text-ink md:text-6xl">
            Built around the pour
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            Allscope Concrete is a Sydney concreting subcontractor led by Ali.
            It delivers structural concrete packages for builders across
            Sydney metro and Greater Western Sydney, and the person who prices
            a package plans its pours and stays on the job while the concrete
            goes down.
          </p>
          <Hairline className="mt-6" />
        </Reveal>

        {/* The motto and the facts behind it. */}
        <section aria-labelledby="company-h" className="mt-10 md:mt-12">
          <SectionHeading eyebrow="The company">
            <span id="company-h">How Allscope runs</span>
          </SectionHeading>
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <p className="display text-3xl leading-tight text-ink md:text-5xl">
                &ldquo;We love pouring concrete.&rdquo;
              </p>
              <Hairline className="mt-6 max-w-[16rem]" />
              <p className="tech-label mt-4 text-ink-3">The company motto</p>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={90}>
              <dl className="divide-y divide-line-750 border-y border-line-750">
                {facts.map((f) => (
                  <div
                    key={f.term}
                    className="grid gap-1 py-3 md:grid-cols-12 md:gap-6"
                  >
                    <dt className="tech-label text-ink-3 md:col-span-3">
                      {f.term}
                    </dt>
                    <dd className="text-[0.95rem] leading-relaxed text-ink-2 md:col-span-9">
                      {f.copy}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Who it works with: references first, then the record. */}
        <section aria-labelledby="builders-h" className="mt-10 md:mt-12">
          <SectionHeading eyebrow="Working relationships">
            <span id="builders-h">Delivered under head contractors</span>
          </SectionHeading>
          <div className="mt-6 grid gap-px border border-line-750 bg-line-750 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal as="div" key={t.name} delay={i * 80} className="bg-bg-900 p-6">
                <figure>
                  <blockquote className="leading-relaxed text-ink-2">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="tech-label mt-4 text-ink-3">
                    {t.name}, {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 divide-y divide-line-750 border-y border-line-750">
            {builders.map((b, i) => (
              <Reveal
                as="div"
                key={b.name}
                delay={i * 60}
                className="py-4 md:grid md:grid-cols-12 md:gap-8"
              >
                <h3 className="display text-xl text-ink md:col-span-4 md:text-2xl">
                  {b.name}
                </h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-3 md:col-span-8 md:mt-0 md:self-center">
                  {b.record}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="measure mt-3 text-[0.85rem] leading-relaxed text-ink-3">
            Names from the published project record. References, not
            endorsements.
          </p>
        </section>

        {/* The work itself, from the owner's own camera roll. */}
        {pourWide && driveway && (
          <section aria-labelledby="work-h" className="mt-10 md:mt-12">
            <SectionHeading eyebrow="The work">
              <span id="work-h">What the days look like</span>
            </SectionHeading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:gap-8">
              <Reveal>
                <figure>
                  <div className="relative aspect-square w-full overflow-hidden bg-surface-850">
                    <Image
                      src={pourWide.src}
                      alt="A wide raft slab mid-pour, the crew screeding behind the pump hose"
                      fill
                      sizes="(max-width: 639px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="tech-label mt-3 text-ink-3">
                    A raft pour under way. The crew on the deck is Allscope&rsquo;s own.
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={90}>
                <figure>
                  <div className="relative aspect-square w-full overflow-hidden bg-surface-850">
                    <Image
                      src={driveway.src}
                      alt="A freshly finished charcoal driveway with a contrast border band and trench grate"
                      fill
                      sizes="(max-width: 639px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="tech-label mt-3 text-ink-3">
                    External works: a finished driveway, edges formed and borders banded.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </section>
        )}
      </div>

      <CTABand
        line1="Got a package coming up?"
        line2="Talk to Allscope early."
        action={{ label: "Discuss a project", href: "/contact" }}
        secondary={{ label: "Explore our work", href: "/projects" }}
      />
    </>
  );
}
