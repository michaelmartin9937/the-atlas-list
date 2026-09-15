"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";

type Card = {
  title: string;
  body: string;
  image: string | null;
  alt: string;
};

type Props = {
  eyebrow: string;
  headline: string;
  intro: string;
  cards: readonly Card[];
};

// The night is one arc — golden hour into full velvet dark — so the card
// numbers walk through the palette in that order (Figma: 01 champagne …).
const NUMBER_COLORS = [
  "text-champagne",
  "text-rosegold",
  "text-terracotta",
  "text-burgundy",
  "text-burgundy",
  "text-burgundy",
];

// Figma: "What's in Store — How the Night Unfolds." A 1050px card carousel
// with round prev/next controls in the header and a dot indicator beneath.
// Native scroll-snap does the moving so it stays swipeable on touch.
export function NightCarousel({ eyebrow, headline, intro, cards }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const tiles = [...el.children] as HTMLElement[];
      const left = el.scrollLeft + 8;
      const idx = tiles.findIndex((t) => t.offsetLeft + t.offsetWidth > left);
      setActive(Math.max(0, idx === -1 ? tiles.length - 1 : idx));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const el = track.current;
    const tile = el?.children[idx] as HTMLElement | undefined;
    if (!el || !tile) return;
    el.scrollTo({ left: tile.offsetLeft, behavior: "smooth" });
  };
  const step = (dir: -1 | 1) =>
    scrollTo(Math.min(cards.length - 1, Math.max(0, active + dir)));

  const atStart = active === 0;
  const atEnd = active === cards.length - 1;

  return (
    <section className="bg-velvet px-6 md:px-10 pt-20 md:pt-[92px] pb-20 md:pb-[100px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-champagne">
                {eyebrow}
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-[56px] leading-[1.08] text-bone">
                {headline}
              </h2>
              <p className="mt-4 text-base md:text-[17px] leading-[1.5] text-velvet-text">
                {intro}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3 shrink-0 pb-1">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => step(-1)}
                disabled={atStart}
                className="h-12 w-12 rounded-full border border-velvet-line text-bone flex items-center justify-center transition-colors hover:border-champagne hover:text-champagne disabled:opacity-40 disabled:hover:border-velvet-line disabled:hover:text-bone"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => step(1)}
                disabled={atEnd}
                className="h-12 w-12 rounded-full bg-champagne text-noir flex items-center justify-center transition-colors hover:bg-bone disabled:opacity-40 disabled:hover:bg-champagne"
              >
                <Arrow dir="right" />
              </button>
            </div>
          </div>
        </FadeIn>

        <ul
          ref={track}
          className="mt-10 md:mt-14 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
        >
          {cards.map((card, i) => (
            <li
              key={card.title}
              className="snap-start shrink-0 w-[86vw] md:w-[1050px] rounded-xl border border-plum bg-velvet-card p-5 md:p-8 flex flex-col"
            >
              <div className="relative aspect-[986/394] overflow-hidden rounded-sm bg-[#DCDCDC]">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 986px, 86vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                )}
              </div>
              <span
                className={`mt-7 text-[13px] font-medium tracking-[0.12em] ${NUMBER_COLORS[i % NUMBER_COLORS.length]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-2xl md:text-[32px] leading-tight text-bone">
                {card.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.55] text-velvet-text">{card.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:mt-14 flex items-center justify-center gap-3" role="tablist" aria-label="Card position">
          {cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Card ${i + 1}: ${card.title}`}
              onClick={() => scrollTo(i)}
              className={`h-[6px] rounded-full transition-all ${
                i === active ? "w-7 bg-[#C7A869]" : "w-[6px] bg-[#4A4640] hover:bg-champagne/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
      aria-hidden
    >
      {dir === "left" ? <path d="M19 12H5m6-6l-6 6 6 6" /> : <path d="M5 12h14m-6-6l6 6-6 6" />}
    </svg>
  );
}
