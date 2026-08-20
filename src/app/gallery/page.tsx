import type { Metadata } from "next";
import Image from "next/image";
import { CTABand } from "@/components/cinema/Editorial";
import { GalleryExpand } from "@/components/cinema/GalleryExpand";
import { Reveal } from "@/components/ui/Reveal";
import { galleryPhotos } from "@/content/gallery-data.gen";
import type { GalleryPhoto } from "@/content/gallery-data.gen";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

/** Photographs shown before the expand toggle takes over. */
const VISIBLE = 12;

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Allscope Concrete's own site photography: pours, machine finishing, reinforcement, structural concrete and external works across Sydney sites.",
  path: "/gallery",
});

/**
 * Masonry-style column flow: portraits stack naturally, landscapes sit as
 * shorter blocks in the same column, and the mix keeps the page from reading
 * as a uniform dump. Two columns on phones, three from md up.
 */
function GalleryGrid({
  photos,
  priority = false,
}: {
  photos: GalleryPhoto[];
  priority?: boolean;
}) {
  return (
    <div className="columns-2 gap-4 md:columns-3 md:gap-6">
      {photos.map((photo, i) => (
        <figure
          key={photo.src}
          className="img-reveal mb-4 break-inside-avoid md:mb-6"
          data-inview="true"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 767px) 50vw, 33vw"
            priority={priority && i < 6}
            className="h-auto w-full bg-surface-850"
          />
        </figure>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  const first = galleryPhotos.slice(0, VISIBLE);
  const rest = galleryPhotos.slice(VISIBLE);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <div className="container-x pb-12 pt-24 md:pb-16">
        <Reveal>
          <p className="eyebrow">Gallery</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            Straight off site
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            Allscope&rsquo;s own photographs of its concrete work, taken on
            site across Sydney. No project names attached, just the pours,
            finishes and structure as the crews left them.
          </p>
        </Reveal>
        <div className="mt-8 md:mt-10">
          {rest.length > 0 ? (
            <GalleryExpand
              first={<GalleryGrid photos={first} priority />}
              rest={<GalleryGrid photos={rest} />}
              moreCount={rest.length}
            />
          ) : (
            <GalleryGrid photos={first} priority />
          )}
        </div>
      </div>
      <CTABand
        line1="This is the everyday standard."
        line2="Send the drawings and see it on your job."
        secondary={{ label: "All projects", href: "/projects" }}
      />
    </>
  );
}
