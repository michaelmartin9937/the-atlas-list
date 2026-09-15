import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string };
  imageUrl?: string;
  // Optional ambient loop layered over the photo (muted, autoplay, looping).
  // The photo stays as the instant-load poster and the reduced-motion fallback.
  videoUrl?: string;
  height?: "tall" | "short";
};

// Full-bleed dark hero: eyebrow / headline / subhead / light CTA, left-aligned
// on the 1200 column (Figma: Hero — 640px tall on desktop, copy from y=220).
export function Hero({
  eyebrow,
  headline,
  subhead,
  cta,
  imageUrl = "/images/hero-rooftop.jpg",
  videoUrl,
  height = "tall",
}: Props) {
  // Mobile heights are intentionally shorter than desktop so the wide landscape
  // hero photo isn't forced to upscale into a tall portrait viewport.
  const heightClass =
    height === "tall"
      ? "min-h-[68vh] sm:min-h-[80vh] md:min-h-[640px] md:h-[calc(100vh-104px)] md:max-h-[820px]"
      : "min-h-[52vh] sm:min-h-[60vh]";
  return (
    <section className={`relative ${heightClass} flex items-end overflow-hidden bg-noir`}>
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_38%] opacity-70"
      />
      {videoUrl && (
        <HeroVideo
          src={videoUrl}
          className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-noir/45 via-noir/35 to-noir/90"
        aria-hidden
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-20 pt-16 md:pt-24 w-full">
        <div className="max-w-[700px] flex flex-col">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
            {eyebrow}
          </span>
          <h1 className="mt-4 md:mt-5 font-serif text-[2.6rem] sm:text-5xl md:text-[56px] leading-[1.08] text-bone">
            {headline}
          </h1>
          <p className="mt-6 max-w-[560px] text-base md:text-lg leading-[1.5] text-bone/80">
            {subhead}
          </p>
          {cta && (
            <div className="mt-8 md:mt-10">
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center h-12 px-8 bg-pearl text-noir text-xs font-medium uppercase tracking-[0.06em] hover:bg-ember hover:text-bone transition-colors"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
