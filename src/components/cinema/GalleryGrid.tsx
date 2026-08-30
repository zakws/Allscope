"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryExpand } from "./GalleryExpand";
import { Lightbox, useLightbox, type LightboxImage } from "./Lightbox";
import type { GalleryPhoto } from "@/content/gallery-data.gen";

/**
 * Editorial gallery: one large featured photograph, its supporting trio, then
 * spacious alternating rows (landscapes full-width at natural aspect,
 * portraits paired). Every tile opens the lightbox; hover is a quiet 200ms
 * scale. No masonry dump, no carousel.
 */
export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const images: LightboxImage[] = photos.map((p) => ({
    thumb: p.thumb,
    full: p.full,
    width: p.width,
    height: p.height,
    alt: p.alt,
    caption: p.caption,
  }));
  const lb = useLightbox(images);

  const featured = photos[0];
  const support = photos.filter((p) => p.role === "support");
  const rest = photos.slice(1 + support.length);

  // Rows for the remainder: landscapes stand alone, portraits pair.
  const rows: { items: GalleryPhoto[]; start: number }[] = [];
  let pending: { p: GalleryPhoto; i: number } | null = null;
  rest.forEach((p, k) => {
    const i = 1 + support.length + k;
    if (p.orientation === "landscape") {
      rows.push({ items: [p], start: i });
    } else if (pending) {
      rows.push({ items: [pending.p, p], start: pending.i });
      pending = null;
    } else {
      pending = { p, i };
    }
  });
  if (pending !== null) {
    const held = pending as { p: GalleryPhoto; i: number };
    rows.push({ items: [held.p], start: held.i });
  }

  return (
    <>
      {/* Featured */}
      <Reveal>
        <Tile photo={featured} index={0} open={lb.open} eager large />
      </Reveal>

      {/* Supporting trio */}
      <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:grid-cols-3 md:gap-6">
        {support.map((p, k) => (
          <Reveal key={p.thumb} delay={k * 80} className={k === 2 ? "col-span-2 md:col-span-1" : ""}>
            <Tile photo={p} index={1 + k} open={lb.open} />
          </Reveal>
        ))}
      </div>

      {/* Alternating rows: the strongest set renders immediately; the full
          collection sits behind an accessible toggle so the first paint of
          the page stays a curated sequence, not a 220-photo scroll. */}
      <RowSet rows={rows.slice(0, VISIBLE_ROWS)} open={lb.open} wrap={false} />
      {rows.length > VISIBLE_ROWS && (
        <div className="mt-10 md:mt-16">
          <GalleryExpand
            first={null}
            rest={<RowSet rows={rows.slice(VISIBLE_ROWS)} open={lb.open} wrap={false} />}
            moreCount={rows
              .slice(VISIBLE_ROWS)
              .reduce((n, row) => n + row.items.length, 0)}
          />
        </div>
      )}

      <Lightbox state={lb} />
    </>
  );
}

const VISIBLE_ROWS = 16;

function RowSet({
  rows,
  open,
}: {
  rows: { items: GalleryPhoto[]; start: number }[];
  open: (i: number) => void;
  wrap?: boolean;
}) {
  return (
    <div className="mt-10 space-y-10 md:mt-16 md:space-y-16">
        {rows.map((row) => (
          <Reveal key={row.items[0].thumb}>
            {row.items.length === 2 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {row.items.map((p, k) => (
                  <Tile key={p.thumb} photo={p} index={row.start + k} open={open} />
                ))}
              </div>
            ) : row.items[0].orientation === "landscape" ? (
              <Tile photo={row.items[0]} index={row.start} open={open} hires />
            ) : (
              <div className="mx-auto w-full max-w-md md:max-w-lg">
                <Tile photo={row.items[0]} index={row.start} open={open} />
              </div>
            )}
          </Reveal>
        ))}
    </div>
  );
}

function Tile({
  photo,
  index,
  open,
  eager = false,
  large = false,
  hires = false,
}: {
  photo: GalleryPhoto;
  index: number;
  open: (i: number) => void;
  eager?: boolean;
  large?: boolean;
  /** Full-width tiles render past the 1000px thumb; serve the full master
   *  so the optimizer can deliver sharp variants at 80-100vw. */
  hires?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={`View photograph: ${photo.alt}`}
      className="gtile group block w-full overflow-hidden bg-surface-850 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-350"
    >
      <span
        className="relative block w-full"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={large || hires ? photo.full : photo.thumb}
          alt={photo.alt}
          fill
          sizes={
            large
              ? "100vw"
              : photo.orientation === "landscape"
                ? "(max-width: 767px) 100vw, 80vw"
                : "(max-width: 767px) 50vw, 33vw"
          }
          priority={eager}
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
        />
      </span>
    </button>
  );
}
