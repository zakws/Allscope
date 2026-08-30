import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "./Editorial";
import { GalleryExpand } from "./GalleryExpand";
import type { GalleryImage, ProjectRecord } from "@/content/projects-data.gen";

/** Rows shown before the "View full gallery" toggle takes over. */
const GALLERY_ROW_CAP = 5;

const STATUS_LABEL: Record<ProjectRecord["status"], string | null> = {
  completed: null,
  "under-construction": "Current project",
  "stage-2-under-construction": "Stage 2 under construction",
};

export function statusLabel(p: ProjectRecord): string | null {
  return STATUS_LABEL[p.status];
}

export function sectorLabel(sector: ProjectRecord["sector"]): string {
  const map: Record<ProjectRecord["sector"], string> = {
    industrial: "Industrial",
    "multi-residential": "Multi-residential",
    "mixed-use": "Mixed-use",
    commercial: "Commercial",
    hospitality: "Hospitality",
    education: "Education",
    "retail-fuel": "Retail / Fuel",
  };
  return map[sector];
}

/**
 * Editorial project card: registered lead image, restrained monochrome that
 * returns to colour on hover, fine red rule, calm label reveal. All
 * information visible without hover.
 */
export function ProjectCard({
  project,
  headingLevel: H = "h3",
  priority = false,
}: {
  project: ProjectRecord;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const status = statusLabel(project);
  return (
    <article className="pcard group relative">
      <div className="pcard-img relative aspect-[16/10] overflow-hidden bg-surface-850">
        {project.lead === null ? (
          /* Text-led plate: no cleared photograph yet. Never a substituted
             image from another job. */
          <span className="grid-texture absolute inset-0 flex flex-col justify-between p-5">
            <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">
              Allscope Concrete
            </span>
            <span className="display text-2xl leading-tight text-concrete-300 md:text-3xl">
              {project.name}
            </span>
          </span>
        ) : (
        <Image
          src={project.lead.src}
          alt={project.lead.alt ?? `${project.name}, ${project.location}, an Allscope Concrete project`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          priority={priority}
          className="object-cover"
          style={project.lead.objectPosition ? { objectPosition: project.lead.objectPosition } : undefined}
        />
        )}
        {status && (
          <span className="absolute left-4 top-4 z-10 bg-bg-950/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm">
            {status}
          </span>
        )}
        {project.lead?.label && (
          <span className="absolute bottom-4 left-4 z-10 bg-bg-950/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm">
            {project.lead.label}
          </span>
        )}
      </div>
      <div className="pcard-rule mt-0 h-px w-0 bg-red" aria-hidden="true" />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
            {sectorLabel(project.sector)} · {project.location}
          </p>
          <H className="display mt-1.5 text-xl text-ink md:text-2xl">
            <Link
              href={`/projects/${project.slug}`}
              className="before:absolute before:inset-0 before:content-[''] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </H>
        </div>
        <span className="pcard-arrow mt-2 shrink-0 text-ink-3" aria-hidden="true">
          <Arrow />
        </span>
      </div>
    </article>
  );
}

/**
 * Alternating editorial gallery (brief §10): one strong image at a time —
 * wide, then portrait/detail pairs, never a dense uniform grid. Renders carry
 * an "Artist's impression" label; context-only images keep neutral captions.
 */
export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  // Compose rows: landscapes take a full row; portraits buffer until a second
  // portrait arrives so they always pair, even across intervening landscapes
  // (interleaved L,P,L,P galleries would otherwise flush every portrait into
  // its own full-width row — a 225px-wide source stretched across the page).
  const rows: GalleryImage[][] = [];
  let pending: GalleryImage | null = null;
  for (const img of images) {
    if (img.orientation === "landscape") {
      rows.push([img]);
    } else if (pending) {
      rows.push([pending, img]);
      pending = null;
    } else {
      pending = img;
    }
  }
  // A leftover single portrait renders constrained, never full container width.
  if (pending) rows.push([pending]);

  const rowNodes = rows.map((row, i) => (
    <Reveal key={row[0].assetId} delay={(i % 2) * 90}>
      <div
        className={
          row.length === 2
            ? "grid grid-cols-2 gap-4 md:gap-6"
            : row[0].orientation === "landscape"
              ? "grid grid-cols-1"
              : "grid grid-cols-1 justify-items-start"
        }
      >
        {row.map((img) => (
          <GalleryFigure key={img.assetId} img={img} solo={row.length === 1} />
        ))}
      </div>
    </Reveal>
  ));

  // First five rows show straight away; the rest sit behind a toggle so the
  // page stays short. Presentation only; row composition above is untouched.
  if (rows.length <= GALLERY_ROW_CAP) {
    return <div className="space-y-4 md:space-y-6">{rowNodes}</div>;
  }
  const moreCount = rows
    .slice(GALLERY_ROW_CAP)
    .reduce((n, row) => n + row.length, 0);
  return (
    <GalleryExpand
      first={rowNodes.slice(0, GALLERY_ROW_CAP)}
      rest={rowNodes.slice(GALLERY_ROW_CAP)}
      moreCount={moreCount}
    />
  );
}

function GalleryFigure({ img, solo = false }: { img: GalleryImage; solo?: boolean }) {
  const portrait = img.orientation !== "landscape";
  return (
    <figure
      className={`img-reveal relative ${portrait && solo ? "w-full max-w-md md:max-w-lg" : ""}`}
      data-inview="true"
    >
      <div
        className="relative w-full overflow-hidden bg-surface-850"
        style={{ aspectRatio: `${img.width} / ${img.height}` }}
      >
        <Image
          src={img.src}
          alt={img.alt ?? (img.caption ? "" : "Project photograph")}
          fill
          sizes={
            !portrait
              ? "(max-width: 767px) 100vw, 80vw"
              : solo
                ? "(max-width: 767px) 100vw, 32rem"
                : "(max-width: 767px) 50vw, 40vw"
          }
          className="object-cover"
        />
        {img.render && (
          <span className="absolute bottom-3 left-3 z-10 bg-bg-950/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm">
            Artist&rsquo;s impression
          </span>
        )}
      </div>
      {img.caption && (
        <figcaption className="mt-2.5 text-[0.78rem] leading-relaxed text-ink-3">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
}
