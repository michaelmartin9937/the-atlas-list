import Link from "next/link";

type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  videoSrc?: string;
  posterSrc?: string;
};

// Landing-page hero built around a Video Sales Letter. When videoSrc is set
// it renders a native <video> element (playsInline for mobile autoplay-off
// UX). When it's not set — the current state, since the VSL hasn't been
// recorded — it renders a themed placeholder card so the layout is finished
// and the video slot is obvious to reviewers.
export function VslHero({
  eyebrow,
  headline,
  subhead,
  cta,
  videoSrc,
  posterSrc,
}: Props) {
  return (
    <section className="relative bg-noir overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-10">
      <div className="relative max-w-6xl mx-auto flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-5 md:gap-6 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-bronze">
            {eyebrow}
          </span>
          <h1 className="font-serif text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl text-bone">
            {headline}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-bone/80 leading-relaxed">
            {subhead}
          </p>
        </div>

        <div className="relative w-full aspect-video bg-black border border-bronze/40 rounded-sm overflow-hidden shadow-2xl">
          {videoSrc ? (
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={posterSrc}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser doesn&apos;t support the video tag.
            </video>
          ) : (
            <VslPlaceholder />
          )}
        </div>

        <div>
          <Link
            href={cta.href}
            className="inline-block text-xs uppercase tracking-widest text-noir bg-bone px-7 sm:px-8 py-3.5 sm:py-4 hover:bg-bronze hover:text-bone transition-colors"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

function VslPlaceholder() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-noir via-ink to-noir text-bone/70"
      aria-label="Video sales letter placeholder"
      role="img"
    >
      <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-bronze/60 bg-noir/40 backdrop-blur-sm">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 md:w-10 md:h-10 text-bronze translate-x-[2px]"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p className="text-xs uppercase tracking-widest text-bronze">
        Video Coming Soon
      </p>
      <p className="text-sm text-bone/60 max-w-xs text-center px-4 leading-relaxed">
        A message from your hosts about what to expect on October 10th.
      </p>
    </div>
  );
}
