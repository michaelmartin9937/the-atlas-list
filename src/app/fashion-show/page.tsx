import type { Metadata } from "next";
import { VslHero } from "@/components/VslHero";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { fashionShow } from "@/content/fashion-show";

export const metadata: Metadata = {
  title: "October 10 · Fashion Show + Mansion Party",
  description:
    "A private-residence runway show and after-dark takeover in Paradise Valley. Featured designers, hand-picked models, top-shelf DJs — allocated by application.",
};

export default function FashionShowPage() {
  return (
    <>
      <VslHero
        eyebrow={fashionShow.hero.eyebrow}
        headline={fashionShow.hero.headline}
        subhead={fashionShow.hero.subhead}
        cta={{ label: fashionShow.hero.cta, href: "#apply" }}
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
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {fashionShow.designers.list.map((d, i) => (
              <FadeIn key={d.name} delay={i * 80}>
                <div className="border-t border-bronze/40 pt-5 md:pt-6 flex flex-col gap-2 h-full">
                  <span className="font-serif text-2xl md:text-3xl text-noir leading-tight">
                    {d.name}
                  </span>
                  {d.note && (
                    <span className="text-sm text-ink/70 leading-relaxed">
                      {d.note}
                    </span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
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
                    key={dj.name}
                    className="border-t border-bronze/40 pt-3 flex flex-col gap-1"
                  >
                    <span className="font-serif text-xl text-noir">{dj.name}</span>
                    {dj.note && (
                      <span className="text-sm text-ink/70">{dj.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
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
