import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Black band, two columns each opened by a short gold rule (Figma: The Tone of the Room).
export function ToneOfRoom() {
  const { eyebrow, forWomen, forMen } = home.toneOfRoom;
  const cols = [forWomen, forMen];
  return (
    <section className="bg-black py-16 md:py-[88px] px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <span className="block text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
            {eyebrow}
          </span>
        </FadeIn>
        <div className="mt-12 md:mt-[54px] grid gap-12 md:grid-cols-2 md:gap-[160px]">
          {cols.map((c, i) => (
            <FadeIn key={c.headline} delay={i * 120}>
              <div className="flex flex-col gap-5">
                <div className="h-px w-12 bg-gold" aria-hidden />
                <h3 className="font-serif text-2xl sm:text-3xl md:text-[30px] leading-[1.2] text-bone md:max-w-[300px]">
                  {c.headline}
                </h3>
                <p className="mt-2 text-base leading-[1.5] text-bone/70">{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
