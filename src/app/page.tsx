import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Arrow,
  CTABand,
  Hairline,
  SectionHeading,
} from "@/components/cinema/Editorial";
import { HeroFilm } from "@/components/cinema/HeroFilm";
import {
  ProjectCard,
  sectorLabel,
  statusLabel,
} from "@/components/cinema/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";
import { projectRecords } from "@/content/projects-data.gen";
import { featurePhotos } from "@/content/capability-data.gen";
import type { ProjectRecord } from "@/content/projects-data.gen";
import { reviews } from "@/content/reviews";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Commercial concrete placement, pumping and finishing, Sydney",
  description:
    "Allscope Concrete places, pumps and finishes structural concrete for commercial, multi-residential and industrial programmes across Sydney. Senior-led, with supervision on every pour.",
  path: "/",
  ogTitle: "Concrete, coordinated.",
});

/** Homepage feature slots. Slugs are stable ids from the generated register. */
const FEATURED_SLUGS = [
  "kennards-macquarie-park",
  "ed-square",
  "sydney-international-airport",
];

const CAPABILITY_ROWS = [
  "Structural concrete placement",
  "Concrete finishing",
  "Concrete pumping",
  "Pre-pour readiness checks",
  "Pour planning and supervision",
];

/** Published client references from the previous Allscope site. Verbatim. */

