"use client";

import { useEffect, useState } from "react";

type Props = {
  label: string;
  deadline: string; // ISO 8601 with offset
};

const UNITS = ["Days", "Hrs", "Min", "Sec"] as const;

function split(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

// Figma (Desert After Dark hero, Sep 26): a thin red-outlined box under the
// button — "EARLY BIRD PRICING ENDS IN" with DD : HH : MM : SS in serif red
// digits. Renders nothing until mounted (the numbers depend on the visitor's
// clock, so they can't be server-rendered without a hydration mismatch) and
// nothing at all once the deadline has passed.
export function Countdown({ label, deadline }: Props) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(deadline).getTime();
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  if (left === null || left <= 0) return null;
  const parts = split(left);

  return (
    <div
      className="mt-6 inline-flex w-full sm:w-auto flex-col gap-4 rounded-md border border-[#B8352F] bg-[#150607] px-6 py-5"
      role="timer"
      aria-live="off"
      aria-label={`${label}: ${parts[0]} days, ${parts[1]} hours, ${parts[2]} minutes`}
    >
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E8433C]">
        <span className="h-[6px] w-[6px] rounded-full bg-[#E8433C] animate-pulse" aria-hidden />
        {label}
      </span>
      <div className="flex items-start justify-between sm:justify-start sm:gap-2" aria-hidden>
        {parts.map((n, i) => (
          <div key={UNITS[i]} className="flex items-start">
            <div className="flex flex-col items-center min-w-[52px]">
              <span className="font-serif text-[34px] leading-none text-[#E8433C] tabular-nums">
                {String(n).padStart(2, "0")}
              </span>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E8433C]/80">
                {UNITS[i]}
              </span>
            </div>
            {i < 3 && <span className="mx-1 sm:mx-2 font-serif text-[28px] leading-none text-[#E8433C]/70">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
