import Link from "next/link";
import { BtnLink } from "@/components/ui/Btn";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-start justify-center pb-24 pt-32">
      <p className="tech-label text-orange">404 / SET-OUT ERROR</p>
      <h1 className="display display-tight mt-4 max-w-3xl text-5xl text-ink md:text-7xl">
        This page isn&apos;t on the drawings
      </h1>
      <p className="measure mt-6 text-lg text-ink-2">
        The address doesn&apos;t match anything on this site. Check the URL, or head
        back to the work.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <BtnLink href="/" arrow>
          Back to home
        </BtnLink>
        <BtnLink href="/projects" variant="secondary">
          View projects
        </BtnLink>
        <Link
          href="/tenders"
          className="inline-flex min-h-[44px] items-center px-2 py-3 text-[0.85rem] font-medium text-ink-2 underline underline-offset-4 hover:text-orange"
        >
          Send a tender
        </Link>
      </div>
    </div>
  );
}