function record(slug: string): ProjectRecord {
  const match = projectRecords.find((p) => p.slug === slug);
  if (!match) throw new Error(`Homepage references missing project record: ${slug}`);
  return match;
}

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) => record(slug));
  const onsite = record("auburn-square");
  const onsiteStatus = statusLabel(onsite);
  const aerial = featurePhotos["home-band"];
  const slabDetail = featurePhotos["home-slab"];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* 1 · Opening film */}
      <HeroFilm>
        <div className="container-x pb-12 md:pb-16">
          <p className="rise eyebrow">Commercial concrete · Sydney</p>
          <h1
            className="rise display display-tight mt-3 max-w-3xl text-5xl text-ink md:text-7xl"
            style={{ transitionDelay: "120ms" }}
          >
            Concrete, coordinated.
          </h1>
          <p
            className="rise mt-4 max-w-xl text-lg text-ink-2"
            style={{ transitionDelay: "240ms" }}
          >
            Structural placement, pumping and finishing. Planned early, poured
            properly.
          </p>
          <div
            className="rise mt-6 flex flex-wrap items-center gap-4"
            style={{ transitionDelay: "360ms" }}
          >
            <Link href="/tenders" className="btn-solid">
              Send a tender
              <Arrow />
            </Link>
            <Link href="/projects" className="btn-line">
              See the work
              <Arrow className="btn-arrow" />
            </Link>
          </div>
        </div>
      </HeroFilm>

      {/* 2 · Positioning */}
      <section>
        <div className="container-x py-12 md:py-16">
          <Reveal>
            <p className="display max-w-4xl text-2xl leading-snug text-ink md:text-4xl">
              Allscope pours multi-residential, commercial and industrial
              structures. Ali leads the company, the crew is full-time and
              in-house, and the plant is our own, so nothing on your job is
              hired in or subbed out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · Selected work */}
      <section className="border-t border-line-750">
        <div className="container-x py-12 md:py-16">
          <SectionHeading eyebrow="Projects">Selected work</SectionHeading>
          <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90}>
                <ProjectCard
                  project={project}
                  headingLevel="h3"
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/projects" className="btn-line">
              All projects
              <Arrow className="btn-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4 · What builders say */}
      <section className="border-t border-line-750">
        <div className="container-x py-12 md:py-16">
          <Reveal>
            <h2 className="eyebrow">What builders say</h2>
          </Reveal>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            {reviews.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure>
                  <blockquote className="display text-xl leading-snug text-ink md:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                    {t.name} · {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/reviews" className="btn-line">
              All reviews
              <Arrow className="btn-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5 · Capabilities, with the pour aerial alongside */}
      <section className="border-t border-line-750">
        <div className="container-x py-12 md:py-16">
          <SectionHeading eyebrow="Capabilities">
            What Allscope does
          </SectionHeading>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="border-b border-line-750">
              {CAPABILITY_ROWS.map((name, i) => (
                <Reveal key={name} delay={i * 50}>
                  <Link
                    href="/capabilities"
                    className="group flex items-baseline gap-5 border-t border-line-750 py-4"
                  >
                    <span className="tech-label text-ink-3">0{i + 1}</span>
                    <span className="display flex-1 text-xl text-ink transition-colors group-hover:text-red-350 md:text-2xl">
                      {name}
                    </span>
                    <span
                      className="shrink-0 self-center text-ink-3 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <Arrow />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            {aerial && (
              <Reveal delay={120} className="hidden md:block">
                <div
                  className="img-reveal relative h-full overflow-hidden bg-surface-850"
                  data-inview="true"
                >
                  <Image
                    src={aerial.src}
                    alt="Allscope boom pump raised between two Allscope branded trucks beside a freshly finished slab"
                    fill
                    sizes="(max-width: 767px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 6 · Safety & quality */}
      <section className="border-t border-line-750">
        <div className="container-x py-12 md:py-16">
          <SectionHeading eyebrow="Safety & quality">
            Checked before, watched throughout
          </SectionHeading>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-12">
            <Reveal>
              <p className="measure text-ink-2">
                Allscope doesn&rsquo;t install reinforcement or formwork. Even
                so, nothing gets poured until the work other trades have put in
                is walked against the drawings. Penetrations, set-downs and
                levels are checked before the concrete is ordered, so problems
                surface while they&rsquo;re still easy to fix.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="measure text-ink-2">
                A supervisor stays on the slab from the first truck to the
                final trowel. The people who planned the sequence watch it run
                and make the calls on the spot, while there&rsquo;s still time
                to act.
              </p>
            </Reveal>
            {slabDetail && (
              <Reveal delay={140} className="hidden md:block">
                <div
                  className="img-reveal relative h-full min-h-52 overflow-hidden bg-surface-850"
                  data-inview="true"
                >
                  <Image
                    src={slabDetail.src}
                    alt="Freshly finished commercial ground slab with column starter cages and a trowel operator at the far edge"
                    fill
                    sizes="(max-width: 767px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
          <Reveal className="mt-8">
            <Link href="/safety-quality" className="btn-line">
              Safety &amp; quality
              <Arrow className="btn-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7 · About */}
      <section className="border-t border-line-750">
        <div className="container-x py-12 md:py-16">
          <Reveal>
            <Hairline className="w-16" />
            <p className="display mt-6 max-w-4xl text-2xl leading-snug text-ink md:text-4xl">
              Concrete doesn&rsquo;t hide anything. A finished slab shows
              exactly how the job was run, and that standard is the whole
              business.
            </p>
            <div className="mt-6">
              <Link href="/about" className="btn-line">
                About Allscope
                <Arrow className="btn-arrow" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 · Current project: Auburn Square Stage 2 */}
      <section className="border-t border-line-750">
        <div className="container-x py-12 md:py-16">
          <SectionHeading eyebrow="On site now">{onsite.name}</SectionHeading>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-12">
            <Reveal className="md:col-span-2">
              <Link
                href={`/projects/${onsite.slug}`}
                className="group block"
                aria-label={`View project: ${onsite.name}`}
              >
                <div
                  className="img-reveal relative aspect-[16/9] overflow-hidden bg-surface-850"
                  data-inview="true"
                >
                  <Image
                    src={onsite.lead!.src}
                    alt={`${onsite.name}, ${onsite.location}, an Allscope Concrete project currently on site`}
                    fill
                    sizes="(max-width: 767px) 100vw, 61vw"
                    className="object-cover"
                  />
                  {onsiteStatus && (
                    <span className="absolute left-4 top-4 z-10 bg-bg-950/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm">
                      {onsiteStatus}
                    </span>
                  )}
                </div>
              </Link>
            </Reveal>
            <Reveal
              delay={90}
              className="flex flex-col items-start justify-end gap-5"
            >
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                  {sectorLabel(onsite.sector)} · {onsite.location}
                </p>
                <p className="measure mt-3 text-ink-2">
                  Stage 1 is done. Allscope is back on site with Binah for Stage 2, placing and finishing the concrete as the next stage comes up.
                </p>
              </div>
              <Link
                href={`/projects/${onsite.slug}`}
                className="btn-line shrink-0"
              >
                View project
                <Arrow className="btn-arrow" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 · Closing band, with the careers prompt folded in */}
      <CTABand
        line1="Pricing your next structure?"
        line2="Send the drawings and programme."
        action={{ label: "Send a tender", href: "/tenders" }}
        secondary={{ label: "Join the team", href: "/careers" }}
      />
    </>
  );
}
