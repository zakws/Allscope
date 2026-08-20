import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-6 py-3.5 font-display text-[0.82rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 min-h-[44px]";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-[#c81f1e] active:bg-[#b21b1a]",
  secondary:
    "border border-line-600 text-ink hover:border-orange hover:text-orange",
  ghost: "text-orange hover:text-orange-400 px-2",
};

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M1 7h11M8 2.5 12.5 7 8 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function BtnLink({
  href,
  variant = "primary",
  children,
  arrow = false,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Btn({
  variant = "primary",
  children,
  arrow = false,
  className = "",
  ...rest
}: {
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
} & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
