/**
 * Central business configuration. Single source of truth for company facts.
 * Anything marked VERIFY must be confirmed by the owner before launch —
 * see docs/CONTENT-VERIFICATION.md for the full checklist.
 */

export const PREVIEW_MODE = true as const;
/**
 * PREVIEW_MODE = true renders verification chips and media-placeholder spec
 * sheets across the site. Flip to false only after the content-verification
 * checklist is signed off. Placeholder markers must never ship to production.
 */

export const site = {
  brandName: "Allscope Concrete",
  /** VERIFY: legal entity current + correct before launch. Source: ABR 23 Jul 2026. */
  legalEntity: "Allscope Concrete Group Pty Ltd",
  abn: "11 643 746 543",
  abnStatus: "verified" as const, // confirmed correct by the owner, 20 Aug 2026

  /** Confirmed correct by the owner, 20 Aug 2026. */
  phone: "0499 969 991",
  phoneHref: "tel:+61499969991",
  phoneStatus: "verified" as const,

  /** Owner has not supplied an email yet; display copy says so. Do not render a mailto until this is real. */
  email: "", emailPending: "Still need to add",
  emailStatus: "unverified" as const,

  tenderRecipientNote:
    "INTEGRATION REQUIRED: confirm the tender inbox and connect email delivery. Submissions are stored locally until then.",

  serviceArea: "Sydney metro and Greater Western Sydney", // VERIFY exact reach
  serviceAreaStatus: "unverified" as const,

  /** No street address is published by design. Region from ABR: NSW 2142. */
  baseRegion: "Western Sydney, NSW",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://allscopeconcrete.com.au",

  descriptor:
    "Senior-led concrete placement and finishing for commercial, multi-residential and industrial projects across Sydney.",

  /** VERIFY: confirm exact handle ownership before linking publicly. */
  instagram: "https://www.instagram.com/allscope_concrete/",
  instagramStatus: "unverified" as const,

  responseWording:
    "Allscope reviews every package that comes in and comes back with the right questions. No unattended inbox.",

  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/gallery", label: "Gallery" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/about", label: "About" },
    { href: "/reviews", label: "Reviews" },
    { href: "/safety-quality", label: "Safety & Quality" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],

  cta: { href: "/tenders", label: "Send a tender" },

  footerLinks: [
    { href: "/tenders", label: "Tender Hub" },
    { href: "/projects", label: "Projects" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/about", label: "About" },
    { href: "/safety-quality", label: "Safety & Quality" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export type SiteConfig = typeof site;
