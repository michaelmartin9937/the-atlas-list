import { EditorialHero } from "@/components/EditorialHero";
import { HowWeGather } from "@/components/HowWeGather";
import { RightNow } from "@/components/RightNow";
import { EventGallery } from "@/components/EventGallery";
import { WhatToExpect } from "@/components/WhatToExpect";
import { EditorialCarousel } from "@/components/EditorialCarousel";
import { ToneOfRoom } from "@/components/ToneOfRoom";
import { WhoBelongs } from "@/components/WhoBelongs";
import { PartnershipBand } from "@/components/PartnershipBand";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { ArrowLink, BackToTop, Button, Display, Eyebrow, Note, SectionHeader, container } from "@/components/editorial";
import { home } from "@/content/home";

// Section order follows the Figma frame "01 — Home" ("Altas List Desert
// After Dark", October 2026 editorial redesign).
export default function HomePage() {
  const h = home.hero;
  return (
    <>
      <EditorialHero
        eyebrowLines={h.eyebrowLines}
        title={
          <>
            {h.headline.before}
            <em className="italic">{h.headline.em}</em>
            {h.headline.after}
          </>
        }
        keywords={h.keywords}
        issue={h.issue}
        image="/images/hero-rooftop.jpg"
        video="/videos/hero-loop.mp4"
      >
        <p className="mt-8 md:mt-10 max-w-[440px] text-[16px] md:text-[17px] leading-[1.6] text-bone/85">{h.subhead}</p>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <Button href="#apply" variant="cream">
            {h.cta}
          </Button>
          <ArrowLink href={h.secondary.href} tone="dark">
            {h.secondary.label}
          </ArrowLink>
        </div>
      </EditorialHero>

      <HowWeGather />
      <RightNow />
      <EventGallery />
      <WhatToExpect />

      {/* 06 — From the archive */}
      <section className="bg-night text-bone py-20 md:py-[112px] overflow-hidden">
        <div className={container}>
          <FadeIn>
            <SectionHeader n={6} eyebrow={home.archive.eyebrow} title={home.archive.headline} intro={home.archive.intro} tone="dark" />
          </FadeIn>
          <FadeIn delay={120}>
            <EditorialCarousel images={home.archive.images} tone="dark" caption={home.archive.caption} className="mt-12 md:mt-16" />
          </FadeIn>
        </div>
      </section>

      <ToneOfRoom />
      <WhoBelongs />
      <PartnershipBand {...home.partnership} tone="light" n={9} />

      {/* 10 — Apply */}
      <section id="apply" className="bg-night text-bone py-20 md:py-[120px]">
        <div className={`${container} grid gap-14 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-20`}>
          <FadeIn>
            <Eyebrow n={10} tone="dark">
              {home.apply.eyebrow}
            </Eyebrow>
            <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10">
              {home.apply.headline}
            </Display>
            <p className="mt-7 text-[15px] leading-[1.65] text-bone/70">{home.apply.subhead}</p>
            <div className="mt-10">
              <Note label={home.apply.noteLabel}>{home.apply.note}</Note>
            </div>
            <div className="hidden md:block mt-16">
              <BackToTop />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            {/* Same extended application as the Desert After Dark page. */}
            <ApplicationForm sourcePage="home" submitLabel="Request Ticket Allocation" variant="extended" tone="dark" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
