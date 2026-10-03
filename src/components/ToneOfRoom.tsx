import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";
import { Display, Eyebrow, container } from "./editorial";

// Figma "06 — The tone of the room": two hairline-topped columns, a coral
// roman numeral over each uppercase headline.
export function ToneOfRoom() {
  const { eyebrow, columns } = home.toneOfRoom;
  return (
    <section className="bg-cream pt-4 pb-20 md:pb-[120px]">
      <div className={container}>
        <FadeIn>
          <Eyebrow n={7}>{eyebrow}</Eyebrow>
        </FadeIn>
        <div className="mt-10 md:mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {columns.map((c, i) => (
            <FadeIn key={c.headline} delay={i * 120}>
              <div className="border-t border-hairline pt-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-coral">{c.numeral}</span>
                <Display as="h3" size="md" className="mt-8">
                  {c.headline}
                </Display>
                <p className="mt-7 max-w-[460px] text-[15px] leading-[1.65] text-ink/70">{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
