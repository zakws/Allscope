import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand, SectionHeading } from "@/components/cinema/Editorial";
import { ProjectGallery, sectorLabel } from "@/components/cinema/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";
import { projectRecords } from "@/content/projects-data.gen";
import type { ProjectRecord } from "@/content/projects-data.gen";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const ordered = [...projectRecords].sort((a, b) => a.order - b.order);

function getRecord(slug: string): ProjectRecord | undefined {
  return projectRecords.find((p) => p.slug === slug);
}

/** Register rows without named entities carry a "not recorded" note, not names. */
function recordedTeam(p: ProjectRecord): string | null {
  return /not recorded/i.test(p.team) ? null : p.team;
}

/**
 * Overview written strictly from the record: name, status and the standing
 * trade-boundary fact. Sector, location and delivery team already sit in the
 * facts row above, so the prose never restates them. Sentence shapes rotate
 * on the register order so the seventeen pages read differently. No
 * per-project scope, quantities or dates are invented here.
 */
const OPENERS: ((name: string) => string)[] = [
  (n) => `Allscope delivered the concreting package on ${n}.`,
  (n) => `Allscope poured and finished the concrete on ${n}.`,
  (n) => `The concrete on ${n} was placed and finished by Allscope.`,
  (n) => `${n} came to Allscope as a placement and finishing package.`,
  (n) => `Allscope carried the concrete placement and finishing on ${n}.`,
];

const BOUNDARIES = [
  "Formwork, reinforcement and concrete supply were delivered by others.",
  "Reinforcement, formwork and concrete supply sat with other trades.",
  "The formwork, reinforcement and supply side of the package belonged to other contractors.",
  "Other trades carried the formwork, reinforcement and concrete supply.",
];

function overview(p: ProjectRecord): string {
  if (p.overview) return p.overview;
  const sentences: string[] = [];
  if (p.status === "under-construction") {
    sentences.push(
      `Allscope is placing and finishing the concrete on ${p.name}.`,
      "Reinforcement, formwork and concrete supply sit with other trades; the pours are ours.",
    );
  } else if (p.status === "stage-2-under-construction") {
    sentences.push(
      "The concreting package across both stages sits with Allscope: we place and finish, while formwork, reinforcement and concrete supply come from others.",
    );
  } else {
    sentences.push(
      OPENERS[p.order % OPENERS.length](p.name),
      BOUNDARIES[p.order % BOUNDARIES.length],
    );
  }
  if (p.gallery.length === 0) {
    sentences.push("Photography for this one isn't in the current library yet.");
  }
  return sentences.join(" ");
}

function metaDescription(p: ProjectRecord): string {
  const team = recordedTeam(p);
  const base = `Concrete placement and finishing by Allscope Concrete on ${p.name} in ${p.location}${team ? `, delivered with ${team}` : ""}.`;
  return p.statusNote ? `${base} ${p.statusNote}.` : base;
}

export function generateStaticParams() {
  return projectRecords.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const record = getRecord(slug);
  if (!record) return {};
  const title = `${record.name}, ${record.location}`;
  const meta = pageMetadata({
    title,
    description: metaDescription(record),
    path: `/projects/${record.slug}`,
  });
  if (!record.lead) return meta; // text-led page: default site OG image
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: record.lead.src,
          width: record.lead.width,
          height: record.lead.height,
          alt: title,
        },
      ],
    },
    twitter: { ...meta.twitter, images: [record.lead.src] },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const record = getRecord(slug);
  if (!record) notFound();

  const idx = ordered.findIndex((p) => p.slug === record.slug);
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];
  const team = recordedTeam(record);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: record.name, path: `/projects/${record.slug}` },
        ])}
      />

      {/* Full-bleed lead image with the identity overlaid on the lower edge.
          Projects without a cleared photograph run the same identity block on
          a quiet textured band instead (never a substituted image). */}
      <section className="relative overflow-hidden bg-surface-850">
        <div
          className={
            record.lead
              ? "relative aspect-[4/5] max-h-[72svh] min-h-[420px] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
              : "grid-texture relative min-h-[320px] w-full md:min-h-[380px]"
          }
        >
          {record.lead && (
          <Image
            src={record.lead.src}
            alt={`${record.name}, ${record.location}, an Allscope Concrete project`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-bg-950 via-bg-950/25 to-transparent"
          />
          {record.lead?.label && (
            <span className="absolute right-5 top-24 z-10 bg-bg-950/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm">
              {record.lead.label}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 pb-8 md:pb-10">
          <div className="container-x">
            <Reveal>
              <p className="tech-label text-ink-2">
                {sectorLabel(record.sector)} · {record.location}
              </p>
              <h1 className="display display-tight mt-3 max-w-5xl text-4xl text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                {record.name}
              </h1>
              {record.statusNote && (
                <p className="mt-4 inline-flex items-center gap-2.5 bg-bg-950/75 px-3.5 py-2 backdrop-blur-sm">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-orange" />
                  <span className="text-[0.72rem] uppercase tracking-[0.14em] text-ink">
                    {record.statusNote}
                  </span>
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Record facts, with the overview directly beneath */}
      <div className="container-x mt-8 md:mt-10">
        <Reveal>
          <dl className="grid border-y border-line-750 sm:grid-cols-[1fr_1fr_1.6fr]">
            <div className="border-b border-line-750 py-4 sm:border-b-0 sm:border-r sm:pr-8">
              <dt className="tech-label text-ink-3">Sector</dt>
              <dd className="mt-1.5 font-medium text-ink">{sectorLabel(record.sector)}</dd>
            </div>
            <div className="border-b border-line-750 py-4 sm:border-b-0 sm:border-r sm:px-8">
              <dt className="tech-label text-ink-3">Location</dt>
              <dd className="mt-1.5 font-medium text-ink">{record.location}</dd>
            </div>
            <div className="py-4 sm:pl-8">
              <dt className="tech-label text-ink-3">Delivery team</dt>
              <dd className="mt-1.5 font-medium text-ink">
                {team ?? "Not recorded in the current register"}
              </dd>
            </div>
          </dl>
          <p className="measure mt-5 text-lg leading-relaxed text-ink-2 md:mt-6">
            {overview(record)}
          </p>
        </Reveal>
      </div>

      {/* Gallery */}
      {record.gallery.length > 0 && (
        <div className="container-x mt-10 md:mt-14">
          <SectionHeading>Photography</SectionHeading>
          <div className="mt-5 md:mt-6">
            <ProjectGallery images={record.gallery} />
          </div>
        </div>
      )}

      {/* Previous / next, in register order with wrap-around */}
      <nav aria-label="More projects" className="container-x mt-10 md:mt-14">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-t border-line-750 pb-10 pt-6 sm:flex-row md:pb-12">
            <Link href={`/projects/${prev.slug}`} className="group max-w-md">
              <span className="tech-label block text-ink-3">Previous project</span>
              <span className="display mt-1.5 block text-xl text-ink-2 transition-colors group-hover:text-ink md:text-2xl">
                {prev.name}
              </span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group max-w-md sm:text-right">
              <span className="tech-label block text-ink-3">Next project</span>
              <span className="display mt-1.5 block text-xl text-ink-2 transition-colors group-hover:text-ink md:text-2xl">
                {next.name}
              </span>
            </Link>
          </div>
        </Reveal>
      </nav>

      <CTABand
        line1="Tendering a similar package?"
        line2="Most quotes are priced straight off the drawings."
        secondary={{ label: "All projects", href: "/projects" }}
      />
    </>
  );
}
