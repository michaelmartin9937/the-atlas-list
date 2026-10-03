import Link from "next/link";
import { ArrowLink, Display, Eyebrow, container } from "./editorial";
import { terms } from "@/content/terms";
import { privacy } from "@/content/privacy";

type Section = { heading: string; body: readonly string[] };

type Props = {
  current: "terms" | "privacy";
  partLabel: string; // "Part One" / "Part Two"
  title: string; // "Terms of Service" / "Privacy Policy"
  intro: string;
  effectiveDate: string;
  sections: readonly Section[];
};

const EMAIL = "info@theatlaslist.club";

// Figma "05 — Terms & Privacy": a cream hero with the title set huge
// ("TERMS & PRIVACY", ampersand and second word in italics), a left rail
// that lists both documents, numbered hairline sections on the right, and a
// dark "We read every note" band. The legal copy itself is unchanged.
export function LegalPage({ current, title, intro, effectiveDate, sections }: Props) {
  const docs = [
    { key: "terms", href: "/terms", label: "Terms of Service", count: terms.sections.length },
    { key: "privacy", href: "/privacy", label: "Privacy Policy", count: privacy.sections.length },
  ] as const;

  return (
    <>
      <section className="bg-cream border-b border-hairline">
        <div className={`${container} pt-20 md:pt-[120px] pb-14 md:pb-16`}>
          <Eyebrow>Legal</Eyebrow>
          <Display as="h1" size="xl" className="mt-8">
            Terms <em className="italic">&amp; Privacy</em>
          </Display>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/55 flex flex-wrap gap-x-10 gap-y-2">
            <span>Last updated: {effectiveDate}</span>
            <span>Applies to all Atlas List events, including Desert After Dark</span>
          </p>
        </div>
      </section>

      <article className="bg-cream">
        <div className={`${container} py-16 md:py-24 grid gap-14 md:grid-cols-[240px_minmax(0,1fr)] md:gap-20`}>
          <aside className="md:sticky md:top-[104px] self-start">
            <div className="border-t border-hairline pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-coral">On this page</span>
              <ul className="mt-4">
                {docs.map((d) => (
                  <li key={d.key} className="border-b border-hairline">
                    <Link
                      href={d.href}
                      aria-current={d.key === current ? "page" : undefined}
                      className={`flex items-baseline justify-between gap-4 py-3 font-serif text-[20px] transition-colors hover:text-coral ${
                        d.key === current ? "text-noir" : "text-ink/60"
                      }`}
                    >
                      {d.label}
                      <span className="font-mono text-[10px] tracking-[0.2em] text-ink/50">1–{d.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <span className="mt-8 block font-mono text-[10px] uppercase tracking-[0.24em] text-coral">Questions</span>
            <a href={`mailto:${EMAIL}`} className="mt-3 block text-[14px] text-noir hover:text-coral transition-colors">
              {EMAIL}
            </a>
          </aside>

          <div>
            <Display as="h2" size="lg">
              {title}
            </Display>
            <p className="mt-8 max-w-[700px] text-[15px] leading-[1.65] text-ink/70">{intro}</p>
            <ol className="mt-10 border-t border-hairline">
              {sections.map((section, i) => (
                <li key={section.heading} className="grid grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[72px_minmax(0,1fr)] gap-x-4 border-b border-hairline py-8">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-coral pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-serif text-[24px] md:text-[28px] leading-tight text-noir">{section.heading}</h3>
                    <div className="mt-3 flex flex-col gap-3">
                      {section.body.map((p, j) => (
                        <p key={j} className="text-[15px] leading-[1.65] text-ink/70">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </article>

      <section className="bg-night text-bone py-16 md:py-24">
        <div className={`${container} flex flex-col md:flex-row md:items-end md:justify-between gap-10`}>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-coral">Questions</span>
            <Display as="p" size="md" tone="dark" className="mt-6">
              We read <em className="italic">every</em> note
            </Display>
            <p className="mt-6 text-[16px] text-bone/75">
              Write to{" "}
              <a href={`mailto:${EMAIL}`} className="text-bone hover:text-coral transition-colors">
                {EMAIL}
              </a>{" "}
              and a real person will reply.
            </p>
          </div>
          <ArrowLink href="/" tone="dark" className="border border-bone/40 px-7 h-[52px] hover:border-coral">
            Back to home
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
