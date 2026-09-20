"use client";

import { useState } from "react";
import { copyText } from "@/lib/copy";

type Props = {
  label: string; // what this text is for
  text: string; // exactly what lands on the clipboard
  buttonLabel?: string;
  mono?: boolean; // links read better in a fixed-width face
};

// A block of text with one big Copy button — sized for thumbs. The text is
// also selectable, so a long-press still works if the clipboard is blocked.
export function CopyBlock({ label, text, buttonLabel = "Copy", mono = false }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const onCopy = async () => {
    const ok = await copyText(text);
    setState(ok ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), ok ? 1800 : 4000);
  };

  return (
    <div className="border border-sand bg-white">
      <div className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/55">
        {label}
      </div>
      <p
        className={`px-4 pt-2 pb-4 text-[15px] leading-[1.5] text-noir whitespace-pre-wrap break-words select-all ${
          mono ? "font-mono text-[14px]" : ""
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={onCopy}
        className={`w-full h-[52px] text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${
          state === "copied"
            ? "bg-[#2f6b3f] text-white"
            : "bg-noir text-bone active:bg-gold active:text-noir hover:bg-gold hover:text-noir"
        }`}
        aria-live="polite"
      >
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Press and hold the text to copy" : buttonLabel}
      </button>
    </div>
  );
}
