import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { TenderForm } from "@/components/forms/TenderForm";
import { featurePhotos } from "@/content/capability-data.gen";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Send a tender",
  description:
    "Send drawings, scope and programme to Allscope Concrete for pricing. Most quotes are priced from the drawings. Upload documents here, or email the package direct.",
  path: "/tenders",
});

const freshDeck = featurePhotos["tenders-deck"];

export default function TendersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tenders", path: "/tenders" },
        ])}
      />
      <div className="container-x pb-12 pt-24 md:pb-16">
        <Reveal>
          <p className="eyebrow">Tenders</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            Send the drawings
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            Allscope prices placement and finishing packages for commercial,
            multi-residential and industrial projects across Sydney, most of
            them straight from the drawings. A site visit happens when the job
            needs one. Send the package below and it comes back as a price or
            the questions that lead to one.
          </p>
        </Reveal>

        {freshDeck && (
          <Reveal delay={80} className="mt-8">
            <figure>
              <div className="relative w-full overflow-hidden bg-surface-850" style={{ aspectRatio: "49 / 10" }}>
                <Image
                  src={freshDeck.src}
                  alt="Reinforced deck laid with mesh ready for concrete, with the pour under way in the distance"
                  fill
                  sizes="(max-width: 767px) 100vw, 80vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="tech-label mt-3 text-ink-3">
                A deck laid and checked, the pour already moving toward it
              </figcaption>
            </figure>
          </Reveal>
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <TenderForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <Reveal delay={100} className="space-y-6 lg:sticky lg:top-24">
              <div className="border border-line-750 bg-bg-900 p-6">
                <p className="tech-label text-ink-3">What to include</p>
                <ul className="mt-3 space-y-2.5 text-[0.9rem] leading-relaxed text-ink-2">
                  {[
                    "Drawings and the scope of works.",
                    "Programme, or the expected start.",
                    "BOQ or schedules, if issued.",
                    "Anything unusual: access, staging, live operations, finish standards.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-orange/75" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-line-750 p-6">
                <p className="tech-label text-ink-3">Prefer email?</p>
                <span className="mt-1 block py-2 text-lg text-ink-3">Email: {site.emailPending}</span>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-2">
                  Closing today, or too big to attach? Call{" "}
                  <a
                    href={site.phoneHref}
                    className="inline-block py-1 font-medium text-ink underline underline-offset-2 transition-colors hover:text-red-350"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
                <p className="mt-4 border-t border-line-750 pt-4 text-[0.9rem] leading-relaxed text-ink-2">
                  Every package is logged with a reference number.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}
