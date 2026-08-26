import type { Metadata } from "next";
import Image from "next/image";
import { CTABand, Hairline, SectionHeading } from "@/components/cinema/Editorial";
import { Reveal } from "@/components/ui/Reveal";
import { featurePhotos } from "@/content/capability-data.gen";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Safety & Quality",
  description:
    "How Allscope Concrete runs a pour: the deck checked before concrete is called, placement under senior supervision, and the finished work cured and protected through to handover.",
  path: "/safety-quality",
});

const prePourChecks = [
  "Access and pump position",
  "Levels and set-downs",
  "Penetrations and embeds",
  "Services in the pour zone",
  "Reinforcement and formwork interfaces",
];

const basementDetail = featurePhotos["safety-crew"];
const trowelDetail = featurePhotos["safety-trowel"];
const slabDetail = featurePhotos["safety-slab"];

export default function SafetyQualityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Safety & Quality", path: "/safety-quality" },
        ])}
      />

      <div className="container-x pb-8 pt-24 md:pb-10 md:pt-28">
        <Reveal>
          <p className="eyebrow">Safety &amp; Quality</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            How a pour goes right
          </h1>
          <p className="measure mt-3 text-lg leading-relaxed text-ink-2">
            Concrete doesn&apos;t give you a second go. Everything on this page
            exists so the pour only has to happen once.
          </p>
        </Reveal>
      </div>

      {/* 01: Pre-pour readiness */}
      <section className="container-x border-t border-line-750 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="01 · Before the pour">
              Ready before concrete is called
            </SectionHeading>
            <Reveal delay={80}>
              <p className="measure mt-3 leading-relaxed text-ink-2">
                Formwork and steel belong to other trades, but Allscope treats
                those interfaces as part of its own readiness. Before concrete
                is ordered the deck is walked against the drawings and every
                item below is signed off. If something isn&apos;t right, the
                pour waits and the builder hears why straight away. A delayed
                pour costs a morning; a bad one costs the programme.
              </p>
              <ul className="mt-6 max-w-md divide-y divide-line-750 border-y border-line-750">
                {prePourChecks.map((check, i) => (
                  <li key={check} className="flex items-baseline gap-4 py-2.5">
                    <span className="tech-label text-red-350">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="tech-label text-ink-2">{check}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          {basementDetail && (
            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <figure>
                <Image
                  src={basementDetail.src}
                  width={basementDetail.width}
                  height={basementDetail.height}
                  alt="Harnessed concreters screeding wet concrete along a narrow elevated walkway between timber edge forms"
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="w-full"
                />
                <figcaption className="tech-label mt-3 text-ink-3">
                  Edge work under harness · screeding an elevated walkway
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* 02: Placement control */}
      <section className="container-x border-t border-line-750 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="02 · During the pour">
              Placement under control
            </SectionHeading>
            <Reveal delay={80}>
              <div className="mt-3 grid gap-x-14 gap-y-4">
                <p className="measure leading-relaxed text-ink-2">
                  Every pour runs under a senior supervisor on site, and OHS
                  management sits with them on the deck, not in a folder. The
                  crew is full-time and in-house, inducted to the site and the
                  task, and exclusion zones go up around the boom and plant
                  before placement starts.
                </p>
                <p className="measure leading-relaxed text-ink-2">
                  Deliveries are paced to the rate the crew can place properly,
                  not the rate the plant can send them. Pours are staged so
                  joints land where the drawings put them, and anything wrong
                  mid-pour gets raised on the spot, not poured over and argued
                  about later.
                </p>
              </div>
            </Reveal>
          </div>
          {trowelDetail && (
            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <figure>
                <Image
                  src={trowelDetail.src}
                  width={trowelDetail.width}
                  height={trowelDetail.height}
                  alt="Two ride-on trowel operators finishing a large fresh commercial slab around column starter cages"
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="w-full"
                />
                <figcaption className="tech-label mt-3 text-ink-3">
                  Finishing follows the pour across the slab
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* 03: Finishing and protection */}
      <section className="container-x border-t border-line-750 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="03 · After the pour">
              Finishing and protection
            </SectionHeading>
            <Reveal delay={80}>
              <div className="mt-3 grid gap-x-14 gap-y-4">
                <p className="measure leading-relaxed text-ink-2">
                  The finish standard is agreed with the builder before the
                  pour. Levels and surface are checked against it as the work
                  moves and again at handover, which is how a slab passes
                  inspection once.
                </p>
                <p className="measure leading-relaxed text-ink-2">
                  Curing is planned like the pour itself, and finished work
                  stays protected from following trades until it&apos;s handed
                  back. A slab damaged after the pour is still a defect against
                  the pour.
                </p>
              </div>
            </Reveal>
          </div>
          {slabDetail && (
            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <figure>
                <Image
                  src={slabDetail.src}
                  width={slabDetail.width}
                  height={slabDetail.height}
                  alt="Ride-on power trowel on a freshly finished concrete slab with starter bars along the perimeter wall"
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="w-full"
                />
                <figcaption className="tech-label mt-3 text-ink-3">
                  A machine-finished slab, level held to handover
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
        <Reveal delay={140}>
          <Hairline className="mt-8" />
          <p className="measure mt-4 text-[0.9rem] leading-relaxed text-ink-3">
            No certification badges here, by choice. Insurance documentation
            and project references go to builders on request, current on the
            day they&apos;re sent.
          </p>
        </Reveal>
      </section>

      <CTABand
        line1={"Checked before it's called."}
        line2={"Protected after it's placed."}
        action={{ label: "Send a tender", href: "/tenders" }}
        secondary={{ label: "Explore our work", href: "/projects" }}
      />
    </>
  );
}
