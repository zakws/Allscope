"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Arrow } from "./Editorial";

/**
 * Presentation-only wrapper for long project galleries: the first rows render
 * as normal, the remainder sits in a toggled region behind an accessible
 * button. Rows arrive fully rendered from the server component, so pairing,
 * render labels and sizes are untouched here. No programmatic scrolling.
 */
export function GalleryExpand({
  first,
  rest,
  moreCount,
}: {
  first: ReactNode;
  rest: ReactNode;
  moreCount: number;
}) {
  const [open, setOpen] = useState(false);
  const restId = useId();
  return (
    <div className="space-y-4 md:space-y-6">
      {first}
      <div>
        <button
          type="button"
          className="btn-line"
          aria-expanded={open}
          aria-controls={restId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Show fewer photos" : `View full gallery (${moreCount} more)`}
          <Arrow className={`btn-arrow ${open ? "-rotate-90" : "rotate-90"}`} />
        </button>
      </div>
      <div id={restId} hidden={!open} className="space-y-4 md:space-y-6">
        {rest}
      </div>
    </div>
  );
}
