import type { Metadata } from "next";
import { CTABand } from "@/components/cinema/Editorial";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reviews",
  description:
    "What builders and project managers say about working with Allscope Concrete on commercial concreting packages across Sydney. Project references available on request.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <div className="container-x pb-12 pt-24 md:pb-16">
        <Reveal>
          <p className="eyebrow">Reviews</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            In their words
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            These are the people Allscope answers to on site: builders and
            project managers. Their words are reproduced as they gave them.
          </p>
        </Reveal>

        <div className="mt-12 max-w-3xl space-y-12 md:mt-16 md:space-y-16">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <figure className="border-l-2 border-red pl-6 md:pl-10">
                <blockquote className="display text-2xl leading-snug text-ink md:text-3xl">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                  {r.name} · {r.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 border-t border-line-750 pt-6 md:mt-20">
          <p className="measure text-[0.9rem] leading-relaxed text-ink-2">
            Want to hear it first-hand? Contact details for previous projects
            are available on request. Call{" "}
            <a
              href={site.phoneHref}
              className="font-medium text-ink underline underline-offset-2 hover:text-red-350"
            >
              {site.phone}
            </a>{" "}
            and ask.
          </p>
        </Reveal>
      </div>

      <CTABand
        line1="Judge the work, not the words."
        line2="Send a package and see how it runs."
      />
    </>
  );
}
