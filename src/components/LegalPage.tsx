import Link from "next/link";

type Section = { heading: string; body: readonly string[] };

type Props = {
  current: "terms" | "privacy";
  partLabel: string; // "Part One" / "Part Two"
  title: string; // "Terms of Service" / "Privacy Policy"
  intro: string;
  effectiveDate: string;
  sections: readonly Section[];
};

const HERO_INTRO =
  "The Atlas List is an invitation-only private social club producing curated social experiences and special events in Scottsdale, Arizona, and the greater Phoenix area. These Terms of Service and Privacy Policy explain the conditions governing membership applications, event participation, ticket purchases, and use of our website and services.";

// Figma: "Terms & Privacy — Atlas List". A black hero shared by both legal
// pages, a pair of pill tabs to switch between them, then numbered sections
// on a 700px measure. The terms and privacy copy itself is unchanged.
export function LegalPage({ current, partLabel, title, intro, effectiveDate, sections }: Props) {
  const tabs = [
    { key: "terms", href: "/terms", label: "Terms of Service" },
    { key: "privacy", href: "/privacy", label: "Privacy Policy" },
  ] as const;

  return (
    <>
      <section className="bg-noir px-6 md:px-10 pt-16 md:pt-[72px] pb-16">
        <div className="max-w-[1280px] mx-auto">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">Legal</span>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-[64px] leading-[1.1] text-bone">
            Terms of Service &amp; Privacy Policy
          </h1>
          <p className="mt-6 max-w-[760px] text-base md:text-[17px] leading-[1.55] text-bone/85">{HERO_INTRO}</p>
          <p className="mt-5 text-sm text-bone/70">Effective date: {effectiveDate}</p>
        </div>
      </section>

      <article className="bg-pearl px-6 md:px-10 pt-8 pb-24 md:pb-32">
        <nav aria-label="Legal documents" className="flex justify-center gap-4">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              aria-current={t.key === current ? "page" : undefined}
              className={`inline-flex items-center h-12 px-7 rounded-full text-[15px] font-semibold transition-colors ${
                t.key === current
                  ? "bg-ember text-pearl"
                  : "border border-ember text-ember hover:bg-ember/10"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="max-w-[700px] mx-auto mt-20 md:mt-24">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">{partLabel}</span>
          <h2 className="mt-5 font-serif text-4xl md:text-[44px] leading-[1.1] text-noir">{title}</h2>
          <div className="mt-6 h-[3px] w-16 bg-ember" aria-hidden />
          <p className="mt-10 text-base md:text-[17px] leading-[1.55] text-ink/70">{intro}</p>

          <div className="mt-12 flex flex-col gap-12">
            {sections.map((section, i) => (
              <section key={section.heading}>
                <h3 className="text-[19px] font-semibold leading-tight text-noir">
                  {i + 1}. {section.heading}
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  {section.body.map((p, j) => (
                    <p key={j} className="text-base md:text-[17px] leading-[1.55] text-ink/70">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
