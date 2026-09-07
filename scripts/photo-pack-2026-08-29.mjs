/**
 * Final website-ready photo pack, 29 Aug 2026 — authored integration
 * decisions for "Allscope-FINAL-Website-Ready-Photo-Pack-2026-08-29"
 * (00-ASSET-MANIFEST.json is the authoritative source for titles, order,
 * roles, alt text and focal positions; alt text below is copied verbatim).
 *
 * The pack supplied 37 images across 10 projects. Integration accounting:
 *   - 24 files installed (this module): 19 on 29 Aug, plus the 5 El Jannah
 *     Minto images on 30 Aug 2026 after Ali confirmed Minto is an Allscope
 *     job (the hold in pack folder 05 is lifted; the project record is the
 *     `elJannahMinto` export below). El Jannah Prestons is a separate
 *     location and its page is untouched.
 *   - 13 files already live on the site in the same or a higher-resolution
 *     master (perceptual-hash match, confirmed visually): One The Waterfront
 *     construction trio = ASC-OTW-005/006/007, VIEW Rockdale hero =
 *     OJ4-VRK-02 and construction shot = ASC-VRK-005, BP Prestons hero =
 *     the current lead and both forecourt shots = OJ4-BPP-01/02, and the
 *     entire Asha folder (lead ASC-ASH-004 + ASC-ASH-005..007 + OJ4-ASH-01/02)
 *
 * RIGHTS: the pack is technically prepared but does not itself grant
 * commercial reuse rights (00-SOURCE-AND-PERMISSION-REGISTER.md). Permission
 * per source party remains outstanding; recorded per project in
 * docs/PHOTO-INTEGRATION-REGISTER.md. Do not production-deploy before Ali
 * confirms.
 */

/** Pack folder on disk (outside the repo; never published). */
export const PACK_DIR =
  "C:/Users/zakar/OneDrive/Desktop/Allscope website/Allscope-FINAL-Website-Ready-Photo-Pack-2026-08-29/Allscope-FINAL-Website-Ready-Photo-Pack-2026-08-29";

/**
 * Per-slug integration. `lead` replaces the project's lead (null = keep the
 * existing lead); `gallery` rows are PREPENDED to the existing gallery in
 * pack numeric order (the strict-final curation opens the sequence).
 * objectPosition comes from the manifest and is applied only where the
 * design crops (cards and page heroes); project galleries render at native
 * proportions, so no focal value is needed on gallery rows.
 */
