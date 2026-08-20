import Image from "next/image";

/**
 * OFFICIAL Allscope logo — master file supplied 19 Aug 2026
 * (public/media/brand/allscope-logo.png, red A + grey letterforms + swoosh,
 * transparent background, 600×171).
 *
 * One asset, used everywhere: intro sequence, header, footer. Do not restyle,
 * recolour or distort the mark; scale only. The grey letterforms are part of
 * the official mark and stay as supplied on both dark and light grounds.
 */
const RATIO = 600 / 171;

export function Logo({
  className = "",
  height = 30,
  priority = false,
}: {
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/media/brand/allscope-logo.png"
      alt="Allscope Concrete"
      height={height}
      width={Math.round(height * RATIO)}
      priority={priority}
      className={className}
    />
  );
}
