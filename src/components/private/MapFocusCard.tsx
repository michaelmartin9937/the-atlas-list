"use client";

import type { ReactNode } from "react";

// Wraps an address card so a click flies the map to its pin.
export function MapFocusCard({ pinId, className = "", children }: { pinId: string; className?: string; children: ReactNode }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => window.dispatchEvent(new CustomEvent("atlas-map-focus", { detail: pinId }))}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("atlas-map-focus", { detail: pinId }));
        }
      }}
      className={`cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${className}`}
    >
      {children}
    </div>
  );
}
