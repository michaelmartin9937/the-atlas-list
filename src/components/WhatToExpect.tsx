import Link from "next/link";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Two-column: headline + intro on the left, bullet list on the right,
// caveat line spanning below (Figma: What the Evening Feels Like).
export function WhatToExpect() {
  const { eyebrow, headline, intro, bullets, caveat } = home.whatToExpect;
  const [before, after] = caveat.split("see the Desert After Dark page");
  return (
    <section className="bg-pearl py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-10 md:grid-cols-[440px_minmax(0,420px)] md:justify-between md:gap-16">
          <FadeIn>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-[40px] leading-[1.12] text-noir">
              {headline}
            </h2>
            <p className="mt-6 text-base leading-[1.5] text-ink/85">{intro}</p>
          </FadeIn>
          <FadeIn delay={120}>
            <ul className="flex flex-col gap-6 md:pt-8">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-4">
                  <span className="mt-[9px] h-1 w-1 rounded-full bg-ember flex-shrink-0" aria-hidden />
                  <span className="text-base leading-[1.25] text-ink/85">{b}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <FadeIn delay={200}>
          <p className="mt-10 md:mt-12 text-sm leading-[1.5] text-ink/65 italic">
            {before}
            <Link href="/desert-after-dark" className="underline decoration-sand underline-offset-4 hover:text-ember">
              see the Desert After Dark page
            </Link>
            {after}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
