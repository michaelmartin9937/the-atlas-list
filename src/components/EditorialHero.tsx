import Image from "next/image";
import type { ReactNode } from "react";
import { HeroVideo } from "./HeroVideo";
import { IssueRail, KeywordList } from "./editorial";

type Props = {
  // One line per entry, set small in mono above the headline.
  eyebrowLines: readonly string[];
  title: ReactNode;
  // Everything between the headline and the issue rail (subhead, buttons…).
  children?: ReactNode;
  keywords?: readonly string[];
  issue: string;
  railRight?: string;
  image: string;
  imagePosition?: string;
  // Optional ambient loop over the photo (muted, autoplay). The photo is the
  // instant-load poster and the reduced-motion fallback.
  video?: string;
  // Extra darkening for busy frames.
  dim?: "light" | "medium" | "heavy";
  priority?: boolean;
};

// Figma (Oct 2026): every page opens on a full-bleed photo under a dark wash.
// Mono eyebrow, uppercase Playfair headline, copy block, a vertical keyword
// list on the right, and the "ISSUE NO." rail along the bottom.
export function EditorialHero({
  eyebrowLines,
  title,
  children,
  keywords,
  issue,
  railRight,
  image,
  imagePosition = "object-[center_35%]",
  video,
  dim = "medium",
  priority = true,
}: Props) {
  const wash = { light: "bg-noir/35", medium: "bg-noir/50", heavy: "bg-noir/60" }[dim];
  return (
    <section className="relative overflow-hidden bg-noir min-h-[640px] md:min-h-[660px] md:h-[calc(100vh-74px)] md:max-h-[820px] flex flex-col">
      <Image src={image} alt="" fill priority={priority} sizes="100vw" className={`object-cover ${imagePosition}`} />
      {video && <HeroVideo src={video} className={`absolute inset-0 h-full w-full object-cover ${imagePosition}`} />}
      <div className={`absolute inset-0 ${wash}`} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-noir/20" aria-hidden />

      <div className="relative flex-1 max-w-[1296px] w-full mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8 flex flex-col">
        <div className="flex-1 grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:items-end">
          <div className="flex flex-col justify-end">
            <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-bone/85 leading-[1.9]">
              {eyebrowLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </div>
            <h1 className="mt-10 md:mt-14 font-serif font-normal uppercase text-bone text-[2.85rem] sm:text-6xl md:text-[92px] leading-[0.98] tracking-[-0.01em] max-w-[1000px]">
              {title}
            </h1>
            {children}
          </div>
          {keywords && (
            <div className="hidden md:block self-end pb-2">
              <KeywordList items={keywords} />
            </div>
          )}
        </div>
        <div className="mt-12 md:mt-14">
          <IssueRail left={issue} right={railRight} />
        </div>
      </div>
    </section>
  );
}
