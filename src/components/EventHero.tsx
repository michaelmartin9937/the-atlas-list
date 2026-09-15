import Link from "next/link";

type Props = {
  eyebrow: string;
  headline: string;
  tagline: string;
  subhead: string;
  cta: { label: string; href: string };
  videoSrc: string;
  posterSrc: string;
};

// Figma (Desert After Dark hero): copy on the left, a 520×640 media slot on
// the right, a faint burgundy glow behind the copy. The promo video sits in
// the slot; it stacks under the copy on phones.
export function EventHero({ eyebrow, headline, tagline, subhead, cta, videoSrc, posterSrc }: Props) {
  return (
    <section className="relative overflow-hidden bg-velvet">
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_55%_at_18%_88%,rgba(164,62,120,0.16),transparent_70%)]"
        aria-hidden
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-16 md:pt-[100px] pb-20 md:pb-[120px] grid gap-12 md:gap-x-16 md:grid-cols-[minmax(0,1fr)_520px] md:items-center">
        <div className="max-w-[616px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-sunset">
            {eyebrow}
          </span>
          <h1 className="mt-6 md:mt-8 font-serif text-[3rem] sm:text-6xl md:text-[72px] leading-[1.02] text-bone">
            {headline}
          </h1>
          <p className="mt-5 md:mt-6 font-serif italic text-2xl md:text-[28px] leading-tight text-rosegold">
            {tagline}
          </p>
          <p className="mt-6 text-base md:text-[17px] leading-[1.5] text-velvet-text">
            {subhead}
          </p>
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center h-12 px-7 bg-champagne text-noir text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-bone transition-colors"
            >
              {cta.label}
            </Link>
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
