import type { Metadata } from "next";
import Image from "next/image";
import { EditorialHero } from "@/components/EditorialHero";
import { EditorialCarousel } from "@/components/EditorialCarousel";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { BackToTop, Display, Eyebrow, Note, SectionHeader, container } from "@/components/editorial";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.subhead,
};

// Figma "02 — About" (Oct 2026): photo hero, the two hosts, the feeling
// quote over a dimmed photo, the standard with three stats, the application.
export default function AboutPage() {
  const a = about;
  return (
    <>
      <EditorialHero
        eyebrowLines={a.hero.eyebrowLines}
        title={a.hero.headline}
        issue={a.hero.issue}
        image={a.hero.image}
        imagePosition="object-[center_30%]"
      >
        <p className="mt-8 md:mt-10 max-w-[420px] text-[16px] md:text-[17px] leading-[1.6] text-bone/85">{a.hero.subhead}</p>
      </EditorialHero>

      {/* 01 — The founders */}
      <section className="bg-cream py-20 md:py-[112px]">
        <div className={container}>
          <FadeIn>
            <SectionHeader n={1} eyebrow={a.hosts.eyebrow} title={a.hosts.headline} intro={a.hosts.intro} />
          </FadeIn>
          <div className="mt-12 md:mt-16 grid gap-12 md:grid-cols-2 md:gap-6">
            {a.hosts.people.map((p, i) => (
              <FadeIn key={p.name} delay={i * 120}>
                <figure>
                  <div className="relative aspect-[580/560] overflow-hidden bg-[#2B1F1A]">
                    <Image
                      src={p.image}
                      alt={`${p.name}, co-founder of The Atlas List`}
                      fill
                      sizes="(min-width: 768px) 580px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/55">
                      {p.role}
                      <span className="mx-3" aria-hidden>
                        ·
                      </span>
                      @{p.handle}
                    </span>
                    <Display as="h3" size="md" className="mt-4">
                      {p.name}
                    </Display>
                    <p className="mt-5 max-w-[520px] text-[15px] leading-[1.65] text-ink/70">{p.bio}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — The feeling */}
      <section className="relative overflow-hidden bg-[#140605] text-bone">
        <Image src={a.feeling.image} alt="" fill sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140605]/80 via-[#140605]/40 to-[#140605]/50" aria-hidden />
        <div className={`relative ${container} py-24 md:py-[140px]`}>
          <FadeIn>
            <Eyebrow n={2} tone="dark">
              {a.feeling.eyebrow}
            </Eyebrow>
            <p className="mt-9 max-w-[1000px] font-sans font-semibold text-[1.6rem] sm:text-3xl md:text-[40px] leading-[1.25]">
              &ldquo;<em className="italic">{a.feeling.lead}</em> {a.feeling.quote}&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 03 — The standard */}
      <section className="bg-cream py-20 md:py-[112px]">
        <div className={container}>
          <FadeIn>
            <Eyebrow n={3}>{a.standard.eyebrow}</Eyebrow>
            <Display as="h2" size="lg" className="mt-8 md:mt-10 max-w-[1180px]">
              {a.standard.headline}
            </Display>
          </FadeIn>
          <div className="mt-12 md:mt-16 grid gap-12 md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] md:gap-20 md:items-start">
            <FadeIn>
              <div className="relative aspect-[560/650] overflow-hidden bg-hairline/40">
                <Image src={a.standard.image.src} alt={a.standard.image.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <p className="max-w-[520px] text-[17px] leading-[1.6] text-ink/75">{a.standard.body}</p>
              <dl className="mt-10 grid grid-cols-3 border-t border-b border-hairline">
                {a.standard.stats.map((s, i) => (
                  <div key={s.label} className={`py-7 text-center ${i > 0 ? "border-l border-hairline" : ""}`}>
                    <dd className="font-serif text-[40px] md:text-[56px] leading-none text-noir">{s.value}</dd>
                    <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/55">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-10 font-serif italic text-[22px] md:text-[26px] leading-[1.3] text-noir">{a.standard.note}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 04 — From the room */}
      <section className="bg-night text-bone py-20 md:py-[112px] overflow-hidden">
        <div className={container}>
          <FadeIn>
            <Eyebrow n={4} tone="dark">
              {a.gallery.eyebrow}
            </Eyebrow>
          </FadeIn>
          <FadeIn delay={120}>
            <EditorialCarousel images={a.gallery.images} tone="dark" caption={a.gallery.caption} aspect="landscape" className="mt-10 md:mt-12" />
          </FadeIn>
        </div>
      </section>

      {/* 05 — Apply */}
      <section id="apply" className="bg-night text-bone pt-4 pb-20 md:pb-[120px]">
        <div className={`${container} grid gap-14 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-20`}>
          <FadeIn>
            <Eyebrow n={5} tone="dark">
              {a.apply.eyebrow}
            </Eyebrow>
            <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10">
              {a.apply.headline}
            </Display>
            <p className="mt-7 text-[15px] leading-[1.65] text-bone/70">{a.apply.subhead}</p>
            <div className="mt-10 flex flex-col gap-8">
              {a.apply.notes.map((n) => (
                <Note key={n.label} label={n.label}>
                  {n.text}
                </Note>
              ))}
            </div>
            <div className="hidden md:block mt-16">
              <BackToTop />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            {/* Same extended application as the Desert After Dark page. */}
            <ApplicationForm sourcePage="about" submitLabel="Request Ticket Allocation" variant="extended" tone="dark" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
