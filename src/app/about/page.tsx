import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { Hosts } from "@/components/Hosts";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.subhead,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow={about.hero.eyebrow}
        headline={about.hero.headline}
        subhead={about.hero.subhead}
        height="short"
        imageUrl="/images/about-hero.jpg"
      />

      <section className="bg-bone py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-prose mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-6">
              {about.origin.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-serif text-2xl md:text-3xl leading-snug text-noir"
                      : "text-ink/85 leading-relaxed text-lg"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-pearl py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-prose mx-auto">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight mb-8">
              {about.who.headline}
            </h2>
            <div className="flex flex-col gap-5">
              {about.who.body.map((p, i) => (
                <p key={i} className="text-ink/85 leading-relaxed text-lg">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Hosts />

      <section className="bg-noir py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-serif italic text-2xl md:text-4xl text-bone leading-snug">
              {about.vibeQuote}
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="apply" className="bg-bone py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-5 mb-12 text-center">
              <span className="text-xs uppercase tracking-widest text-bronze">
                Apply
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight">
                {about.closingCta.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed text-lg">
                {about.closingCta.subhead}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <ApplicationForm sourcePage="about" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
