import type { Metadata } from "next";
import { VslHero } from "@/components/VslHero";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { InstagramLink } from "@/components/InstagramLink";
import { Avatar } from "@/components/Avatar";
import { fashionShow } from "@/content/fashion-show";

const shareTitle = "Desert After Dark · October 10";
const shareDescription =
  "The Atlas List presents Desert After Dark — a private-residence fashion show and mansion party in Paradise Valley, October 10, 2026. Featured designers, hand-picked models, top-shelf DJs — allocated by application.";

// Dedicated share card: the root layout's openGraph block is otherwise
// inherited wholesale, which made links to this page preview as the home
// page. Relative URLs resolve against metadataBase (www.theatlaslist.club).
export const metadata: Metadata = {
  title: shareTitle,
  description: shareDescription,
  alternates: { canonical: "/fashion-show" },
  openGraph: {
    title: `${shareTitle} · The Atlas List`,
    description: shareDescription,
    url: "/fashion-show",
    siteName: "The Atlas List",
    type: "website",
    images: [
      {
        url: "/images/og-fashion-show.jpg",
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
    images: ["/images/og-fashion-show.jpg"],
  },
};

export default function FashionShowPage() {
  return (
    <>
      <VslHero
        eyebrow={fashionShow.hero.eyebrow}
        headline={fashionShow.hero.headline}
        subhead={fashionShow.hero.subhead}
        cta={{ label: fashionShow.hero.cta, href: "#apply" }}
        videoSrc="/videos/atlas-house-promo.mp4"
        posterSrc="/images/atlas-house-promo-poster.jpg"
        aspect="portrait"
      />

      <section className="bg-bone py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 md:gap-8">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-bronze">
              {fashionShow.pitch.eyebrow}
            </span>
          </FadeIn>
          <FadeIn delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir leading-tight">
              {fashionShow.pitch.headline}
            </h2>
          </FadeIn>
          <FadeIn delay={140}>
            <div className="flex flex-col gap-5 mt-2">
              {fashionShow.pitch.body.map((p, i) => (
                <p key={i} className="text-ink/85 leading-relaxed text-base md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Designers — equal billing: identical tiles, alphabetical, 3x2 grid so
          nobody is stranded alone on a row at any breakpoint. */}
      <section className="bg-pearl py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-bronze">
                {fashionShow.designers.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir leading-tight">
                {fashionShow.designers.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed text-base md:text-lg">
                {fashionShow.designers.intro}
              </p>
              <p className="text-xs uppercase tracking-widest text-taupe">
                {fashionShow.designers.note}
              </p>
            </div>
          </FadeIn>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10">
            {fashionShow.designers.list.map((d, i) => (
              <FadeIn key={d.handle} delay={i * 80}>
                <li className="border-t border-bronze/40 pt-5 md:pt-6 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-4">
                    <Avatar name={d.name} image={d.image} />
                    <span className="font-serif text-2xl text-noir leading-tight">
                      {d.name}
                    </span>
                  </div>
                  <InstagramLink handle={d.handle} label={`${d.name} on Instagram`} />
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <span className="text-xs uppercase tracking-widest text-bronze">
                {fashionShow.models.eyebrow}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-noir leading-tight">
                {fashionShow.models.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed">
                {fashionShow.models.intro}
              </p>
              <div className="border-t border-bronze/40 pt-5 mt-2">
                <p className="font-serif italic text-lg text-taupe">
                  {fashionShow.models.tbd}
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-col gap-5">
              <span className="text-xs uppercase tracking-widest text-bronze">
                {fashionShow.djs.eyebrow}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-noir leading-tight">
                {fashionShow.djs.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed">
                {fashionShow.djs.intro}
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                {fashionShow.djs.list.map((dj) => (
                  <li
                    key={dj.handle}
                    className="border-t border-bronze/40 pt-4 flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-serif text-2xl text-noir">{dj.name}</span>
                      {dj.note && (
                        <span className="text-sm text-ink/70">{dj.note}</span>
                      )}
                    </div>
                    <InstagramLink handle={dj.handle} label={`${dj.name} on Instagram`} />
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Production team credits, with a slot ready for hair & makeup. */}
      <section className="bg-pearl py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-bronze">
                {fashionShow.team.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir leading-tight">
                {fashionShow.team.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed text-base md:text-lg">
                {fashionShow.team.intro}
              </p>
            </div>
          </FadeIn>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10">
            {fashionShow.team.people.map((p, i) => (
              <FadeIn key={p.handle} delay={i * 80}>
                <li className="border-t border-bronze/40 pt-5 md:pt-6 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-4">
                    <Avatar name={p.name} image={p.image} />
                    <div className="flex flex-col gap-1.5">
                      <span className="font-serif text-2xl text-noir leading-tight">
                        {p.name}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-taupe">
                        {p.title}
                      </span>
                    </div>
                  </div>
                  <InstagramLink handle={p.handle} label={`${p.name} on Instagram`} />
                </li>
              </FadeIn>
            ))}
            <FadeIn delay={fashionShow.team.people.length * 80}>
              <li className="border-t border-taupe/40 pt-5 md:pt-6 flex flex-col gap-1.5 h-full">
                <span className="font-serif text-2xl md:text-3xl text-noir leading-tight">
                  {fashionShow.team.hairMakeup.title}
                </span>
                <span className="font-serif italic text-lg text-taupe">
                  {fashionShow.team.hairMakeup.tbd}
                </span>
              </li>
            </FadeIn>
          </ul>
        </div>
      </section>

      <section className="bg-noir py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-5 md:gap-6">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-bronze">
              {fashionShow.location.eyebrow}
            </span>
          </FadeIn>
          <FadeIn delay={80}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-bone leading-tight">
              {fashionShow.location.headline}
            </h2>
          </FadeIn>
          <FadeIn delay={140}>
            <p className="text-bone/75 leading-relaxed text-base md:text-lg">
              {fashionShow.location.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-pearl py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-bronze">
                {fashionShow.timeline.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir leading-tight">
                {fashionShow.timeline.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed text-base md:text-lg">
                {fashionShow.timeline.intro}
              </p>
            </div>
          </FadeIn>
          <ol className="grid md:grid-cols-2 gap-6 md:gap-8">
            {fashionShow.timeline.acts.map((act, i) => (
              <FadeIn key={act.title} delay={i * 100}>
                <li className="border-t border-bronze/40 pt-5 md:pt-6 flex flex-col gap-3 h-full">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-bronze text-xl">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-noir leading-tight">
                      {act.title}
                    </h3>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-taupe">
                    {act.time}
                  </span>
                  <p className="text-ink/80 leading-relaxed">{act.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="bg-bone py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-5 mb-10 md:mb-12 text-center">
              <span className="text-xs uppercase tracking-widest text-bronze">
                {fashionShow.apply.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-noir leading-tight">
                {fashionShow.apply.headline}
              </h2>
              <p className="text-ink/80 leading-relaxed text-base md:text-lg">
                {fashionShow.apply.subhead}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <ApplicationForm
              sourcePage="fashion-show"
              submitLabel="Request Ticket Allocation"
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
