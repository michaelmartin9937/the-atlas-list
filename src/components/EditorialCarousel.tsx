"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = { src: string; alt: string };

type Props = {
  images: readonly Photo[];
  tone?: "light" | "dark";
  // Small mono caption in the progress row ("FROM A RECENT MONTHLY GATHERING").
  caption?: string;
  // Portrait tiles (home / partner strips) or landscape (About).
  aspect?: "portrait" | "landscape";
  className?: string;
};

// Figma (Oct 2026): four photos per view, then a progress row — "01 / 08", a
// hairline with a coral fill, a caption and two round arrows. Native
// scroll-snap does the moving so it stays swipeable on touch.
export function EditorialCarousel({ images, tone = "dark", caption, aspect = "portrait", className = "" }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = 0;
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
  const step = (dir: -1 | 1) => scrollTo(Math.min(images.length - 1, Math.max(0, active + dir)));

  const dark = tone === "dark";
  const text = dark ? "text-bone/70" : "text-ink/60";
  const rule = dark ? "bg-hairline-dark" : "bg-hairline";
  const ring = dark
    ? "border-bone/40 text-bone hover:border-coral hover:text-coral disabled:hover:border-bone/40 disabled:hover:text-bone"
    : "border-noir/40 text-noir hover:border-coral hover:text-coral disabled:hover:border-noir/40 disabled:hover:text-noir";
  const tile = aspect === "portrait" ? "aspect-[5/7]" : "aspect-[6/5]";
  const pct = images.length > 1 ? ((active + 1) / images.length) * 100 : 100;

  return (
    <div className={className}>
      <ul
        ref={track}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            className={`relative snap-start shrink-0 w-[70vw] sm:w-[44vw] md:w-[calc((100%-60px)/4)] ${tile} overflow-hidden ${dark ? "bg-[#1A1716]" : "bg-hairline/40"}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 300px, 70vw" className="object-cover" priority={i < 2} />
          </li>
        ))}
      </ul>

      <div className={`mt-7 flex items-center gap-5 md:gap-7 font-mono text-[10px] uppercase tracking-[0.24em] ${text}`}>
        <span className="shrink-0 tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <span className={`relative h-px flex-1 ${rule}`} aria-hidden>
          <span className="absolute left-0 top-0 h-px bg-coral transition-all duration-500" style={{ width: `${pct}%` }} />
        </span>
        {caption && <span className="hidden sm:block shrink-0">{caption}</span>}
        <span className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Previous photos"
            onClick={() => step(-1)}
            disabled={active === 0}
            className={`h-11 w-11 rounded-full border transition-colors disabled:opacity-40 ${ring}`}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            aria-label="Next photos"
            onClick={() => step(1)}
            disabled={active === images.length - 1}
            className={`h-11 w-11 rounded-full border transition-colors disabled:opacity-40 ${ring}`}
          >
            <span aria-hidden>→</span>
          </button>
        </span>
      </div>
    </div>
  );
}
