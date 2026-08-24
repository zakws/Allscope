import type { Metadata } from "next";
import { CTABand } from "@/components/cinema/Editorial";
import { GalleryGrid } from "@/components/cinema/GalleryGrid";
import { Reveal } from "@/components/ui/Reveal";
import { galleryPhotos } from "@/content/gallery-data.gen";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "A selection of Allscope Concrete projects, pours and structural works delivered with precision across Sydney: pumping, placement, suspended slabs and finished concrete.",
  path: "/gallery",
});

export default function GalleryPage() {
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
          <p className="eyebrow">Selected work</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            Concrete capability, proven on site.
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            A selection of Allscope Concrete projects, pours and structural
            works delivered with precision across Sydney.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14">
          <GalleryGrid photos={galleryPhotos} />
        </div>
      </div>

      <CTABand
        line1="This is the standard."
        line2="Send the drawings and hold us to it."
      />
    </>
  );
}
