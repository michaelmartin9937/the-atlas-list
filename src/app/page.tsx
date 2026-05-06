import { Hero } from "@/components/Hero";
import { NextEventCard } from "@/components/NextEventCard";
import { WhatToExpect } from "@/components/WhatToExpect";
import { ToneOfRoom } from "@/components/ToneOfRoom";
import { EventGallery } from "@/components/EventGallery";
import { WhoBelongs } from "@/components/WhoBelongs";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        headline={home.hero.headline}
        subhead={home.hero.subhead}
        cta={{ label: home.hero.cta, href: "#apply" }}
      />

      <NextEventCard />
      <EventGallery />
      <WhatToExpect />
      <ToneOfRoom />
      <WhoBelongs />

      <section id="apply" className="bg-bone py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-5 mb-12 text-center">
              <span className="text-xs uppercase tracking-widest text-bronze">
                Apply
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight">
                {home.closingCta.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed text-lg">
                {home.closingCta.subhead}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <ApplicationForm sourcePage="home" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
