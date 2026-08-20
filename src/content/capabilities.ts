import type { Capability, Faq, VerifyStatus } from "./types";

/**
 * Service matrix. Every capability wording is subject to owner confirmation —
 * see docs/CONTENT-VERIFICATION.md. Reinforcement installation, formwork
 * installation and concrete supply are explicitly NOT offered (see exclusions).
 */

export const capabilities: Capability[] = [
  {
    id: "placement",
    index: "01",
    title: "Structural concrete placement",
    status: "unverified",
    performs: [
      "Slabs on ground, rafts and footings",
      "Suspended decks, beams and bands",
      "Columns, walls and cores placed to formwork by others",
    ],
    description:
      "Controlled placement of structural concrete: the right crew size for the pour, a planned sequence, and placement that respects the structural system built by the trades before us.",
    boundaries:
      "Placement into formwork and reinforcement installed by others. Allscope checks the interfaces; it does not install them.",
    relatedProjectSlugs: ["babylon", "auburn-square", "kennards-macquarie-park"],
    assetId: "CAP-PLACE-01",
  },
  {
    id: "finishing",
    index: "02",
    title: "Concrete finishing",
    status: "unverified",
    performs: [
      "Screeding and level control",
      "Machine and hand trowelled finishes",
      "Edges, falls, set-downs and detail work",
    ],
    description:
      "The finish is the part of the pour everyone sees. Levels held, surfaces closed properly, details done once. Finish standards are agreed with the builder before the pour, not argued after it.",
    relatedProjectSlugs: ["oran-park-hotel", "ed-square"],
    assetId: "CAP-FINISH-01",
  },
  {
    id: "suspended-slabs",
    index: "03",
    title: "Suspended slabs and podiums",
    status: "unverified",
    performs: [
      "Suspended deck pours over occupied and unoccupied levels",
      "Podium and transfer-level placement",
      "Work over post-tensioned and Bondek systems built by others",
    ],
    description:
      "Multi-level work where every deck sits over someone else's finished work. Interfaces, propping status and stressing sequence are confirmed before placement.",
    boundaries:
      "Post-tensioning design, stressing and decking are by others. VERIFY: exact involvement wording with the owner.",
    relatedProjectSlugs: ["ed-square", "kennards-macquarie-park"],
    assetId: "CAP-SLAB-01",
  },
  {
    id: "basements",
    index: "04",
    title: "Basement and below-ground works",
    status: "unverified",
    performs: [
      "Basement rafts, walls and suspended basement decks",
      "Deep pours with constrained access and pump logistics",
      "Blinding and preparation pours",
    ],
    description:
      "Below-ground pours are won on logistics: ramp access, pump reach, ventilation and sequence. Four-level basements on the portfolio prove the planning holds up under real constraints.",
    relatedProjectSlugs: ["auburn-square", "babylon"],
    assetId: "CAP-BASEMENT-01",
  },
  {
    id: "live-site",
    index: "05",
    title: "Live-site and staged works",
    status: "unverified",
    performs: [
      "Staged programmes in operating environments",
      "Night and possession-window works",
      "Protection and handback of live areas",
    ],
    description:
      "Working where the business never stops: an operating airport terminal, a trading storage facility. Stages are planned as their own mini-projects with clean handbacks.",
    relatedProjectSlugs: ["sydney-international-airport", "kennards-macquarie-park"],
    assetId: "CAP-LIVE-SITE-01",
  },
  {
    /* Owner confirmed 27 Jul 2026 with reference photographs: Allscope operates
       its own truck-mounted boom pump, carrying an Allscope decal on the boom
       arm. Make/model/reach are NOT confirmed. This was previously written
       as subcontracted coordination and has been corrected. */
    id: "pumping",
    index: "06",
    title: "Concrete pumping with our own boom pump",
    status: "unverified",
    performs: [
      "Placement using Allscope's own truck-mounted boom pump",
      "Boom set-up, positioning and exclusion-zone control",
      "Reach and access planning per pour, including tight and staged sites",
      "Concrete supply deliveries sequenced to the pour rate",
    ],
    description:
      "Allscope runs its own boom pump, so the pour rate is Allscope's to control instead of a third party's. That is one less subcontractor between the plan and the slab, and one less reason for a pour to sit waiting.",
    boundaries:
      "VERIFY: the machine's make, model and reach, and whether the pump is used only on Allscope's own placement packages or also supplied to other contractors with an operator. No specification is published until confirmed.",
    relatedProjectSlugs: ["babylon", "auburn-square"],
    /* Deliberately NOT CAP-PLANT-01: that slot carries the plant section lower
       on this page, and the same placeholder twice on one page reads as a bug.
       This row wants the boom actually placing concrete. */
    assetId: "HOME-POUR-02",
  },
];

