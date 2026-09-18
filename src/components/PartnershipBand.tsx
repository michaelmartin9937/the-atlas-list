import Link from "next/link";

type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: string;
  href: string;
  // "dark" = black band with a gold button (home); "light" = pearl band with
  // a dark button (Desert After Dark).
  tone?: "dark" | "light";
};

// Full-width partnership call-out (Figma: "A few partnerships remain").
export function PartnershipBand({ eyebrow, headline, subhead, cta, href, tone = "dark" }: Props) {
  const dark = tone === "dark";
  return (
    <section className={`${dark ? "bg-noir" : "bg-pearl"} px-6 md:px-10 py-14 md:py-[68px]`}>
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
            {eyebrow}
          </span>
          <h2 className={`mt-3 font-serif text-3xl md:text-[36px] leading-[1.15] ${dark ? "text-bone" : "text-noir"}`}>
            {headline}
          </h2>
          <p className={`mt-3 text-base md:text-[17px] leading-[1.5] ${dark ? "text-bone/85" : "text-ink/70"}`}>
            {subhead}
          </p>
        </div>
        <Link
          href={href}
          className={`inline-flex self-start md:self-auto items-center justify-center h-[52px] px-8 text-xs font-medium uppercase tracking-[0.06em] transition-colors ${
            dark ? "bg-gold text-noir hover:bg-bone" : "bg-noir text-bone hover:bg-gold hover:text-noir"
          }`}
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
