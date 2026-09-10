import Link from "next/link";

type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  videoSrc?: string;
  posterSrc?: string;
  // "video" = 16:9 player stacked under the copy (default).
  // "portrait" = 9:16 player (phone-shot promo / Reel); sits beside the copy
  // on desktop, stacks under it on phones.
  aspect?: "video" | "portrait";
  // "noir" = site default (bronze accents, bone CTA).
  // "velvet" = Desert After Dark's Velvet Sunset treatment (champagne accents).
  theme?: "noir" | "velvet";
};

const THEME = {
  noir: {
    section: "bg-noir",
    eyebrow: "text-bronze",
    frame: "border-bronze/40",
    cta: "text-noir bg-bone hover:bg-bronze hover:text-bone",
  },
  velvet: {
    section: "bg-velvet",
    eyebrow: "text-champagne",
    frame: "border-champagne/40",
    cta: "text-velvet bg-champagne hover:bg-rosegold",
  },
};

// Landing-page hero built around a Video Sales Letter. When videoSrc is set
// it renders a native <video> element (playsInline for mobile UX). When it's
// not set it renders a themed placeholder card so the layout is finished and
// the video slot is obvious to reviewers.
export function VslHero({
  eyebrow,
  headline,
  subhead,
  cta,
  videoSrc,
  posterSrc,
  aspect = "video",
  theme = "noir",
}: Props) {
  const portrait = aspect === "portrait";
  const t = THEME[theme];

  const copy = (
    <div
      className={`flex flex-col gap-5 md:gap-6 max-w-3xl ${
        portrait ? "md:col-start-1 md:row-start-1 md:self-end" : ""
      }`}
    >
      <span className={`text-xs uppercase tracking-widest ${t.eyebrow}`}>
        {eyebrow}
      </span>
      <h1 className="font-serif text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl text-bone">
        {headline}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-bone/80 leading-relaxed">
        {subhead}
      </p>
    </div>
  );

  const media = (
    <div
      className={
        portrait
          ? `relative w-full max-w-[400px] mx-auto md:mx-0 aspect-[9/16] bg-black border rounded-sm overflow-hidden shadow-2xl md:col-start-2 md:row-start-1 md:row-span-2 ${t.frame}`
          : `relative w-full aspect-video bg-black border rounded-sm overflow-hidden shadow-2xl ${t.frame}`
      }
    >
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
  );

  const action = (
    <div className={portrait ? "md:col-start-1 md:row-start-2 md:self-start" : ""}>
      <Link
        href={cta.href}
        className={`inline-block text-xs uppercase tracking-widest px-7 sm:px-8 py-3.5 sm:py-4 transition-colors ${t.cta}`}
      >
        {cta.label}
      </Link>
    </div>
  );

  return (
    <section className={`relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-10 ${t.section}`}>
      <div
        className={`relative max-w-6xl mx-auto ${
          portrait
            ? "grid gap-10 md:gap-x-16 md:gap-y-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
            : "flex flex-col gap-10 md:gap-14"
        }`}
      >
        {copy}
        {media}
        {action}
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
