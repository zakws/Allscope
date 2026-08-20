/**
 * Client reviews — the single source both the homepage band and /reviews
 * render from.
 *
 * Every entry is a real testimonial published on Allscope's previous website
 * (allscopeconcrete.com.au, retrieved 20 Aug 2026), reproduced faithfully
 * with only obvious spelling corrected. Nothing here may be invented,
 * embellished or paraphrased; new reviews are added only when Ali supplies
 * them with the reviewer's permission.
 */
export interface Review {
  quote: string;
  name: string;
  role: string;
}

export const reviews: Review[] = [
  {
    quote:
      "Ali displayed a thorough understanding of OHS management of his team, adhering to the construction program and quality management. I would recommend All Scope Concreting to any prospective client.",
    name: "Jayson Munnings",
    role: "Director",
  },
  {
    quote:
      "Ali will go out of his way to make sure that the client (Builder) and his fellow contractors are satisfied.",
    name: "John Sassen",
    role: "Project Manager",
  },
];
