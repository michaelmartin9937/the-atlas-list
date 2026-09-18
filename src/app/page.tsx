import { Hero } from "@/components/Hero";
import { HowWeGather } from "@/components/HowWeGather";
import { RightNow } from "@/components/RightNow";
import { EventGallery } from "@/components/EventGallery";
import { WhatToExpect } from "@/components/WhatToExpect";
import { ToneOfRoom } from "@/components/ToneOfRoom";
import { WhoBelongs } from "@/components/WhoBelongs";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { PartnershipBand } from "@/components/PartnershipBand";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { home } from "@/content/home";

// Section order follows the Figma "Atlas List — Homepage (New)" frame
// (Diana's September 2026 revision).
export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        headline={home.hero.headline}
        subhead={home.hero.subhead}
        cta={{ label: home.hero.cta, href: "#apply" }}
        videoUrl="/videos/hero-loop.mp4"
      />
      <HowWeGather />
      <RightNow />
      <EventGallery />
      <WhatToExpect />
      <ToneOfRoom />
      <WhoBelongs />
      <PhotoCarousel
        eyebrow={home.moreFromTheRoom.eyebrow}
        headline={home.moreFromTheRoom.headline}
        images={home.moreFromTheRoom.images}
      />
      <PartnershipBand {...home.partnership} tone="dark" />

      <section id="apply" className="bg-pearl py-14 md:py-16 px-6 md:px-10">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div className="text-center">
              <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
                {home.closingCta.eyebrow}
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.1] text-noir">
                {home.closingCta.headline}
              </h2>
              <p className="mt-4 text-base leading-[1.5] text-ink/75">{home.closingCta.subhead}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-10 md:mt-12">
              {/* Figma drops the Instagram field on the home form only. */}
              <ApplicationForm sourcePage="home" submitLabel="Request Ticket Allocation" showInstagram={false} />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
