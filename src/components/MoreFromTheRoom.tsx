"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Horizontal photo carousel with arrows + dot indicator
// (Figma: As the Night Unfolds — More from the room). Native scroll-snap does
// the work; the arrows and dots just drive/reflect scroll position, so it
// stays swipeable on touch and keyboard-scrollable.
export function MoreFromTheRoom() {
  const { eyebrow, headline, images } = home.moreFromTheRoom;
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const tiles = [...el.children] as HTMLElement[];
      const left = el.scrollLeft + el.clientWidth / 2;
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
    scrollTo(Math.min(images.length - 1, Math.max(0, active + dir)));

  const arrow =
    "hidden lg:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-sand bg-pearl text-noir hover:border-ember hover:text-ember transition-colors disabled:opacity-30 disabled:hover:border-sand disabled:hover:text-noir";

  return (
    <section className="bg-pearl py-14 md:py-16 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto relative">
        <FadeIn>
          <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] text-noir">
            {headline}
          </h2>
        </FadeIn>

        <div className="relative mt-8 md:mt-10">
          <button
            type="button"
            aria-label="Previous photos"
            onClick={() => step(-1)}
            disabled={active === 0}
            className={`${arrow} left-2 min-[1360px]:-left-[70px]`}
          >
            <Chevron dir="left" />
          </button>
          <ul
            ref={track}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
          >
            {images.map((img, i) => (
              <li
                key={img.src}
                className="relative snap-start shrink-0 w-[224px] aspect-[224/210] overflow-hidden bg-sand/40"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="224px"
                  className="object-cover object-[center_35%]"
                  priority={i < 2}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Next photos"
            onClick={() => step(1)}
            disabled={active === images.length - 1}
            className={`${arrow} right-2 min-[1360px]:-right-[70px]`}
          >
            <Chevron dir="right" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3" role="tablist" aria-label="Photo position">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-5 bg-ember" : "w-2 bg-sand hover:bg-ember/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-4 h-4 ${dir === "left" ? "-translate-x-px" : "translate-x-px"}`}
      aria-hidden
    >
      {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
