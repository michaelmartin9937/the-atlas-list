import type { Metadata } from "next";
import { VslHero } from "@/components/VslHero";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { InstagramLink } from "@/components/InstagramLink";
import { Avatar } from "@/components/Avatar";
import { desertAfterDark } from "@/content/desert-after-dark";

const shareTitle = "Desert After Dark · October 10";
const shareDescription =
  "The Atlas List presents Desert After Dark — a private-residence fashion show and mansion party in Paradise Valley, October 10, 2026. Featured designers, hand-picked models, top-shelf DJs — allocated by application.";

// Dedicated share card: the root layout's openGraph block is otherwise
// inherited wholesale, which made links to this page preview as the home
// page. Relative URLs resolve against metadataBase (www.theatlaslist.club).
export const metadata: Metadata = {
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "/desert-after-dark" },
  openGraph: {
    title: `${shareTitle} · The Atlas List`,
    description: shareDescription,
    url: "/desert-after-dark",
    siteName: "The Atlas List",
    type: "website",
    images: [
      {
        url: "/images/og-desert-after-dark.jpg",
        width: 1200,
        height: 630,
        alt: "Desert After Dark — The Atlas List fashion show + mansion party, October 10, 2026, Paradise Valley",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${shareTitle} · The Atlas List`,
    description: shareDescription,
    images: ["/images/og-desert-after-dark.jpg"],
  },
};

// "Velvet Sunset" — the event's own palette (velvet black base, champagne as
// the accent, burgundy as the highlight, rosewood for muted text). Only this
// page uses it; the rest of the site stays bone/bronze.
const eyebrow = "text-xs uppercase tracking-widest text-champagne";
const h2 = "font-serif text-3xl sm:text-4xl md:text-5xl text-bone leading-tight";
const body = "text-bone/80 leading-relaxed text-base md:text-lg";
const rule = "border-t border-burgundy/40";
const glow =
  "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(164,62,120,0.22),transparent_60%)]";

// The night is one arc — golden hour into full velvet dark — so the four
// acts walk through the palette in that order.
const ACT_COLORS = ["text-champagne", "text-rosegold", "text-terracotta", "text-burgundy"];

export default function DesertAfterDarkPage() {
  return (
    <>
      <VslHero
        eyebrow={desertAfterDark.hero.eyebrow}
        headline={desertAfterDark.hero.headline}
        subhead={desertAfterDark.hero.subhead}
        cta={{ label: desertAfterDark.hero.cta, href: "#apply" }}
        videoSrc="/videos/atlas-house-promo.mp4"
        posterSrc="/images/atlas-house-promo-poster.jpg"
        aspect="portrait"
        theme="velvet"
      />

      <section className="bg-velvet-deep py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 md:gap-8">
          <FadeIn>
            <span className={eyebrow}>{desertAfterDark.pitch.eyebrow}</span>
          </FadeIn>
          <FadeIn delay={80}>
            <h2 className={h2}>{desertAfterDark.pitch.headline}</h2>
            <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-champagne to-burgundy" aria-hidden />
          </FadeIn>
          <FadeIn delay={140}>
            <div className="flex flex-col gap-5 mt-2">
              {desertAfterDark.pitch.body.map((p, i) => (
                <p key={i} className={body}>
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Designers — equal billing: identical tiles, alphabetical, 3x2 grid so
          nobody is stranded alone on a row at any breakpoint. */}
      <section className="bg-velvet py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto">
              <span className={eyebrow}>{desertAfterDark.designers.eyebrow}</span>
              <h2 className={h2}>{desertAfterDark.designers.headline}</h2>
              <p className={body}>{desertAfterDark.designers.intro}</p>
              <p className="text-xs uppercase tracking-widest text-rosewood">
                {desertAfterDark.designers.note}
              </p>
            </div>
          </FadeIn>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10">
            {desertAfterDark.designers.list.map((d, i) => (
              <FadeIn key={d.handle} delay={i * 80}>
                <li className={`${rule} pt-5 md:pt-6 flex flex-col gap-4 h-full`}>
                  <div className="flex items-center gap-4">
                    <Avatar name={d.name} image={d.image} tone="dark" />
                    <span className="font-serif text-2xl text-bone leading-tight">
                      {d.name}
                    </span>
                  </div>
                  <InstagramLink handle={d.handle} label={`${d.name} on Instagram`} tone="dark" />
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-velvet-deep py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <span className={eyebrow}>{desertAfterDark.models.eyebrow}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-bone leading-tight">
                {desertAfterDark.models.headline}
              </h2>
              <p className="text-bone/80 leading-relaxed">{desertAfterDark.models.intro}</p>
              <div className={`${rule} pt-5 mt-2`}>
                <p className="font-serif italic text-lg text-rosewood">
                  {desertAfterDark.models.tbd}
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-col gap-5">
              <span className={eyebrow}>{desertAfterDark.djs.eyebrow}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-bone leading-tight">
                {desertAfterDark.djs.headline}
              </h2>
              <p className="text-bone/80 leading-relaxed">{desertAfterDark.djs.intro}</p>
              <ul className="flex flex-col gap-3 mt-2">
                {desertAfterDark.djs.list.map((dj) => (
                  <li key={dj.handle} className={`${rule} pt-5 flex flex-col gap-4`}>
                    <div className="flex items-center gap-4">
                      <Avatar name={dj.name} image={dj.image} tone="dark" />
                      <div className="flex flex-col gap-1">
                        <span className="font-serif text-2xl text-bone leading-tight">{dj.name}</span>
                        {dj.note && <span className="text-sm text-bone/65">{dj.note}</span>}
                      </div>
                    </div>
                    <InstagramLink handle={dj.handle} label={`${dj.name} on Instagram`} tone="dark" />
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Production team credits, with a slot ready for hair & makeup. */}
      <section className="bg-velvet py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto">
              <span className={eyebrow}>{desertAfterDark.team.eyebrow}</span>
              <h2 className={h2}>{desertAfterDark.team.headline}</h2>
              <p className={body}>{desertAfterDark.team.intro}</p>
            </div>
          </FadeIn>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10">
            {desertAfterDark.team.people.map((p, i) => (
              <FadeIn key={p.handle} delay={i * 80}>
                <li className={`${rule} pt-5 md:pt-6 flex flex-col gap-4 h-full`}>
                  <div className="flex items-center gap-4">
                    <Avatar name={p.name} image={p.image} tone="dark" />
                    <div className="flex flex-col gap-1.5">
                      <span className="font-serif text-2xl text-bone leading-tight">
                        {p.name}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-rosewood">
                        {p.title}
                      </span>
                    </div>
                  </div>
                  <InstagramLink handle={p.handle} label={`${p.name} on Instagram`} tone="dark" />
                </li>
              </FadeIn>
            ))}
            <FadeIn delay={desertAfterDark.team.people.length * 80}>
              <li className="border-t border-rosewood/40 pt-5 md:pt-6 flex flex-col gap-1.5 h-full">
                <span className="font-serif text-2xl md:text-3xl text-bone leading-tight">
                  {desertAfterDark.team.hairMakeup.title}
                </span>
                <span className="font-serif italic text-lg text-rosewood">
                  {desertAfterDark.team.hairMakeup.tbd}
                </span>
              </li>
            </FadeIn>
          </ul>
        </div>
      </section>

      {/* The one saturated moment on the page: the burgundy of the palette,
          fading back down into velvet. */}
      <section className="bg-gradient-to-br from-burgundy via-burgundy/80 to-velvet-deep py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-5 md:gap-6">
          <FadeIn>
            <span className={eyebrow}>{desertAfterDark.location.eyebrow}</span>
          </FadeIn>
          <FadeIn delay={80}>
            <h2 className={h2}>{desertAfterDark.location.headline}</h2>
          </FadeIn>
          <FadeIn delay={140}>
            <p className="text-bone/85 leading-relaxed text-base md:text-lg">
              {desertAfterDark.location.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-velvet py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto">
              <span className={eyebrow}>{desertAfterDark.timeline.eyebrow}</span>
              <h2 className={h2}>{desertAfterDark.timeline.headline}</h2>
              <p className={body}>{desertAfterDark.timeline.intro}</p>
            </div>
          </FadeIn>
          <ol className="grid md:grid-cols-2 gap-6 md:gap-8">
            {desertAfterDark.timeline.acts.map((act, i) => (
              <FadeIn key={act.title} delay={i * 100}>
                <li className={`${rule} pt-5 md:pt-6 flex flex-col gap-3 h-full`}>
                  <div className="flex items-baseline gap-3">
                    <span className={`font-serif text-xl ${ACT_COLORS[i % ACT_COLORS.length]}`}>
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-bone leading-tight">
                      {act.title}
                    </h3>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-rosewood">
                    {act.time}
                  </span>
                  <p className="text-bone/80 leading-relaxed">{act.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="relative overflow-hidden bg-velvet-deep py-20 md:py-32 px-6 md:px-10">
        <div className={glow} aria-hidden />
        <div className="relative max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-5 mb-10 md:mb-12 text-center">
              <span className={eyebrow}>{desertAfterDark.apply.eyebrow}</span>
              <h2 className={h2}>{desertAfterDark.apply.headline}</h2>
              <p className={body}>{desertAfterDark.apply.subhead}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
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
