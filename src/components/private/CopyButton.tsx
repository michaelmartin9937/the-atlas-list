"use client";

import { useState } from "react";

// "Copy address" control with the Figma's short-lived "Copied" toast.
export function CopyButton({ text, label = "Copy address" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          // Clipboard blocked: the address is on screen to copy by hand.
        }
      }}
      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-coral hover:text-noir transition-colors"
      aria-live="polite"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="9" y="9" width="11" height="11" rx="1.5" />
        <path d="M5 15V5h10" />
      </svg>
      {copied ? "Copied" : label}
    </button>
  );
}
