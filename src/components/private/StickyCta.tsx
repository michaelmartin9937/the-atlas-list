"use client";

import { useEffect, useState } from "react";
import { STRIPE_PAYMENT_LINK } from "@/content/private-preview";

type Props = { label: string; price: string; heroId: string };

// Phone-only bar that slides in once the hero has scrolled out of view, so
// the payment button is always one thumb away without crowding the hero.
export function StickyCta({ label, price, heroId }: Props) {
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
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-velvet-line bg-velvet/95 backdrop-blur px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 motion-reduce:transition-none ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={STRIPE_PAYMENT_LINK}
        tabIndex={show ? 0 : -1}
        className="flex h-[52px] items-center justify-between rounded-sm bg-gold px-5 text-noir text-[13px] font-semibold uppercase tracking-[0.08em] active:bg-[#B08B48]"
      >
        <span>{label}</span>
        <span className="font-serif text-lg normal-case tracking-normal">{price}</span>
      </a>
    </div>
  );
}
