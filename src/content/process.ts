import type { MetricSlot, PourStage, ProcessStage, TestimonialSlot, CareerRole } from "./types";

/** Homepage "How Allscope works" — six stages, each tied to a practical output. */
export const processStages: ProcessStage[] = [
  {
    index: "01",
    code: "REVIEW",
    title: "Review the scope and programme",
    copy: "Drawings, scope and programme read properly before pricing. The right questions get asked at tender, not at the pour.",
    output: "A priced package with the risks named.",
  },
  {
    index: "02",
    code: "PLAN",
    title: "Plan access, labour, plant and sequence",
    copy: "Every pour gets a plan: crew size, pump position, truck staging, sequence and fallback. Planning is what protects the programme.",
    output: "A pour plan the builder can hold us to.",
  },
  {
    index: "03",
    code: "HOLD POINT",
    title: "Check the pre-pour hold point",
    copy: "Access, levels, penetrations, embeds and interfaces checked before trucks are booked. No truck until the pour is ready.",
    output: "A completed readiness check, every pour.",
  },
  {
    index: "04",
    code: "PLACE",
    title: "Mobilise and place",
    copy: "Right crew, right sequence, no lost time. Placement runs to the plan, and the senior person on the job stays reachable.",
    output: "Concrete down clean, on programme.",
  },
  {
    index: "05",
    code: "FINISH",
    title: "Finish and protect",
    copy: "Levels held and surfaces closed to the agreed standard, then protected so the following trades inherit finished work, not repairs.",
    output: "A surface that passes inspection once.",
  },
  {
    index: "06",
    code: "HANDOVER",
    title: "Record, communicate and hand over",
    copy: "What was poured, when, and anything the builder needs to know: recorded and communicated while it still matters.",
    output: "A clean handover with no surprises.",
  },
];

/** THE POUR — signature scroll sequence stages (progress 0–1). */
export const pourStages: PourStage[] = [
  {
    id: "set-out",
    from: 0,
    to: 0.1,
    label: "SET OUT / REVIEW",
    line: "Good concrete starts before the truck arrives.",
    detail:
      "Set-out, levels and the pour boundary reviewed against the drawings before anything is booked.",
  },
  {
    id: "interfaces",
    from: 0.1,
    to: 0.24,
    label: "INTERFACE CHECK",
    line: "Check the interfaces. Protect the programme.",
    detail:
      "Formwork, reinforcement, PT and services are built by others. Allscope checks they are complete, correct and pour-ready.",
  },
  {
    id: "hold-point",
    from: 0.24,
    to: 0.36,
    label: "PRE-POUR HOLD POINT",
    line: "No truck until the pour is ready.",
    detail:
      "Access, levels, penetrations, embeds and weather reviewed at a formal hold point before concrete is called.",
  },
  {
    id: "mobilise",
    from: 0.36,
    to: 0.48,
    label: "MOBILISE",
    line: "Right crew. Right sequence. No lost time.",
    detail:
      "Crew, pump and supply arrive to a plan: positions, staging and pour rate agreed before the first truck backs in.",
  },
  {
    id: "place",
    from: 0.48,
    to: 0.64,
    label: "PLACE",
    line: "Placed in controlled passes, not a race.",
    detail:
      "Concrete placed in a controlled sequence, compacted properly, levels checked as the pour moves.",
  },
  {
    id: "finish",
    from: 0.64,
    to: 0.78,
    label: "FINISH",
    line: "The finish is the proof.",
    detail:
      "Screed, close and trowel to the agreed standard. The surface is the part of the pour everyone sees for the next fifty years.",
  },
  {
    id: "cure",
    from: 0.78,
    to: 0.9,
    label: "CURE / PROTECT",
    line: "Protect the work after the pour.",
    detail:
      "Curing and protection hold the quality that was just placed, so following trades inherit finished work.",
  },
  {
    id: "handover",
    from: 0.9,
    to: 1,
    label: "HANDOVER / PROOF",
    line: "Pour it right. First time.",
    detail:
      "Records, communication and a clean handover. The proof of the process is the project itself.",
  },
];

/**
 * Homepage metric strip. Values render ONLY when status === "verified".
 * No figure may be invented; slots display a verification state until the
 * owner supplies supportable numbers. See docs/CONTENT-VERIFICATION.md.
 */
export const metricSlots: MetricSlot[] = [
  {
    label: "Years of relevant team experience",
    status: "unverified",
    note: "Owner to confirm combined senior experience wording",
  },
  {
    label: "Projects delivered",
    status: "unverified",
    note: "Owner to confirm countable completed projects",
  },
  {
    label: "Concrete placed",
    status: "unverified",
    note: "Owner to confirm supportable volume records",
  },
  {
    label: "Largest verified pour",
    status: "unverified",
    note: "Owner to confirm pour records",
  },
  {
    label: "Repeat builder relationships",
    status: "unverified",
    note: "Repeat engagements exist in the public record (Binah, Versatile); exact count to confirm",
  },
  {
    label: "Safety record",
    status: "unverified",
    note: "Owner to supply a supportable safety statistic",
  },
];

/** Homepage testimonial slots — honest placeholders until approvals arrive. */
export const testimonialSlots: TestimonialSlot[] = [
  {
    project: "To be confirmed",
    permission: "not-requested",
  },
];

export const careerRoles: CareerRole[] = [
  {
    title: "Concrete finisher",
    note: "Experienced on suspended decks and structural work.",
    status: "unverified",
  },
  {
    title: "Leading hand finisher",
    note: "Runs a finishing crew and owns the surface standard.",
    status: "unverified",
  },
  {
    title: "Concreter / labourer",
    note: "White Card required; formwork-adjacent experience valued.",
    status: "unverified",
  },
  {
    title: "Concrete foreman",
    note: "Plans and runs pours end to end with the senior team.",
    status: "unverified",
  },
];
