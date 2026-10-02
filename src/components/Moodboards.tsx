"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = { src: string; alt: string };
type Props = { women: readonly Photo[]; men: readonly Photo[] };

// Dress-code boards as two labelled tabs — Women's Style (Diana's three
// boards, swipeable with dots) and Men's Style (the men's guide). Tabs
// instead of bare dots so a man landing here sees at once that his board
// exists.
export function Moodboards({ women, men }: Props) {
  const [tab, setTab] = useState<"women" | "men">("women");
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const images = tab === "women" ? women : men;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = 0;
    setActive(0);
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [tab]);

  const scrollTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const tabBtn = (key: "women" | "men", label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === key}
      onClick={() => setTab(key)}
      className={`h-11 px-5 text-[12px] font-semibold uppercase tracking-[0.1em] border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        tab === key ? "bg-gold border-gold text-noir" : "border-velvet-line text-bone hover:border-gold"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-[360px] mx-auto md:mx-0 md:ml-auto">
      <div className="flex gap-2" role="tablist" aria-label="Styling boards">
        {tabBtn("women", "Women's Style")}
        {tabBtn("men", "Men's Style")}
      </div>
      <ul
        key={tab}
        ref={track}
        className="mt-4 flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded"
        aria-label={tab === "women" ? "Women's styling boards" : "Men's styling guide"}
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            className={`relative snap-start shrink-0 w-full bg-velvet-card ${tab === "women" ? "aspect-[333/471]" : "aspect-[2/3]"}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="360px" className="object-cover" priority={i === 0} />
          </li>
        ))}
      </ul>
      {images.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3" role="tablist" aria-label="Board">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Board ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-[6px] rounded-full transition-all ${i === active ? "w-5 bg-gold" : "w-[6px] bg-[#4A4640] hover:bg-gold/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
