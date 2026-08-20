import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { VerifyChip } from "@/components/ui/VerifyChip";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Allscope Concrete collects, uses and stores personal information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-x pb-24 pt-32 md:pt-40">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <h1 className="display display-tight mt-8 text-5xl text-ink md:text-6xl">Privacy policy</h1>
      <p className="mt-4">
        <VerifyChip label="LEGAL REVIEW REQUIRED" title="Placeholder policy - must be reviewed by a legal professional before launch" />
      </p>
      <div className="measure mt-8 space-y-6 leading-relaxed text-ink-2">
        <p>
          This is a placeholder privacy policy prepared for review. It must be checked
          and approved by a legal professional before the website launches.
        </p>
        <h2 className="display pt-4 text-2xl text-ink">What is collected</h2>
        <p>
          Information you submit through this site: contact details (name, company,
          role, email, phone), enquiry messages, tender package details and uploaded
          documents, and careers information including CVs and licence details.
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Why it is collected</h2>
        <p>
          To respond to enquiries, price and respond to tender packages, and assess
          expressions of interest in working with {site.brandName}. Information is not
          sold or used for unrelated marketing.
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Storage and retention</h2>
        <p>
          Submissions are stored securely and are not publicly accessible. Tender
          documents and careers files are retained for 12 months and then deleted,
          unless a live engagement requires longer.{" "}
          <VerifyChip label="VERIFY: retention period" />
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Third-party processors</h2>
        <p>
          When email delivery, file storage and analytics providers are connected,
          they will be listed here with links to their privacy policies.{" "}
          <VerifyChip label="INTEGRATION REQUIRED: processor list" />
        </p>
        <h2 className="display pt-4 text-2xl text-ink">Access and correction</h2>
        <p>
          To access, correct or delete information you have submitted, contact{" "}
          {site.brandName} on {site.phone}.
        </p>
      </div>
    </div>
  );
}
