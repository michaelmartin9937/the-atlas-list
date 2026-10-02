import Link from "next/link";
import { Countdown } from "./Countdown";

type Props = {
  eyebrow: string;
  headline: string;
  tagline: string;
  subhead: string;
  cta: { label: string; href: string };
  // "Doors 5:30 PM · Show 7:00 PM · Until midnight" — the time at a glance.
  timeLine?: string;
  // Optional "early bird pricing ends in" box under the button.
  countdown?: { label: string; deadline: string };
  videoSrc: string;
  posterSrc: string;
};

// Figma (Desert After Dark hero, Sep 2026): copy on the left, a 520×640
// photo on the right, a faint burgundy glow behind the copy. The promo video
// keeps living in that slot with the Figma photo as its poster, so the page
// looks like the design until someone presses play. Stacks on phones.
export function EventHero({ eyebrow, headline, tagline, subhead, cta, timeLine, countdown, videoSrc, posterSrc }: Props) {
  return (
    <section className="relative overflow-hidden bg-velvet">
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_55%_at_18%_88%,rgba(164,62,120,0.16),transparent_70%)]"
        aria-hidden
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-16 md:pt-[100px] pb-20 md:pb-[120px] grid gap-12 md:gap-x-16 md:grid-cols-[minmax(0,1fr)_520px] md:items-center">
        <div className="max-w-[616px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
            {eyebrow}
          </span>
          <h1 className="mt-6 md:mt-8 font-serif text-[3rem] sm:text-6xl md:text-[72px] leading-[1.02] text-bone">
            {headline}
          </h1>
          <p className="mt-5 md:mt-6 font-serif italic text-2xl md:text-[28px] leading-tight text-gold">
            {tagline}
          </p>
          {timeLine && (
            <p className="mt-5 inline-flex items-center gap-3 border border-velvet-line rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-bone">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {timeLine}
            </p>
          )}
          <p className="mt-6 text-base md:text-[17px] leading-[1.5] text-velvet-text">
            {subhead}
          </p>
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex w-full sm:w-auto items-center justify-center h-12 px-7 bg-gold text-noir text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-bone transition-colors"
            >
              {cta.label}
            </Link>
            {countdown && <Countdown label={countdown.label} deadline={countdown.deadline} />}
          </div>
        </div>

        <div className="relative w-full max-w-[520px] mx-auto md:mx-0 aspect-[520/640] overflow-hidden rounded bg-black">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser doesn&apos;t support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
