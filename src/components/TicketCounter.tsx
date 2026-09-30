"use client";

import { useEffect, useState } from "react";

type Count = { total: number; remaining: number };

type Props = {
  initial: Count | null;
  // "hero" = the big gold figure; "bar" = the slim strip used lower down.
  variant?: "hero" | "bar";
};

// Live ticket counter. Renders the server-fetched count immediately, then
// refreshes from /api/tickets every 60s so a visitor who leaves the tab open
// sees the number fall as tickets go.
export function TicketCounter({ initial, variant = "hero" }: Props) {
  const [count, setCount] = useState<Count | null>(initial);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/tickets", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Count;
        if (alive && typeof data.remaining === "number") setCount(data);
      } catch {
        // keep the last good number
      }
    };
    load();
    const id = window.setInterval(load, 60_000);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (!count) return null;
  const sold = Math.max(0, count.total - count.remaining);
  const pct = count.total ? Math.round((sold / count.total) * 100) : 0;
  const soldOut = count.remaining <= 0;

  if (variant === "bar") {
    return (
      <div className="w-full rounded-md border border-velvet-line bg-velvet-card px-5 py-4" role="status" aria-live="polite">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">
            {soldOut ? "Sold out" : "Tickets remaining"}
          </span>
          <span className="font-serif text-2xl text-bone tabular-nums">
            {count.remaining} <span className="text-velvet-text text-base">of {count.total}</span>
          </span>
        </div>
        <div className="mt-3 h-[3px] w-full bg-velvet-line overflow-hidden" aria-hidden>
          <div className="h-full bg-gold transition-[width] duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col rounded-md border border-gold/40 bg-velvet-card/80 px-6 py-5" role="status" aria-live="polite">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
        <span className="h-[6px] w-[6px] rounded-full bg-gold animate-pulse" aria-hidden />
        {soldOut ? "Sold out" : "Live · tickets remaining"}
      </span>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="font-serif text-[56px] leading-none text-bone tabular-nums">{count.remaining}</span>
        <span className="text-[15px] text-velvet-text">of {count.total} tickets for men</span>
      </div>
      <div className="mt-4 h-[3px] w-full bg-velvet-line overflow-hidden" aria-hidden>
        <div className="h-full bg-gold transition-[width] duration-700" style={{ width: `${pct}%` }} />
      </div>
      <span className="mt-2 text-[12px] text-velvet-text">{pct}% allocated</span>
    </div>
  );
}
