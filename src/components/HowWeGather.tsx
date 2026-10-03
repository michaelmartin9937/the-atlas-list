import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";
import { Numeral, SectionHeader, container } from "./editorial";

// Figma "01 — How we gather": heading left, intro right, then three
// hairline-boxed cards with a coral numeral and a condensed label.
export function HowWeGather() {
  const { eyebrow, headline, intro, ways } = home.howWeGather;
  return (
    <section className="bg-cream pt-20 md:pt-[112px] pb-20 md:pb-[96px]">
      <div className={container}>
        <FadeIn>
          <SectionHeader n={1} eyebrow={eyebrow} title={headline} intro={intro} />
        </FadeIn>
        <div className="mt-12 md:mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
          {ways.map((w, i) => (
            <FadeIn key={w.label} delay={i * 90} className="h-full">
              <div className="h-full border border-hairline p-7 md:p-8 flex flex-col">
                <Numeral n={i + 1} className="text-[40px] md:text-[44px]" />
                <h3 className="mt-5 font-condensed uppercase text-[21px] leading-none tracking-[0.03em] text-noir">{w.label}</h3>
                <span className="mt-4 h-px w-full bg-hairline" aria-hidden />
                <p className="mt-4 text-[14px] leading-[1.6] text-ink/70">{w.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
