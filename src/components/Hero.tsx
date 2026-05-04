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
  const heightClass = height === "tall" ? "min-h-[88vh]" : "min-h-[60vh]";
  return (
    <section
      className={`relative ${heightClass} flex items-end overflow-hidden bg-noir`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/30 to-noir/90"
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pb-20 md:pb-28 pt-32 w-full">
        <div className="max-w-2xl flex flex-col gap-6">
          <span className="text-xs uppercase tracking-widest text-bronze">
            {eyebrow}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-bone leading-[1.05]">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-bone/80 max-w-xl leading-relaxed">
            {subhead}
          </p>
          {cta && (
            <div className="mt-4">
              <Link
                href={cta.href}
                className="inline-block text-xs uppercase tracking-widest text-noir bg-bone px-8 py-4 hover:bg-bronze hover:text-bone transition-colors"
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
