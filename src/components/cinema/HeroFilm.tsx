"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Opening sequence, stages 2–3 (brief §6): the full-screen concrete film with
 * the interface revealed on a stagger after the footage has had the frame to
 * itself for a beat.
 *
 * - Desktop and mobile masters are separate, intentionally-reframed films;
 *   the source is chosen once per load from the viewport (not swapped live —
 *   a mid-session rotate keeps the current film rather than restarting).
 * - autoplay / muted / playsinline / loop, no controls, audio stripped in
 *   the encode. Poster frames cover the pre-play beat and reduced motion.
 * - Interface reveal: children carry .rise and lift in staggered by
 *   `data-revealed` on the wrapper ~600ms after the film reports `playing`
 *   (via the video's own onPlaying), with a 2500ms fallback once the video
 *   mounts so blocked autoplay never leaves the content hidden.
 * - prefers-reduced-motion: the video is not mounted at all (no download);
 *   the poster img carries the frame, and the interface reveals immediately.
 * - WCAG 2.2.2: a quiet pause/play control sits bottom-right so the looping
 *   film can be stopped.
 */
export function HeroFilm({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealArmed = useRef(false);

  // Mount: viewport and motion preference, computed once per load. All
  // setState calls run from timers (react-hooks/set-state-in-effect).
  useEffect(() => {
    const compact = window.matchMedia("(max-width: 767px)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => {
      setMobile(compact);
      setReduced(noMotion);
      if (noMotion) setRevealed(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Autoplay-blocked fallback: once the video can mount (mobile resolved),
  // the interface must never stay hidden past 2.5s.
  useEffect(() => {
    if (mobile === null || reduced) return;
    const t = setTimeout(() => setRevealed(true), 2500);
    return () => clearTimeout(t);
  }, [mobile, reduced]);

  // Clean up the onPlaying reveal timer on unmount.
  useEffect(() => {
    return () => {
      if (revealTimer.current) clearTimeout(revealTimer.current);
    };
  }, []);

  // Reveal the interface ~600ms after playback actually starts. Armed once —
  // later `playing` events (resume after pause) must not re-run the reveal.
  const onPlaying = () => {
    if (revealArmed.current) return;
    revealArmed.current = true;
    revealTimer.current = setTimeout(() => setRevealed(true), 600);
  };

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const poster = mobile
    ? "/media/film/hero-poster-mobile.jpg"
    : "/media/film/hero-poster.jpg";
  const src = mobile ? "/media/film/hero-mobile.mp4" : "/media/film/hero-desktop.mp4";

  return (
    <section className="film-hero" data-revealed={revealed || undefined}>
      {/* Poster paints immediately and under reduced motion */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className="film-poster"
        aria-hidden="true"
        fetchPriority="high"
      />
      {mobile !== null && !reduced && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={onPlaying}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="film-scrim" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col justify-end">
        {children}
      </div>
      {mobile !== null && !reduced && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play background film" : "Pause background film"}
          className="absolute bottom-5 right-5 z-20 border border-line-600 bg-bg-950/70 px-3 py-2 text-ink-2 backdrop-blur transition-colors hover:text-ink"
        >
          {paused ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2.5 1.5 10.5 6 2.5 10.5z" />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="2" y="1.5" width="2.6" height="9" />
              <rect x="7.4" y="1.5" width="2.6" height="9" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
