import Link from "next/link";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";
import { Button, Display, Eyebrow, container } from "./editorial";

// Figma "05 — What the evening feels like": headline, intro and a button on
// the left; a numbered, hairline-ruled list in Playfair on the right.
export function WhatToExpect() {
  const { eyebrow, headline, intro, cta, href, bullets, caveat } = home.whatToExpect;
  const [before, after] = caveat.split("See the Event page");
  return (
    <section className="bg-cream py-20 md:py-[120px]">
      <div className={`${container} grid gap-14 md:grid-cols-[minmax(0,460px)_minmax(0,1fr)] md:gap-24`}>
        <FadeIn>
          <Eyebrow n={5}>{eyebrow}</Eyebrow>
          <Display as="h2" size="lg" className="mt-8 md:mt-10">
            {headline}
          </Display>
          <p className="mt-8 max-w-[420px] text-[15px] leading-[1.65] text-ink/70">{intro}</p>
          <div className="mt-9">
            <Button href={href} variant="outline-light">
              {cta}
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <ol className="border-t border-hairline">
            {bullets.map((b, i) => (
              <li key={b} className="flex items-baseline gap-6 md:gap-8 border-b border-hairline py-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-coral shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[20px] md:text-[26px] leading-tight text-noir">{b}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[12px] leading-[1.6] text-ink/55">
            {before}
            <Link href="/desert-after-dark" className="underline underline-offset-4 decoration-hairline hover:text-coral">
              See the Event page
            </Link>
            {after}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