/**
 * Plant Allscope owns and operates. Only list machines the owner has confirmed.
 * Never imply hired or third-party plant belongs to Allscope.
 */
export const plant: Array<{
  name: string;
  detail: string;
  status: VerifyStatus;
  note: string;
}> = [
  {
    name: "Truck-mounted concrete placing boom",
    detail:
      "Owned and operated by Allscope, in Allscope livery. Make, model and reach to be confirmed before any specification is published.",
    status: "unverified",
    note: "Ownership owner-confirmed 27 Jul 2026 from reference photographs. An earlier draft named a specific make and model; the owner advised that was not correct, so no machine details are stated. Confirm make, model, reach and whether there is more than one machine.",
  },
];

/** Activities Allscope does NOT perform. Pumping is deliberately absent — it is
 *  an in-house capability (see the `pumping` entry above). */
export const exclusions = [
  {
    label: "Reinforcement installation",
    note: "Not performed. Reo is installed by others; Allscope checks it is complete and pour-ready.",
  },
  {
    label: "Formwork installation",
    note: "Not performed. Formwork is by others; Allscope checks edges, penetrations and props before placement.",
  },
  {
    label: "Concrete supply",
    note: "Not a supplier. Concrete comes from established batching suppliers; Allscope coordinates deliveries to the pour.",
  },
  {
    label: "Post-tensioning",
    note: "Design, ducting and stressing by others. Allscope places around PT systems and respects stressing sequences.",
  },
];

export const faqs: Faq[] = [
  {
    q: "What packages does Allscope tender for?",
    a: "Concrete placement and finishing packages on commercial, multi-residential and industrial projects: structures, suspended decks, basements and staged works. If you are unsure whether a package fits, send the drawings and ask.",
    status: "unverified",
  },
  {
    q: "Does Allscope install reinforcement or formwork?",
    a: "No. Reo and formwork are installed by other trades. Allscope checks those interfaces as part of pre-pour readiness so the pour is not booked until the deck is genuinely ready.",
    status: "verified",
  },
  {
    q: "Does Allscope pump its own concrete?",
    a: "Yes. Allscope owns and operates its own truck-mounted boom pump, so placement and pumping sit with the one contractor. Concrete supply still comes from established batching suppliers.",
    status: "unverified",
  },
  {
    q: "What area does Allscope service?",
    a: "Sydney metro and Greater Western Sydney. For projects outside this area, ask before ruling it out.",
    status: "unverified",
  },
  {
    q: "What should a tender package include?",
    a: "Drawings, scope of works, programme and any schedules you have. Site constraints worth flagging early: access, staging, live operations and finish requirements. The more complete the package, the faster the response.",
    status: "verified",
  },
  {
    q: "Can Allscope work nights, weekends or possession windows?",
    a: "Staged and out-of-hours works have been part of past programmes, including live-terminal works at Sydney Airport. Confirm current availability for your programme when tendering.",
    status: "unverified",
  },
  {
    q: "Can I get insurance and licence documents?",
    a: "Current documents are provided on request as part of prequalification. Use the document request option on the Tender Hub.",
    status: "unverified",
  },
];
