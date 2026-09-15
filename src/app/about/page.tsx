import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { HostCards } from "@/components/HostCards";
import { PhotoGrid } from "@/components/PhotoGrid";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.subhead,
};

// Figma: "Atlas List — About (New)" — hero, founders, the standard, a quote
// band, the application form, a photo grid.
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        headline={about.hero.headline}
        subhead={about.hero.subhead}
      />

      <HostCards />

      <section className="bg-pearl px-6 md:px-10 py-20 md:py-[120px]">
        <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <FadeIn className="w-full flex flex-col items-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
              {about.standard.eyebrow}
            </span>
            <h2 className="mt-6 max-w-[980px] font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.18] text-noir">
              {about.standard.headline}
            </h2>
            <p className="mt-7 max-w-[660px] text-base md:text-[17px] leading-[1.5] text-ink/70">
              {about.standard.body}
            </p>
            <p className="mt-12 md:mt-14 font-serif italic text-lg md:text-xl text-taupe">
              {about.standard.note}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-noir px-6 md:px-10 py-24 md:py-[160px]">
        <div className="max-w-[860px] mx-auto text-center">
          <FadeIn>
            <p className="font-serif italic text-2xl sm:text-3xl md:text-[40px] leading-[1.25] text-bone">
              {about.quote}
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="apply" className="bg-pearl px-6 md:px-10 pt-20 md:pt-[112px] pb-20 md:pb-[96px]">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
                {about.apply.eyebrow}
              </span>
              <h2 className="mt-5 font-serif text-4xl md:text-[44px] leading-[1.1] text-noir">
                {about.apply.headline}
              </h2>
              <p className="mt-5 text-base md:text-[17px] leading-[1.5] text-ink/70">
                {about.apply.subhead}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="mt-12 md:mt-14">
            <ApplicationForm sourcePage="about" submitLabel="Request Ticket Allocation" />
          </FadeIn>
        </div>
      </section>

      <PhotoGrid photos={about.gallery} />
    </>
  );
}
