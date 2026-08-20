import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";

/** Footer as a proper project-information block. */
export function Footer() {
  return (
    <footer className="border-t border-line-750 bg-bg-950">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo height={30} />
            <p className="measure mt-5 text-[0.92rem] leading-relaxed text-ink-2">
              {site.descriptor}
            </p>
            <p className="tech-label mt-6 text-ink-3">
              PLAN / CHECK / PLACE / FINISH
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="tech-label mb-4 text-ink-3">Site</p>
            <ul className="space-y-2.5">
              {site.footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.9rem] text-ink-2 hover:text-orange"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="tech-label mb-4 text-ink-3">Contact</p>
            <ul className="space-y-2.5 text-[0.9rem] text-ink-2">
              <li>
                <a href={site.phoneHref} className="hover:text-orange">
                  {site.phone}
                </a>{" "}
               
              </li>
              <li>
                <span className="text-ink-3">Email: {site.emailPending}</span>
              </li>
              <li>
                Service area: {site.serviceArea}
              </li>
              <li>Based in {site.baseRegion}</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/tenders"
                className="tech-label inline-flex items-center gap-2 text-orange hover:text-orange-400"
              >
                Send a tender →
              </Link>
            </div>
          </div>
        </div>

        <div className="divider-rule mt-12" />

        <div className="mt-6 flex flex-col gap-3 text-[0.78rem] text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brandName} · {site.legalEntity} · ABN{" "}
            {site.abn}
          </p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink-2">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink-2">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
