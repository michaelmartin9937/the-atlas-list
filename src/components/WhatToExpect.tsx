import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

export function WhatToExpect() {
  const { eyebrow, headline, intro, bullets } = home.whatToExpect;
  return (
    <section className="bg-pearl py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <FadeIn>
          <div className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight">
              {headline}
            </h2>
            <p className="text-ink/85 leading-relaxed text-lg">{intro}</p>
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <ul className="flex flex-col gap-4 md:pt-2">
            {bullets.map((b) => (
              <li key={b} className="flex gap-4 items-start">
                <span
                  className="text-bronze text-xl leading-none mt-1 flex-shrink-0"
                  aria-hidden
                >
                  ·
                </span>
                <span className="text-ink/85 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