export const photoPack = [
  {
    slug: "oran-park-hotel",
    // Replaces the interim owner render (26 Aug): the pack supplies real
    // completed-hotel photography, so the render lead retires entirely.
    lead: {
      assetId: "PK-OPH-01",
      file: "03-Oran-Park-Hotel/01-hero-completed-hotel-exterior.webp",
      alt: "Completed Oran Park Hotel exterior",
      objectPosition: "50% 52%",
    },
    gallery: [
      {
        assetId: "PK-OPH-02",
        file: "03-Oran-Park-Hotel/02-gallery-wide-street-exterior.webp",
        alt: "Wide street view of the completed Oran Park Hotel",
      },
      {
        assetId: "PK-OPH-03",
        file: "03-Oran-Park-Hotel/03-gallery-branded-concrete-wall.webp",
        alt: "Oran Park Hotel name formed in a concrete wall",
      },
      {
        assetId: "PK-OPH-04",
        file: "03-Oran-Park-Hotel/04-gallery-concrete-side-elevation.webp",
        alt: "Concrete side elevation and landscaping at Oran Park Hotel",
      },
      {
        assetId: "PK-OPH-05",
        file: "03-Oran-Park-Hotel/05-gallery-exposed-concrete-facade.webp",
        alt: "Exposed concrete facade at Oran Park Hotel",
      },
    ],
  },
  {
    slug: "one-the-waterfront",
    // Completed-exterior hero replaces the overcast construction-stage lead
    // (PROJECT-08…), which retires: the gallery already documents
    // construction better. Pack construction trio = ASC-OTW-005/006/007
    // (identical files at identical resolution), already in the gallery.
    lead: {
      assetId: "PK-OTW-01",
      file: "01-One-the-Waterfront-Wentworth-Point/01-hero-completed-exterior.webp",
      alt: "Completed One the Waterfront apartment building at Wentworth Point",
      objectPosition: "50% 50%",
    },
    gallery: [],
  },
  {
    slug: "view-rockdale",
    // Lead unchanged: the existing professional twilight elevation is the
    // strongest image of the completed building (the pack's own wide-dusk
    // pick is the same session). Pack hero already lives in the gallery as
    // OJ4-VRK-02 at 2000px; pack construction shot = ASC-VRK-005.
    lead: null,
    gallery: [
      {
        assetId: "PK-VRK-02",
        file: "02-View-Rockdale/02-gallery-wide-dusk-exterior.webp",
        alt: "View Rockdale exterior at dusk",
      },
      {
        assetId: "PK-VRK-04",
        file: "02-View-Rockdale/04-gallery-architectural-courtyard.webp",
        alt: "Architectural courtyard view at View Rockdale",
      },
    ],
  },
  {
    slug: "bp-prestons",
    // Lead unchanged: the current lead IS the pack hero (same photograph).
    // Pack forecourt-entry and truck-area shots = OJ4-BPP-02/01 at higher
    // resolution, already in the gallery. Only the aerial is new.
    lead: null,
    gallery: [
      {
        assetId: "PK-BPP-02",
        file: "04-BP-Prestons/02-gallery-aerial-site-overview.webp",
        alt: "Aerial overview of BP Prestons and its surrounding industrial area",
      },
    ],
  },
  {
    slug: "bp-oberon",
    // The old lead (PROJECT-16…) was person-dominant — a posed portrait in
    // front of the store — exactly what this pack removes; it retires.
    lead: {
      assetId: "PK-BPO-01",
      file: "06-BP-Oberon/01-hero-completed-forecourt.webp",
      alt: "Completed BP Oberon service station, forecourt and concrete apron",
      objectPosition: "50% 50%",
    },
    gallery: [
      {
        assetId: "PK-BPO-02",
        file: "06-BP-Oberon/02-gallery-branded-entrance-and-concrete-apron.webp",
        alt: "BP Oberon entrance and concrete apron",
      },
    ],
  },
  {
    // Hold lifted 30 Aug 2026: Ali confirmed El Jannah Minto is an Allscope
    // job. New record below (elJannahMinto); folder 05's full five images.
    slug: "el-jannah-minto",
    lead: {
      assetId: "PK-EJM-01",
      file: "05-El-Jannah-Minto-HOLD-LOCATION-CONFIRMATION/01-hero-completed-exterior.webp",
      alt: "Completed El Jannah Minto restaurant exterior",
      objectPosition: "50% 50%",
    },
    gallery: [
      {
        assetId: "PK-EJM-02",
        file: "05-El-Jannah-Minto-HOLD-LOCATION-CONFIRMATION/02-gallery-construction-aerial.webp",
        alt: "Aerial construction view of the El Jannah Minto building",
      },
      {
        assetId: "PK-EJM-03",
        file: "05-El-Jannah-Minto-HOLD-LOCATION-CONFIRMATION/03-gallery-concrete-drive-through.webp",
        alt: "Concrete drive-through pavement at El Jannah Minto",
      },
      {
        assetId: "PK-EJM-04",
        file: "05-El-Jannah-Minto-HOLD-LOCATION-CONFIRMATION/04-gallery-front-elevation.webp",
        alt: "Front elevation of the completed El Jannah Minto restaurant",
      },
      {
        assetId: "PK-EJM-05",
        file: "05-El-Jannah-Minto-HOLD-LOCATION-CONFIRMATION/05-gallery-side-elevation-and-pavement.webp",
        alt: "Side elevation and concrete pavement at El Jannah Minto",
      },
    ],
  },
  {
    slug: "bunnings-rose-bay",
    lead: {
      assetId: "PK-BRB-01",
      file: "08-Bunnings-Rose-Bay/01-hero-building-exterior.webp",
      alt: "Bunnings Rose Bay building on Old South Head Road",
      objectPosition: "50% 50%",
    },
    gallery: [],
  },
  {
    slug: "al-noori-muslim-school",
    lead: {
      assetId: "PK-ANS-01",
      file: "09-Al-Noori-Muslim-School/01-hero-suspended-slab-concrete-pour.webp",
      alt: "Suspended-slab concrete pour at Al Noori Muslim School",
      objectPosition: "50% 58%",
    },
    gallery: [
      {
        assetId: "PK-ANS-02",
        file: "09-Al-Noori-Muslim-School/02-gallery-concrete-pour-and-reinforcement.webp",
        alt: "Concrete booms, reinforcement and slab work at Al Noori Muslim School",
      },
    ],
  },
  {
    slug: "chalmers-hotel-mascot",
    // The live structural-work photograph leads; the architectural render is
    // last in the gallery and carries the "Artist's impression" label. Source
    // photos are native 800px (Kuatro's posts) — acceptable on cards, soft on
    // the full-width page hero; noted in the integration register.
    lead: {
      assetId: "PK-CHM-01",
      file: "10-Chalmers-Hotel-Mascot/01-hero-current-structural-works.webp",
      alt: "Current reinforcement and structural works at Chalmers Hotel in Mascot",
      objectPosition: "50% 55%",
    },
    gallery: [
      {
        assetId: "PK-CHM-02",
        file: "10-Chalmers-Hotel-Mascot/02-gallery-current-site-overview.webp",
        alt: "Current construction-site overview at Chalmers Hotel in Mascot",
      },
      {
        assetId: "PK-CHM-03",
        file: "10-Chalmers-Hotel-Mascot/03-gallery-reinforcement-and-formwork.webp",
        alt: "Reinforcement and formwork at Chalmers Hotel in Mascot",
      },
      {
        assetId: "PK-CHM-04",
        file: "10-Chalmers-Hotel-Mascot/04-gallery-current-deck-and-reinforcement.webp",
        alt: "Deck preparation and reinforcement at Chalmers Hotel in Mascot",
      },
      {
        assetId: "PK-CHM-05",
        file: "10-Chalmers-Hotel-Mascot/05-gallery-design-render.webp",
        alt: "Architectural design render of Chalmers Hotel in Mascot",
        render: true,
      },
    ],
  },
];

