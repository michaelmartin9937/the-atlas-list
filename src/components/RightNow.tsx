import Image from "next/image";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";
import { ArrowLink, Button, Display, Eyebrow } from "./editorial";

// Figma "02 — Right now": a full-height photo on the left, the flagship set
// huge on the right with the date line, a short body, the italic admission
// note and two calls to action.
export function RightNow() {
  const r = home.rightNow;
  return (
    <section className="bg-night text-bone">
      <div className="grid md:grid-cols-[minmax(0,47%)_minmax(0,1fr)]">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[760px] overflow-hidden">
          <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 768px) 47vw, 100vw" className="object-cover object-[center_30%]" />
        </div>
        <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24 flex flex-col justify-center">
          <FadeIn>
            <Eyebrow n={2} tone="dark" className="!text-coral">
              {r.eyebrow}
            </Eyebrow>
            <Display as="h2" size="xl" tone="dark" className="mt-8 md:mt-10">
              {r.headline.before}
              <br />
              <em className="italic">{r.headline.em}</em>
              <br />
              {r.headline.after.trim()}
            </Display>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/85">
              {r.date}
              <span className="mx-4" aria-hidden>
                ·
              </span>
              {r.place}
            </p>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.6] text-bone/70">{r.body}</p>
            <p className="mt-6 font-serif italic text-[18px] text-bone/90">{r.note}</p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              <Button href={r.href} variant="outline-dark">
                {r.cta}
              </Button>
              <ArrowLink href={r.secondary.href} tone="dark">
                {r.secondary.label}
              </ArrowLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
