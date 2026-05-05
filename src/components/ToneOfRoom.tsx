import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function ToneOfRoom() {
  const { eyebrow, forWomen, forMen } = home.toneOfRoom;
  return (
    <section className="bg-noir py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <div className="h-px bg-bronze/40 w-12" aria-hidden />
              <h3 className="font-serif text-2xl md:text-3xl text-bone leading-tight">
                {forWomen.headline}
              </h3>
              <p className="text-bone/75 leading-relaxed">{forWomen.body}</p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-col gap-5">
              <div className="h-px bg-bronze/40 w-12" aria-hidden />
              <h3 className="font-serif text-2xl md:text-3xl text-bone leading-tight">
                {forMen.headline}
              </h3>
              <p className="text-bone/75 leading-relaxed">{forMen.body}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
