import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Dark band, two columns each opened by a short rule (Figma: The Tone of the Room).
export function ToneOfRoom() {
  const { eyebrow, forWomen, forMen } = home.toneOfRoom;
  const cols = [forWomen, forMen];
  return (
    <section className="bg-noir py-16 md:py-20 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <span className="block text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
            {eyebrow}
          </span>
        </FadeIn>
        <div className="mt-12 md:mt-[54px] grid gap-12 md:grid-cols-2 md:gap-[160px]">
          {cols.map((c, i) => (
            <FadeIn key={c.headline} delay={i * 120}>
              <div className="flex flex-col gap-5">
                <div className="h-px w-12 bg-sand/60" aria-hidden />
                <h3 className="font-serif text-2xl sm:text-3xl md:text-[34px] leading-[1.18] text-bone">
                  {c.headline}
                </h3>
                <p className="text-base leading-[1.6] text-bone/75">{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
