/**
 * Allscope Concrete — typed content layer.
 *
 * This models a future headless-CMS schema (e.g. Sanity) 1:1 so content can
 * migrate cleanly. Every claim carries evidence metadata so unverified
 * statements cannot silently become "facts".
 */

/** Evidence grades, mirrored from the July 2026 public-source research register. */
export type EvidenceGrade =
  | "A" // explicit published Allscope scope + independent corroboration
  | "B" // explicit published Allscope scope, incomplete corroboration
  | "C"; // portfolio association only — must not launch as a case study

export type PermissionStatus =
  | "approved" // written permission held on file
  | "pending" // requested, awaiting reply
  | "not-requested"
  | "declined";

export type VerifyStatus =
  | "verified" // confirmed by the owner / a primary document
  | "published-source" // stated on a public page by the named party (attributable)
  | "unverified"; // must not publish as fact

/** A single publishable claim with provenance. */
export interface Claim {
  text: string;
  status: VerifyStatus;
  /** Who said it / where it comes from (URL or note). */
  source?: string;
}

export type SectorId =
  | "commercial"
  | "multi-residential"
  | "industrial"
  | "mixed-use"
  | "hospitality";

export interface Sector {
  id: SectorId;
  label: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  status: VerifyStatus;
  source?: string;
}

export interface GallerySlot {
  /** Media-manifest asset id (see media.ts). */
  assetId: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  sector: SectorId;
  /** Case-study tier. Secondary projects render a reduced template. */
  tier: "flagship" | "secondary";
  status: "completed" | "in-progress";
  completion?: Claim;
  /** Builder / head contractor. Naming is factual; LOGO use needs approval. */
  builder?: {
    name: string;
    nameStatus: VerifyStatus;
    logoPermission: PermissionStatus;
  };
  /** One-sentence exact Allscope scope. */
  scope: Claim;
  /** What the package did NOT include (interfaces checked, not installed). */
  exclusionsNote: string;
  /** Development-context facts, attributed to their public source. */
  contextFacts: ProjectMetric[];
  challenge: string[];
  method: string[];
  result: Claim[];
  capabilityIds: string[];
  heroAssetId: string;
  gallery: GallerySlot[];
  relatedSlugs: string[];
  evidenceGrade: EvidenceGrade;
  claimSource: string;
  lastVerified: string; // ISO date of last evidence check
  seoDescription: string;
  /** Optional card-level standout fact (must be a contextFact). */
  cardFact?: string;
}

export interface Capability {
  id: string;
  index: string; // "01"…
  title: string;
  status: VerifyStatus;
  /** What Allscope directly performs / coordinates / excludes. */
  performs: string[];
  description: string;
  boundaries?: string;
  relatedProjectSlugs: string[];
  assetId: string;
}

export interface ProcessStage {
  index: string;
  code: string; // short technical code e.g. "SET-OUT"
  title: string;
  copy: string;
  output?: string; // practical output tied to the step
}

export interface PourStage {
  id: string;
  /** progress range within the scroll sequence, 0–1 */
  from: number;
  to: number;
  label: string;
  line: string; // on-screen proof line
  detail: string; // static/reduced-motion equivalent copy
}

export interface Faq {
  q: string;
  a: string;
  status: VerifyStatus;
}

export interface CareerRole {
  title: string;
  note: string;
  status: VerifyStatus;
}

export type MediaRightsStatus =
  | "allscope-owned"
  | "third-party-uncleared"
  | "third-party-approved"
  | "to-be-shot"
  /**
   * AI-generated concept imagery. Permitted ONLY in atmosphere/illustration
   * slots (hero backdrop, THE POUR stages, capability mood panels), never in
   * project galleries, people slots or anything presented as proof of real
   * work. Always visibly labelled in preview; the brief treats these as
   * styled placeholders to be replaced by real photography before launch.
   * See docs/AI-IMAGERY.md.
   */
  | "ai-concept";

export interface MediaAsset {
  id: string;
  page: string;
  section: string;
  title: string;
  description: string;
  aspectRatio: string; // e.g. "16/9"
  desktopCrop: string;
  mobileCrop: string;
  altTextDraft: string;
  captionDraft?: string;
  lighting?: string;
  ppeNotes: string;
  brandingNotes: string;
  rightsStatus: MediaRightsStatus;
  owner?: string;
  approvalStatus: PermissionStatus;
  project?: string;
  date?: string;
  photographer?: string;
  replaceBeforeLaunch: boolean;
  /** When a real, cleared file exists, set its /public path here. */
  src?: string;
  /**
   * Optional true "before" image for before/after treatments (the hero hover
   * reveal): same camera position before the pour. When absent, the effect
   * falls back to a greyscale copy of `src`.
   */
  srcBefore?: string;
}

export interface MetricSlot {
  label: string;
  /** Only rendered when status === "verified". */
  value?: string;
  status: VerifyStatus;
  note: string;
}

export interface TestimonialSlot {
  name?: string;
  role?: string;
  company?: string;
  project?: string;
  quote?: string;
  permission: PermissionStatus;
}
