"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface LightboxImage {
  /** Grid thumbnail (smaller derivative). */
  thumb: string;
  /** Higher-resolution file shown in the lightbox. */
  full: string;
  width: number;
  height: number;
  alt: string;
  /** Shown under the image only when accurate information exists. */
  caption?: string;
}

/**
 * Gallery lightbox: full-screen viewing without destructive cropping
 * (object-contain), previous/next/close controls, keyboard arrows + Escape,
 * touch swipe, and continuous browsing without closing. Transitions sit at
 * ~200ms per the motion system; no autoplay, no carousel behaviour.
 *
 * Composition: the parent renders the grid; every tile calls `open(i)`.
 * This component owns only the overlay.
 */
export function useLightbox(images: LightboxImage[]) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  return { index, open, close, images };
}

export function Lightbox({
  state,
}: {
  state: ReturnType<typeof useLightbox>;
}) {
  const { index, close, images } = state;
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = index !== null;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      state.open((index + dir + images.length) % images.length);
    },
    [index, images.length, state],
  );

  // Open/close side effects: scroll lock, focus management, fade-in.
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => dialogRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      setVisible(false);
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [isOpen]);

  // Keyboard: arrows browse, Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  if (index === null) return null;
  const img = images[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${images.length}`}
      tabIndex={-1}
      className="fixed inset-0 z-[80] flex flex-col bg-bg-950/97 outline-none backdrop-blur-sm transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={(e) => {
        // Backdrop click closes; clicks on the image/controls do not.
        if (e.target === e.currentTarget) close();
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <p className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="border border-line-600 bg-bg-950/70 p-2.5 text-ink-2 transition-colors duration-200 hover:text-ink"
        >
          <Glyph d="M2 2l8 8M10 2l-8 8" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 md:px-16">
        {/* Full photograph, never cropped */}
        <div className="relative h-full w-full">
          <Image
            key={img.full}
            src={img.full}
            alt={img.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <NavButton side="left" label="Previous photograph" onClick={() => step(-1)}>
          <Glyph d="M8 1.5 3 6l5 4.5" />
        </NavButton>
        <NavButton side="right" label="Next photograph" onClick={() => step(1)}>
          <Glyph d="M4 1.5 9 6 4 10.5" />
        </NavButton>
      </div>

      {img.caption && (
        <p className="px-4 pb-5 text-center text-[0.8rem] leading-relaxed text-ink-2 md:px-6">
          {img.caption}
        </p>
      )}
    </div>
  );
}

function NavButton({
  side,
  label,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 border border-line-600 bg-bg-950/70 p-3 text-ink-2 backdrop-blur transition-colors duration-200 hover:text-ink md:p-3.5 ${
        side === "left" ? "left-2 md:left-4" : "right-2 md:right-4"
      }`}
    >
      {children}
    </button>
  );
}

function Glyph({ d }: { d: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
