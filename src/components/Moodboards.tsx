"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = { src: string; alt: string };

// Figma (Desert After Dark dress code, Sep 26): one 333×471 styling board
// visible at a time with three dots beneath. Swipe or tap a dot to change.
export function Moodboards({ images }: { images: readonly Photo[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-[333px] mx-auto md:mx-0 md:ml-auto">
      <ul
        ref={track}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded"
        aria-label="Dress code styling boards"
      >
        {images.map((img, i) => (
          <li key={img.src} className="relative snap-start shrink-0 w-full aspect-[333/471] bg-velvet-card">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="333px"
              className="object-cover"
              priority={i === 0}
            />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-center gap-3" role="tablist" aria-label="Board">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Board ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-[6px] rounded-full transition-all ${
              i === active ? "w-5 bg-gold" : "w-[6px] bg-[#4A4640] hover:bg-gold/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
