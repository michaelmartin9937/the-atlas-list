import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Centred heading over three open columns, closed by an italic note
// (Figma: How We Gather — Three Ways In).
export function HowWeGather() {
  const { eyebrow, headline, ways, note } = home.howWeGather;
  return (
    <section className="bg-pearl pt-16 md:pt-[72px] pb-12 md:pb-14 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <div className="text-center">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] text-noir">
              {headline}
            </h2>
          </div>
        </FadeIn>
        <div className="mt-12 md:mt-[60px] grid gap-8 md:grid-cols-3 md:gap-[60px]">
          {ways.map((w, i) => (
            <FadeIn key={w.label} delay={i * 90}>
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
                  {w.label}
                </span>
                <p className="text-base leading-[1.5] text-ink/85">{w.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={300}>
          <p className="mt-12 md:mt-16 text-center font-serif italic text-base md:text-lg text-ink/60">
            {note}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
