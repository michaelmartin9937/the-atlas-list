import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function PhotographerBenefit() {
  const { eyebrow, headline, body } = home.photographer;
  return (
    <section className="bg-bone py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <FadeIn>
          <div
            className="aspect-[4/5] bg-cover bg-center bg-taupe/30"
            style={{ backgroundImage: "url(/images/photographer.jpg)" }}
            aria-label="Member being photographed at a Curated Life gathering"
            role="img"
          />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight">
              {headline}
            </h2>
            <p className="text-ink/80 leading-relaxed text-lg">{body}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
