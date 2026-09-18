import Link from "next/link";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Two-column: headline, intro and calendar button on the left, bullet list
// on the right, italic caveat spanning below (Figma: What the Evening Feels Like).
export function WhatToExpect() {
  const { eyebrow, headline, intro, cta, calendarHref, bullets, caveat } = home.whatToExpect;
  const [before, after] = caveat.split("see the Desert After Dark page");
  return (
    <section className="bg-pearl py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
            {eyebrow}
          </span>
        </FadeIn>
        <div className="mt-6 grid gap-10 md:grid-cols-[440px_minmax(0,420px)] md:justify-between md:gap-16">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[40px] leading-[1.12] text-noir">
              {headline}
            </h2>
            <p className="mt-8 text-base leading-[1.5] text-ink/75">{intro}</p>
            <div className="mt-8">
              <a
                href={calendarHref}
                download
                className="inline-flex items-center justify-center h-[50px] px-10 bg-noir text-bone text-xs font-medium uppercase tracking-[0.06em] hover:bg-gold hover:text-noir transition-colors"
              >
                {cta}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <ul className="flex flex-col gap-6 md:pt-1">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-4">
                  <span className="mt-[9px] h-1 w-1 rounded-full bg-gold flex-shrink-0" aria-hidden />
                  <span className="text-base leading-[1.25] text-ink/85">{b}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <FadeIn delay={200}>
          <p className="mt-12 md:mt-16 font-serif italic text-sm md:text-base leading-[1.5] text-ink/60">
            {before}
            <Link href="/desert-after-dark" className="underline decoration-sand underline-offset-4 hover:text-gold">
              see the Desert After Dark page
            </Link>
            {after}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