/**
 * New project record, added 30 Aug 2026 when Ali confirmed El Jannah Minto
 * is an Allscope job (lifting the pack's location hold). Facts stay minimal
 * like the other client-confirmed jobs: no builder, year, value or package
 * is invented — Abacorp presents the project on its own site, but Allscope's
 * contracting party is not confirmed. Lead and gallery come from the
 * photoPack entry above.
 */
export const elJannahMinto = {
  slug: "el-jannah-minto",
  order: 19,
  code: "EJM",
  name: "El Jannah Minto",
  location: "Minto",
  sector: "hospitality",
  team: "Delivery team not recorded",
  legacyPage: null,
  status: "completed",
  statusNote: null,
  lead: null,
  gallery: [],
  overview:
    "Allscope Concrete delivered concrete works for the El Jannah restaurant at Minto.",
};

/**
 * Existing gallery rows retired by this integration (files removed by
 * clean-orphan-media.mjs after regeneration):
 *   - ASC-ASH-008 / ASC-ASH-010: same photographs as OJ4-ASH-01 / OJ4-ASH-02
 *     (2000px masters) which stay — a pre-existing duplicate pair on the
 *     Asha page surfaced by the pack's perceptual-hash pass
 *   - OJ4-BPO-01: entrance shot with the shop interior visible through the
 *     open doors; superseded by the pack's clean branded-entrance exterior
 *     (PK-BPO-02) per the "exteriors, not shop interiors" rule
 */
export const supersededGalleryAssets = new Set([
  "ASC-ASH-008",
  "ASC-ASH-010",
  "OJ4-BPO-01",
]);
