"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = { src: string; alt: string };

// Figma (About): a 4×2 grid of 270×250 rounded tiles with a dot indicator.
// On desktop all eight tiles are visible, so the dots are hidden there; on
// phones the same tiles become a swipeable, snap-scrolling row and the dots
// track position.
export function PhotoGrid({ photos }: { photos: readonly Photo[] }) {
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

  return (
    <section className="bg-pearl px-6 md:px-10 py-16 md:py-[80px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <ul
          ref={track}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:gap-10 md:overflow-visible"
        >
          {photos.map((p, i) => (
            <li
              key={p.src}
              className="relative snap-start shrink-0 w-[68vw] max-w-[270px] md:w-auto md:max-w-none aspect-[270/250] overflow-hidden rounded bg-[#383029]"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 270px, 68vw"
                className="object-cover"
                priority={i < 2}
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 md:hidden flex items-center justify-center gap-3" role="tablist" aria-label="Photo position">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-[6px] rounded-full transition-all ${
                i === active ? "w-5 bg-ember" : "w-[6px] bg-sand hover:bg-ember/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
