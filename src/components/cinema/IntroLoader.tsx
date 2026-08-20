"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

const KEY = "asc-intro-played";

/**
 * Opening sequence, stage 1 (brief §6): a completely black screen with the
 * official logo alone — ~800ms fade in, ~1000ms hold, ~800ms fade out — then
 * the black itself crossfades away to reveal the concrete film already
 * playing beneath.
 *
 * Plays once per browsing session (sessionStorage), never on internal
 * navigation, and not at all under prefers-reduced-motion (the overlay CSS is
 * display:none there, so reduced-motion users land straight on the poster).
 *
 * Rendered with the overlay VISIBLE on the server so the first paint of a
 * fresh session is black — no flash of content before the logo.
 */
export function IntroLoader() {
  const [state, setState] = useState<"pending" | "playing" | "leaving" | "done">(
    "pending",
  );

  useEffect(() => {
    // All transitions run from timers — never synchronously in the effect
    // body (react-hooks/set-state-in-effect).
    const timers: ReturnType<typeof setTimeout>[] = [];
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      // Storage-blocked browsers throw SecurityError on any sessionStorage
      // access — treat failure as "already played" and skip the intro.
      if (sessionStorage.getItem(KEY)) skip = true;
      else if (!skip) sessionStorage.setItem(KEY, "1");
    } catch {
      skip = true;
    }
    if (skip) {
      timers.push(setTimeout(() => setState("done"), 0));
    } else {
      timers.push(setTimeout(() => setState("playing"), 0));
      timers.push(setTimeout(() => setState("leaving"), 2600)); // logo cycle
      timers.push(setTimeout(() => setState("done"), 3250)); // + black crossfade
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  // While the opaque overlay plays, make the page beneath inert so keyboard
  // focus cannot move invisibly under it. The cleanup runs as soon as state
  // leaves "playing" (i.e. on "leaving"), so users can interact during the
  // fade, and again on unmount.
  useEffect(() => {
    if (state !== "playing") return;
    const els = document.querySelectorAll("header, main, footer");
    els.forEach((el) => el.setAttribute("inert", ""));
    return () => els.forEach((el) => el.removeAttribute("inert"));
  }, [state]);

  if (state === "done") return null;

  return (
    <div
      className="intro-overlay"
      data-leaving={state === "leaving" ? "true" : undefined}
      aria-hidden="true"
    >
      {(state === "playing" || state === "leaving") && (
        <div className="intro-logo">
          <Logo height={44} priority />
        </div>
      )}
    </div>
  );
}
