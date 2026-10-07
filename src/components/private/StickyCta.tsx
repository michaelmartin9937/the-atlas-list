"use client";

import { useEffect, useState } from "react";
import { STRIPE_PAYMENT_LINK } from "@/content/private-preview";

type Props = { label: string; price: string; priceUnit?: string; ticketLabel?: string; heroId: string };

// Phone-only bar that slides in once the hero has scrolled out of view, so
// the payment button is always one thumb away without crowding the hero.
// Figma (Oct 2026): "GENTLEMAN'S TICKET  $150 / person" beside a cream button.
export function StickyCta({ label, price, priceUnit = "/ person", ticketLabel = "Gentleman's ticket", heroId }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.05 });
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  if (!STRIPE_PAYMENT_LINK) return null;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-hairline-dark bg-night/95 backdrop-blur px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 motion-reduce:transition-none ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-bone/55">{ticketLabel}</span>
          <span className="mt-1 block font-serif text-[26px] leading-none text-bone">
            {price} <span className="font-sans text-[13px] text-bone/70">{priceUnit}</span>
          </span>
        </div>
        <a
          href={STRIPE_PAYMENT_LINK}
          tabIndex={show ? 0 : -1}
          className="inline-flex h-[52px] items-center justify-center bg-cream px-7 font-mono text-[12px] uppercase tracking-[0.22em] text-noir active:bg-coral"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
