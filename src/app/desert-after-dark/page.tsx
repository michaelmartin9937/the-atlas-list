import type { Metadata } from "next";
import { EventHero } from "@/components/EventHero";
import { NightCarousel } from "@/components/NightCarousel";
import { PersonTile } from "@/components/PersonTile";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { PartnershipBand } from "@/components/PartnershipBand";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { desertAfterDark } from "@/content/desert-after-dark";

const shareTitle = "Desert After Dark · October 10";
// The sponsor credit goes on the share card (og/twitter title, description,
// image alt) but stays out of the browser-tab title.
const shareOgTitle = "Desert After Dark powered by Thundr · October 10";
const shareDescription =
  "The Atlas List presents Desert After Dark, powered by Thundr — a private-residence fashion show and mansion party in Paradise Valley, October 10, 2026. Featured designers, hand-picked models, top-shelf DJs — allocated by application.";

// Dedicated share card: the root layout's openGraph block is otherwise
// inherited wholesale, which made links to this page preview as the home
// page. Relative URLs resolve against metadataBase (www.theatlaslist.club).
export const metadata: Metadata = {
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "/desert-after-dark" },
  openGraph: {
    title: `${shareOgTitle} · The Atlas List`,
    description: shareDescription,
    url: "/desert-after-dark",
    siteName: "The Atlas List",
    type: "website",
    images: [
      {
        url: "/images/og-desert-after-dark.jpg",
        width: 1200,
        height: 630,
        alt: "Desert After Dark powered by Thundr — The Atlas List fashion show + mansion party, October 10, 2026, Paradise Valley",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${shareOgTitle} · The Atlas List`,
    description: shareDescription,
    images: ["/images/og-desert-after-dark.jpg"],
  },
};

// Figma: "Desert After Dark — Full Page" (Sep 2026). Velvet-black page, gold
// eyebrows, Playfair headlines, 140px section rhythm.
const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.08em] text-gold";
const h2Center = "mt-5 font-serif text-4xl md:text-[56px] leading-[1.08] text-bone";
const intro = "mt-5 text-base md:text-[17px] leading-[1.5] text-velvet-text";

// The night is one arc — golden hour into full velvet dark — so the four
// acts walk through the palette in that order.
const ACT_COLORS = ["text-gold", "text-rosegold", "text-terracotta", "text-burgundy"];

export default function DesertAfterDarkPage() {
  const d = desertAfterDark;
  return (
    <>
      <EventHero
        eyebrow={d.hero.eyebrow}
        headline={d.hero.headline}
        tagline={d.hero.tagline}
        subhead={d.hero.subhead}
        cta={{ label: d.hero.cta, href: "#apply" }}
        videoSrc="/videos/atlas-house-promo.mp4"
        posterSrc="/images/dad/hero-fire.jpg"
      />

      <NightCarousel
        eyebrow={d.night.eyebrow}
        headline={d.night.headline}
        intro={d.night.intro}
        cards={d.night.cards}
      />

      {/* Designers — equal billing: identical tiles, alphabetical, 3×2 grid. */}
      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center max-w-[760px] mx-auto">
              <span className={eyebrow}>{d.designers.eyebrow}</span>
              <h2 className={h2Center}>{d.designers.headline}</h2>
              <p className={intro}>{d.designers.intro}</p>
              <p className="mt-4 text-[13px] uppercase tracking-[0.12em] text-[#8A857E]">
                {d.designers.note}
              </p>
            </div>
          </FadeIn>
          <ul className="mt-14 md:mt-[72px] grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {d.designers.list.map((p) => (
              <PersonTile key={p.handle} name={p.name} handle={p.handle} image={p.image} title={p.label} />
            ))}
          </ul>
        </div>
      </section>

      {/* The one saturated moment on the page: a burgundy glow behind the venue. */}
      <section className="relative overflow-hidden bg-velvet px-6 md:px-10 py-24 md:py-[140px]">
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_45%_60%_at_50%_50%,rgba(164,62,120,0.22),transparent_70%)]"
          aria-hidden
        />
        <div className="relative max-w-[780px] mx-auto text-center flex flex-col items-center">
          <FadeIn className="flex flex-col items-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-burgundy/60">
              {d.venue.eyebrow}
            </span>
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl md:text-[48px] leading-[1.12] text-bone">
              {d.venue.headline}
            </h2>
            <p className="mt-6 text-base md:text-[17px] leading-[1.5] text-[#D8D2C8]">
              {d.venue.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className={eyebrow}>{d.timeline.eyebrow}</span>
              <h2 className={h2Center}>{d.timeline.headline}</h2>
              <p className={intro}>{d.timeline.intro}</p>
            </div>
          </FadeIn>
          <ol className="mt-12 md:mt-[72px] grid md:grid-cols-2 gap-x-[60px] gap-y-10">
            {d.timeline.acts.map((act, i) => (
              <FadeIn key={act.title} delay={i * 100}>
                <li className="border-t border-velvet-line pt-8 md:pt-10 flex flex-col h-full">
                  <div className="flex items-baseline gap-3">
                    <span className={`font-serif text-xl md:text-2xl ${ACT_COLORS[i % ACT_COLORS.length]}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-2xl md:text-[28px] leading-tight text-bone">
                      {act.title}
                    </h3>
                  </div>
                  <span className="mt-3 text-[13px] tracking-[0.1em] text-velvet-text">
                    {act.time}
                  </span>
                  <p className="mt-4 max-w-[470px] text-base leading-[1.5] text-velvet-text">
                    {act.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <span className={eyebrow}>{d.dressCode.eyebrow}</span>
            <h2 className="mt-6 font-serif text-4xl md:text-[48px] leading-[1.1] text-bone">
              {d.dressCode.headline}
            </h2>
            <div className="mt-8 h-[3px] w-60 bg-gradient-to-r from-gold via-rosegold to-burgundy" aria-hidden />
            <p className="mt-8 max-w-[1000px] text-base md:text-[17px] leading-[1.5] text-[#D8D2C8]">
              {d.dressCode.body}
            </p>
          </FadeIn>
          <ul className="mt-12 md:mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-11 gap-x-3 gap-y-8 md:gap-x-2">
            {d.dressCode.palette.map((swatch) => (
              <li key={swatch.name} className="flex flex-col items-center gap-4 text-center">
                <span className="text-[13px] font-semibold leading-tight text-bone">{swatch.name}</span>
                <span
                  className={`block w-full h-11 ${swatch.hex === "#0A0A0A" ? "border border-[#3A3633]" : ""}`}
                  style={{ background: swatch.hex }}
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoCarousel eyebrow={d.store.eyebrow} images={d.store.images} tone="dark" />

      <section className="bg-velvet px-6 md:px-10 py-20 md:py-[140px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center max-w-[760px] mx-auto">
              <span className={eyebrow}>{d.team.eyebrow}</span>
              <h2 className={h2Center}>{d.team.headline}</h2>
              <p className={intro}>{d.team.intro}</p>
            </div>
          </FadeIn>
          <ul className="mt-14 md:mt-[72px] grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {d.team.people.map((p) => (
              <PersonTile
                key={p.handle}
                name={p.name}
                handle={p.handle}
                image={"image" in p ? p.image : undefined}
                title={"title" in p ? p.title : undefined}
                note={"note" in p ? p.note : undefined}
                link={"link" in p ? p.link : true}
              />
            ))}
          </ul>
        </div>
      </section>

      <PartnershipBand {...d.partnership} tone="light" />

      <section id="apply" className="relative overflow-hidden bg-velvet px-6 md:px-10 pt-20 md:pt-[120px] pb-20 md:pb-[140px]">
        <div
          className="absolute inset-x-0 top-0 h-[520px] pointer-events-none bg-[radial-gradient(ellipse_35%_50%_at_50%_10%,rgba(164,62,120,0.22),transparent_70%)]"
          aria-hidden
        />
        <div className="relative max-w-[760px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className={eyebrow}>{d.apply.eyebrow}</span>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl md:text-[48px] leading-[1.1] text-bone">
                {d.apply.headline}
              </h2>
              <p className={intro}>{d.apply.subhead}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="mt-12 md:mt-14">
            <ApplicationForm
              sourcePage="desert-after-dark"
              submitLabel="Request Ticket Allocation"
              tone="dark"
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
