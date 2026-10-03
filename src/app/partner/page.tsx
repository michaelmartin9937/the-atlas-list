import type { Metadata } from "next";
import Image from "next/image";
import { EditorialHero } from "@/components/EditorialHero";
import { EditorialCarousel } from "@/components/EditorialCarousel";
import { PartnerForm } from "@/components/PartnerForm";
import { FadeIn } from "@/components/FadeIn";
import { ArrowLink, Button, Display, Eyebrow, Numeral, SectionHeader, container } from "@/components/editorial";
import { partner } from "@/content/partner";

export const metadata: Metadata = {
  title: "Partner",
  description: partner.hero.subhead,
};

// Figma "04 — Partners" (Oct 2026): photo hero, four photo cards, the
// audience band, three tier cards, category chips, sponsor tiles, the
// inquiry form on dark, and a closing photo strip.
export default function PartnerPage() {
  const p = partner;
  return (
    <>
      <EditorialHero
        eyebrowLines={p.hero.eyebrowLines}
        title={
          <>
            {p.hero.headline.before}
            <em className="italic">{p.hero.headline.em}</em>
          </>
        }
        issue={p.hero.issue}
        railRight={p.hero.rail}
        image={p.hero.image}
        imagePosition="object-[center_40%]"
      >
        <p className="mt-8 md:mt-10 max-w-[460px] text-[16px] md:text-[17px] leading-[1.6] text-bone/85">{p.hero.subhead}</p>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <Button href="#inquire" variant="cream">
            {p.hero.cta}
          </Button>
          <ArrowLink href={p.hero.secondary.href} tone="dark">
            {p.hero.secondary.label}
          </ArrowLink>
        </div>
      </EditorialHero>

      {/* 01 — Why partner */}
      <section className="bg-cream py-20 md:py-[112px]">
        <div className={container}>
          <FadeIn>
            <SectionHeader n={1} eyebrow={p.why.eyebrow} title={p.why.headline} intro={p.why.intro} />
          </FadeIn>
          <ol className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {p.why.points.map((pt, i) => (
              <FadeIn key={pt.title} delay={i * 90} className="h-full">
                <li className="relative aspect-[3/4] overflow-hidden bg-night text-bone">
                  <Image src={pt.image} alt={pt.alt} fill sizes="(min-width: 768px) 300px, 50vw" className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <Numeral n={i + 1} className="!text-bone text-[34px]" />
                    <h3 className="mt-3 font-condensed uppercase text-[19px] leading-[1.05] tracking-[0.03em]">{pt.title}</h3>
                    <span className="mt-3 block h-px w-full bg-bone/30" aria-hidden />
                    <p className="mt-3 text-[13px] leading-[1.55] text-bone/80">{pt.body}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* 02 — The audience */}
      <section className="bg-night text-bone py-20 md:py-[112px]">
        <div className={`${container} grid gap-12 md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] md:gap-20 md:items-center`}>
          <FadeIn>
            <div className="relative aspect-[560/600] overflow-hidden bg-[#1A1716]">
              <Image src={p.audience.image.src} alt={p.audience.image.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <Eyebrow n={2} tone="dark">
              {p.audience.eyebrow}
            </Eyebrow>
            <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10">
              {p.audience.headline}
            </Display>
            <p className="mt-7 max-w-[540px] text-[15px] leading-[1.65] text-bone/70">{p.audience.body}</p>
            <dl className="mt-10 grid grid-cols-3 border-t border-b border-hairline-dark">
              {p.audience.stats.map((s, i) => (
                <div key={s.label} className={`py-7 text-center ${i > 0 ? "border-l border-hairline-dark" : ""}`}>
                  <dd className="font-serif uppercase text-[28px] md:text-[44px] leading-none text-bone">{s.value}</dd>
                  <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/55">{s.label}</dt>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* 03 — Available partnerships */}
      <section className="bg-cream py-20 md:py-[112px]">
        <div className={container}>
          <FadeIn>
            <SectionHeader n={3} eyebrow={p.tiers.eyebrow} title={p.tiers.headline} intro={p.tiers.intro} />
          </FadeIn>
          <FadeIn delay={80}>
            <div className="mt-12 md:mt-14 flex items-center justify-between gap-6 border border-hairline px-6 h-14 font-mono text-[10px] uppercase tracking-[0.24em]">
              <span className="text-noir">{p.tiers.closed.label}</span>
              <span className="text-coral">{p.tiers.closed.status}</span>
            </div>
          </FadeIn>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {p.tiers.list.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 100} className="h-full">
                <li className={`h-full p-7 md:p-8 flex flex-col ${tier.featured ? "border border-coral bg-cream" : "bg-blush"}`}>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-coral">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-serif uppercase text-[24px] md:text-[26px] leading-[1.05] text-noir">{tier.name}</h3>
                  <p className="mt-4 font-serif text-[40px] md:text-[44px] leading-none text-coral">{tier.price}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">{tier.tagline}</p>
                  <span className="mt-5 h-px w-full bg-noir/30" aria-hidden />
                  <ul className="mt-6 flex flex-col gap-3 text-[14px] leading-[1.5] text-ink/80">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex gap-3">
                        <span className="text-coral" aria-hidden>
                          –
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href="#inquire" variant="outline-light" className="!h-11 !px-5">
                      {p.tiers.cta}
                    </Button>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Categories */}
      <section className="bg-cream pb-20 md:pb-[112px]">
        <div className={container}>
          <FadeIn>
            <Eyebrow n={4}>{p.categories.eyebrow}</Eyebrow>
            <Display as="h2" size="lg" className="mt-8 md:mt-10 max-w-[760px]">
              {p.categories.headline}
            </Display>
          </FadeIn>
          <ul className="mt-10 flex flex-wrap gap-3">
            {p.categories.list.map((c) => (
              <li key={c} className="rounded-full border border-noir/50 px-7 h-[52px] inline-flex items-center font-serif text-[18px] md:text-[20px] text-noir">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Our sponsors */}
      <section className="bg-cream pb-20 md:pb-[112px]">
        <div className={container}>
          <FadeIn>
            <SectionHeader n={5} eyebrow={p.sponsors.eyebrow} title={p.sponsors.headline} intro={p.sponsors.intro} />
          </FadeIn>
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
            {p.sponsors.list.map((s) => (
              <li
                key={s.name}
                className={`aspect-[4/3] flex items-center justify-center overflow-hidden ${
                  "placeholder" in s && s.placeholder ? "border border-dashed border-noir/40" : "bg-white"
                }`}
              >
                {"placeholder" in s && s.placeholder ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">Your logo here</span>
                ) : "badge" in s && s.badge ? (
                  <Image src={s.image} alt={s.name} width={120} height={120} unoptimized className="h-28 w-28" />
                ) : (
                  <Image src={s.image} alt={s.name} width={300} height={225} className="h-full w-full object-cover" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Partnership inquiries */}
      <section id="inquire" className="bg-night text-bone py-20 md:py-[120px]">
        <div className={`${container} grid gap-14 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-20`}>
          <FadeIn>
            <Eyebrow n={6} tone="dark">
              {p.inquiries.eyebrow}
            </Eyebrow>
            <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10">
              {p.inquiries.headline}
            </Display>
            <p className="mt-7 text-[15px] leading-[1.65] text-bone/70">{p.inquiries.subhead}</p>
          </FadeIn>
          <FadeIn delay={150}>
            {/* The inquiry form is unchanged; it keeps its light fields on a cream panel. */}
            <div className="bg-cream text-noir p-6 md:p-10">
              <PartnerForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 07 — What's in store */}
      <section className="bg-night text-bone pb-20 md:pb-[112px] overflow-hidden">
        <div className={container}>
          <FadeIn>
            <Eyebrow n={7} tone="dark">
              {p.store.eyebrow}
            </Eyebrow>
            <Display as="h2" size="lg" tone="dark" className="mt-8 md:mt-10">
              {p.store.headline}
            </Display>
          </FadeIn>
          <FadeIn delay={120}>
            <EditorialCarousel images={p.store.images} tone="dark" caption={p.store.caption} className="mt-12 md:mt-14" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
