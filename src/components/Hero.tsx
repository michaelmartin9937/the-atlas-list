import Image from "next/image";
import Link from "next/link";

type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string };
  imageUrl?: string;
  height?: "tall" | "short";
};

export function Hero({
  eyebrow,
  headline,
  subhead,
  cta,
  imageUrl = "/images/hero-rooftop.jpg",
  height = "tall",
}: Props) {
  // Mobile heights are intentionally shorter than desktop so the wide landscape
  // hero photo isn't forced to upscale into a tall portrait viewport, which is
  // what was clipping subjects on phones.
  const heightClass =
    height === "tall"
      ? "min-h-[68vh] sm:min-h-[88vh]"
      : "min-h-[52vh] sm:min-h-[60vh]";
  return (
    <section
      className={`relative ${heightClass} flex items-end overflow-hidden bg-noir`}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_38%] opacity-70"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/30 to-noir/90"
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-28 pt-28 md:pt-32 w-full">
        <div className="max-w-2xl flex flex-col gap-5 md:gap-6">
          <span className="text-xs uppercase tracking-widest text-bronze">
            {eyebrow}
          </span>
          <h1 className="font-serif text-[2.6rem] leading-[1.05] sm:text-5xl md:text-7xl text-bone">
            {headline}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-bone/85 max-w-xl leading-relaxed">
            {subhead}
          </p>
          {cta && (
            <div className="mt-3 md:mt-4">
              <Link
                href={cta.href}
                className="inline-block text-xs uppercase tracking-widest text-noir bg-bone px-7 sm:px-8 py-3.5 sm:py-4 hover:bg-bronze hover:text-bone transition-colors"
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
