import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function ValuePillars() {
  return (
    <section className="bg-pearl py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
        {home.pillars.map((pillar, i) => (
          <FadeIn key={pillar.title} delay={i * 100}>
            <div className="flex flex-col gap-4">
              <span className="font-serif text-bronze text-2xl">0{i + 1}</span>
              <div className="h-px bg-bronze/40 w-12" aria-hidden />
              <h3 className="font-serif text-2xl md:text-3xl text-noir leading-tight">
                {pillar.title}
              </h3>
              <p className="text-ink/80 leading-relaxed">{pillar.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
