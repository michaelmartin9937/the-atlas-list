"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";

type Photo = { src: string; alt: string };

type Tile = "sm" | "md" | "lg";

type Props = {
  eyebrow: string;
  headline?: string;
  intro?: string;
  images: readonly Photo[];
  // "light" = pearl section (home / about); "dark" = velvet section (event / partner).
  tone?: "light" | "dark";
  // Tile size from the Figma frames — all three fill the 1200px column exactly:
  //   sm  224×210, 5 per view, 20px gap  ("More from the room", "Whats in store")
  //   md  270×250, 4 per view, 40px gap  (About gallery)
  //   lg  384×320, 3 per view, 24px gap  ("Scenes from the last gathering")
  tile?: Tile;
  // Centre the eyebrow / headline / intro (the home gallery) instead of left.
  center?: boolean;
  // Small tracked caption under the dots.
  caption?: string;
  // Hide the round prev/next buttons (the Figma gallery variants have none).
  arrows?: boolean;
  // On md+ lay the photos out as a static grid (5 across) instead of a strip;
  // phones keep the swipeable carousel.
  grid?: boolean;
};

const TILES: Record<Tile, { li: string; ul: string; sizes: string; peek: string }> = {
  sm: { li: "max-w-[224px] aspect-[224/210]", ul: "gap-5", sizes: "224px", peek: "w-[68vw]" },
  md: { li: "max-w-[270px] aspect-[270/250]", ul: "gap-4 md:gap-10", sizes: "270px", peek: "w-[68vw]" },
  lg: { li: "max-w-[384px] aspect-[6/5]", ul: "gap-4 md:gap-6", sizes: "(min-width: 768px) 384px, 78vw", peek: "w-[78vw]" },
};

// Horizontal photo carousel with round arrows outside the column and a dot
// indicator beneath (Figma, Sep 2026: every photo strip on the site is one of
// these now). Native scroll-snap does the moving so it stays swipeable on
// touch; the dots track whichever tile is at the left edge.
export function PhotoCarousel({
  eyebrow,
  headline,
  intro,
  images,
  tone = "light",
  tile = "sm",
  center = false,
  caption,
  arrows = true,
  grid = false,
}: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const t = TILES[tile];

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const tiles = [...el.children] as HTMLElement[];
      const left = el.scrollLeft + 8;
      const idx = tiles.findIndex((x) => x.offsetLeft + x.offsetWidth > left);
      setActive(Math.max(0, idx === -1 ? tiles.length - 1 : idx));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const el = track.current;
    const target = el?.children[idx] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };
  const step = (dir: -1 | 1) =>
    scrollTo(Math.min(images.length - 1, Math.max(0, active + dir)));

  const dark = tone === "dark";
  const arrow = `hidden lg:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
    dark
      ? "border-[#F07A5A] text-[#F07A5A] hover:border-gold hover:text-gold disabled:hover:border-[#F07A5A] disabled:hover:text-[#F07A5A]"
      : "border-gold text-gold bg-pearl hover:border-noir hover:text-noir disabled:hover:border-gold disabled:hover:text-gold"
  }`;

  return (
    <section
      className={`${dark ? "bg-velvet" : "bg-pearl"} py-14 md:py-16 px-6 md:px-10 overflow-hidden`}
    >
      <div className="max-w-[1280px] mx-auto relative">
        {(eyebrow || headline || intro) && (
        <FadeIn>
          <div className={center ? "text-center max-w-[820px] mx-auto" : ""}>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
              {eyebrow}
            </span>
            {headline && (
              <h2
                className={`mt-3 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] ${
                  dark ? "text-bone" : "text-noir"
                }`}
              >
                {headline}
              </h2>
            )}
            {intro && (
              <p className={`mt-4 text-base md:text-[17px] leading-[1.5] ${dark ? "text-velvet-text" : "text-ink/75"}`}>
                {intro}
              </p>
            )}
          </div>
        </FadeIn>
        )}

        <div className={`relative ${headline || intro ? "mt-8 md:mt-10" : eyebrow ? "mt-8" : ""}`}>
          {arrows && !grid && (
            <button
              type="button"
              aria-label="Previous photos"
              onClick={() => step(-1)}
              disabled={active === 0}
              className={`${arrow} left-2 min-[1360px]:-left-[70px]`}
            >
              <Chevron dir="left" />
            </button>
          )}
          <ul
            ref={track}
            className={`flex ${t.ul} overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0 ${
              grid ? "md:grid md:grid-cols-5 md:overflow-visible" : ""
            }`}
          >
            {images.map((img, i) => (
              <li
                key={img.src}
                className={`relative snap-start shrink-0 ${t.peek} ${t.li} ${grid ? "md:w-auto md:max-w-none" : ""} overflow-hidden rounded-sm ${
                  dark ? "bg-velvet-card" : "bg-sand/40"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={t.sizes}
                  className="object-cover"
                  priority={i < 2}
                />
              </li>
            ))}
          </ul>
          {arrows && !grid && (
            <button
              type="button"
              aria-label="Next photos"
              onClick={() => step(1)}
              disabled={active === images.length - 1}
              className={`${arrow} right-2 min-[1360px]:-right-[70px]`}
            >
              <Chevron dir="right" />
            </button>
          )}
        </div>

        <div className={`mt-6 flex items-center justify-center gap-3 ${grid ? "md:hidden" : ""}`} role="tablist" aria-label="Photo position">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-[6px] rounded-full transition-all ${
                i === active
                  ? "w-5 bg-gold"
                  : dark
                    ? "w-[6px] bg-[#4A4640] hover:bg-gold/60"
                    : "w-[6px] bg-sand hover:bg-gold/60"
              }`}
            />
          ))}
        </div>

        {caption && (
          <p className={`mt-6 text-center text-[13px] uppercase tracking-[0.08em] ${dark ? "text-velvet-text" : "text-ink/60"}`}>
            {caption}
          </p>
        )}
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
