import { site } from "@/content/site";

/**
 * Structured data built from verified/attributable facts only.
 * Deliberately omitted until verified: foundingDate, address, employee counts,
 * awards, certifications, aggregate ratings. Phone/email are included because
 * they appear in Allscope's own collateral, but remain on the verification
 * checklist before launch.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brandName,
    legalName: site.legalEntity,
    url: site.url,
    telephone: "+61 499 969 991",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sydney, New South Wales, Australia",
    },
    description: site.descriptor,
    knowsAbout: [
      "Concrete placement",
      "Concrete finishing",
      "Suspended slab concrete placement",
      "Basement concrete works",
      "Live-site concrete works",
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
