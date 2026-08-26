import type { Metadata } from "next";
import Image from "next/image";
import { CTABand, Hairline } from "@/components/cinema/Editorial";
import { Reveal } from "@/components/ui/Reveal";
import { featurePhotos, type FeaturePhoto, type FeatureSlot } from "@/content/capability-data.gen";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Capabilities: placement, finishing and pumping",
  description:
    "What Allscope Concrete performs, coordinates and does not do. Structural concrete placement, finishing and pumping with the company's own boom pump, across Sydney.",
  path: "/capabilities",
});

function capImage(assetId: string): FeaturePhoto {
  const img = featurePhotos[assetId as FeatureSlot];
  if (!img) throw new Error(`Missing capability image: ${assetId}`);
  return img;
}

/** The five things Allscope performs, in the order an estimator reads them. */
const services: Array<{
  id: string;
  index: string;
  title: string;
  body: string;
  image?: { assetId: string; alt: string };
}> = [
  {
    id: "placement",
    index: "01",
    title: "Structural placement",
    body: "Slabs on ground, rafts and footings. Suspended decks, beams and bands. Columns, walls and cores, placed to formwork built by others. The crew is Allscope's own full-time team, never outsourced labour, sized to the pour, with the sequence settled before the first truck is booked.",
    image: {
      assetId: "cap-placement",
      alt: "Wide suspended slab pour with the boom pump overhead and a power trowel operator in the foreground",
    },
  },
  {
    id: "finishing",
    index: "02",
    title: "Finishing",
    body: "The surface is the part everyone looks at for decades. Screeding and level control, machine and hand trowelled finishes, edges, falls and set-downs. The finish standard is agreed with the builder before the pour, not argued after it, and the surface gets a final check at handover.",
    image: {
      assetId: "cap-finishing",
      alt: "Crew screeding and trowelling a broad freshly poured basement ramp slab",
    },
  },
  {
    id: "pumping",
    index: "03",
    title: "Concrete pumping",
    body: "Allscope owns and operates its own truck-mounted boom pump, so there's no hire cost in the price and no extra party between the plan and the concrete. Boom position and exclusion zones are planned for each pour, and deliveries are sequenced to the rate the deck can take.",
    image: {
      assetId: "cap-pumping",
      alt: "Two agitator trucks feeding an Allscope branded boom pump at sunset while the crew places concrete",
    },
  },
  {
    id: "pre-pour",
    index: "04",
    title: "Pre-pour readiness",
    body: "Before placement, Allscope walks the deck and checks the work built by others: reinforcement complete, formwork edges and penetrations right, props in, access and levels confirmed. If something isn't right, the pour waits. A delayed pour costs less than a bad one.",
    image: {
      assetId: "cap-prepour",
      alt: "Beam cages and top reinforcement fixed over metal deck formwork on a large suspended slab",
    },
  },
  {
    id: "planning",
    index: "05",
    title: "Pour planning and supervision",
    body: "Most packages are priced straight from the drawings, with a site visit when the job calls for one. Scope, access and staging are read at tender, and on the day senior people run the pour, with the person who priced it reachable while concrete goes down.",
    image: {
      assetId: "cap-planning",
      alt: "Tower crane rising from a formed lift core above a basement raft prepared with membrane and starter cages",
    },
  },
];

const boundary = {
  performs: [
    "Structural concrete placement",
    "Concrete finishing",
    "Concrete pumping",
    "Pre-pour readiness checks",
    "Pour planning and supervision",
  ],
  coordinates: [
    "Concrete supply deliveries, sequenced to the pour",
    "Interface readiness with reinforcement, formwork and PT trades",
    "Additional pumping capacity on large pours",
  ],
  excludes: [
    "Reinforcement installation",
    "Formwork installation",
    "Concrete supply",
    "Post-tensioning",
  ],
};

export default function CapabilitiesPage() {
  const aerial = capImage("cap-band");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Capabilities", path: "/capabilities" },
        ])}
      />
      <div className="container-x pt-24 md:pt-28">
        <Reveal>
          <p className="eyebrow">Capabilities</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-4xl text-ink md:text-6xl">
            Exactly what Allscope does
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            Allscope is a structural concrete subcontractor working on
            commercial, multi-residential and industrial jobs across Sydney.
            What follows is the full scope, laid out so an estimator can match
            a package in one read.
          </p>
          <Hairline className="mt-6" />
        </Reveal>

        {/* The performs / coordinates / does-not-perform boundary, the page's spine. */}
        <section aria-labelledby="scope-h" className="mt-8 md:mt-10">
          <h2 id="scope-h" className="sr-only">
            Where the scope starts and stops
          </h2>
          <Reveal delay={80}>
            <div className="grid gap-px border border-line-750 bg-line-750 md:grid-cols-3">
              <div className="bg-bg-900 p-5 md:p-6">
                <p className="tech-label text-red-350">Performs</p>
                <ul className="mt-3 space-y-1.5 text-[0.9rem] leading-relaxed text-ink-2">
                  {boundary.performs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-900 p-5 md:p-6">
                <p className="tech-label text-ink-2">Coordinates</p>
                <ul className="mt-3 space-y-1.5 text-[0.9rem] leading-relaxed text-ink-2">
                  {boundary.coordinates.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-900 p-5 md:p-6">
                <p className="tech-label text-ink-3">Does not perform</p>
                <ul className="mt-3 space-y-1.5 text-[0.9rem] leading-relaxed text-ink-3">
                  {boundary.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="measure mt-3 text-[0.85rem] leading-relaxed text-ink-3">
              The third column is other trades&rsquo; work. Allscope never
              installs it and never claims it.
            </p>
          </Reveal>
        </section>

        {/* One compact row per capability: number and title left, copy right. */}
        <div className="mb-10 mt-8 md:mb-12 md:mt-10">
          {services.map((s) => {
            const img = s.image ? capImage(s.image.assetId) : null;
            return (
              <Reveal
                as="section"
                key={s.id}
                className="scroll-mt-24 border-t border-line-750 py-6 md:py-8"
              >
                <div
                  id={s.id}
                  className="grid items-start gap-4 md:grid-cols-12 md:gap-8"
                >
                  <div className="md:col-span-4">
                    <p className="tech-label text-red-350">{s.index}</p>
                    <h2 className="display mt-1.5 text-2xl text-ink md:text-3xl">
                      {s.title}
                    </h2>
                  </div>
                  <p
                    className={`measure leading-relaxed text-ink-2 ${
                      img ? "md:col-span-5" : "md:col-span-7"
                    }`}
                  >
                    {s.body}
                  </p>
                  {img && s.image && (
                    <div className="md:col-span-3">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-850">
                        <Image
                          src={img.src}
                          alt={s.image.alt}
                          fill
                          sizes="(max-width: 767px) 100vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Full-width pour band, kept shallow. */}
      <Reveal as="section" className="border-t border-line-750">
        <figure>
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-surface-850 md:aspect-[3/1]">
            <Image
              src={aerial.src}
              alt="Aerial view of a concrete pour with multiple agitator trucks staged around the site"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="container-x py-3 text-[0.78rem] leading-relaxed text-ink-3">
            One pour from above: agitators staged around a single deck.
          </figcaption>
        </figure>
      </Reveal>

      <CTABand
        line1="If the package fits, send it."
        line2="If it doesn't, you'll hear quickly."
        action={{ label: "Send a tender", href: "/tenders" }}
        secondary={{ label: "Explore our work", href: "/projects" }}
      />
    </>
  );
}
