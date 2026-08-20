import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website terms",
  description: "Terms of use for the Allscope Concrete website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-x pb-24 pt-32 md:pt-40">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="display display-tight mt-8 text-5xl text-ink md:text-6xl">Website terms</h1>
      <p className="mt-4">
        <VerifyChip label="LEGAL REVIEW REQUIRED" title="Placeholder terms - must be reviewed by a legal professional before launch" />
      </p>
      <div className="measure mt-8 space-y-6 leading-relaxed text-ink-2">
        <p>
          This is a placeholder terms page prepared for legal review before launch.
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Information on this site</h2>
        <p>
          Content on this website describes {site.brandName}&apos;s services and project
          experience in general terms. It is not an offer, quotation or contractual
          commitment. Project engagements are governed by their own written contracts.
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Intellectual property</h2>
        <p>
          The Allscope name, logo and site content belong to {site.legalEntity} or
          their respective owners and may not be reproduced without permission.
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Third-party references</h2>
        <p>
          Project and builder names appear as factual references to published project
          records. They do not imply endorsement.
        </p>
      </div>
    </div>
  );
}
