"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change (state adjustment during render — React's
  // recommended pattern, avoids an effect-driven cascade)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  // Focus trap + escape + scroll lock for the mobile drawer
  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    document.body.style.overflow = "hidden";
    const drawerFocusables = Array.from(
      drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    // The burger toggle sits in the header, outside the drawer, but is the
    // dialog's close control — treat it as the first element of the cycle so
    // Tab can reach it without escaping the trap.
    const toggle = burgerRef.current;
    const focusables = toggle ? [toggle, ...drawerFocusables] : drawerFocusables;
    drawerFocusables[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  return (
    <>
    <header
      className="site-header fixed inset-x-0 top-0 z-50"
      data-scrolled={scrolled || menuOpen}
      data-over-film={pathname === "/" || undefined}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Allscope Concrete — home"
        >
          <Logo height={26} />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link py-2 text-[0.85rem] font-medium text-ink-2 hover:text-ink"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            onClick={() => track("phone_click", { location: "header" })}
            className="tech-label hidden py-2 text-ink-2 hover:text-red-350 xl:block"
          >
            {site.phone}
          </a>
          <Link
            href={site.cta.href}
            className="hidden items-center bg-red px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#c81f1e] sm:inline-flex"
          >
            {site.cta.label}
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "mobile-menu" : undefined}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`h-[2px] w-6 bg-ink transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-[2px] w-6 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-[2px] w-6 bg-ink transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

    </header>

    {/* Mobile drawer — rendered OUTSIDE <header>: the header's backdrop-filter
        creates a containing block that would break fixed positioning. */}
    {menuOpen && (
        <div
          ref={drawerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto border-t border-line-750 bg-bg-950 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex flex-col py-6">
            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line-750 py-4 font-display text-2xl font-semibold uppercase text-ink hover:text-orange"
                aria-current={isActive(item.href) ? "page" : undefined}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <span className="tech-label mr-3 text-orange">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="container-x mt-auto flex flex-col gap-3 pb-8">
            <Link
              href={site.cta.href}
              className="inline-flex min-h-[48px] items-center justify-center bg-red px-6 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-white"
            >
              {site.cta.label}
            </Link>
            <a
              href={site.phoneHref}
              onClick={() => track("phone_click", { location: "mobile_menu" })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] border border-line-600 px-6 py-3.5 font-display text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-ink"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
