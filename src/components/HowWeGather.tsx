import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Three-column "Weekly / Monthly / Yearly" overview (Figma: How We Gather).
export function HowWeGather() {
  const { eyebrow, headline, ways, note } = home.howWeGather;
  return (
    <section className="bg-pearl py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] text-noir">
            {headline}
          </h2>
        </FadeIn>
        <div className="mt-10 md:mt-12 grid gap-8 md:grid-cols-3 md:gap-[60px]">
          {ways.map((w, i) => (
            <FadeIn key={w.label} delay={i * 90}>
              <div className="border-t border-sand pt-5 flex flex-col gap-2.5">
                <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
                  {w.label}
                </span>
                <p className="text-base leading-[1.5] text-ink/85">{w.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={300}>
          <p className="mt-10 md:mt-14 text-center font-serif italic text-base md:text-lg text-ink/70">
            {note}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
