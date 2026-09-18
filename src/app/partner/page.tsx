import type { Metadata } from "next";
import Image from "next/image";
import { PartnerForm } from "@/components/PartnerForm";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { FadeIn } from "@/components/FadeIn";
import { partner } from "@/content/partner";

export const metadata: Metadata = {
  title: "Partner",
  description: partner.hero.subhead,
};

const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.08em] text-gold";

// Figma: "Sponsorship — Atlas List" (Sep 2026). Photo hero, four reasons, an
// audience band with three stats, three partnership tiers, category chips,
// current sponsors, the inquiry form, and a closing photo strip.
export default function PartnerPage() {
  const p = partner;
  return (
    <>
      <section className="relative overflow-hidden bg-umber">
        <Image
          src="/images/partner/hero-estate.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#12191F]/45" aria-hidden />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-24 md:pt-[220px] pb-16 md:pb-[64px] min-h-[460px] md:min-h-[560px] flex flex-col justify-end">
          <span className={eyebrow}>{p.hero.eyebrow}</span>
          <h1 className="mt-6 md:mt-7 max-w-[1200px] font-serif text-[2.6rem] sm:text-5xl md:text-[72px] leading-[1.06] text-bone">
            {p.hero.headline}
          </h1>
          <p className="mt-6 max-w-[1180px] text-base md:text-[19px] leading-[1.5] text-bone/85">
            {p.hero.subhead}
          </p>
        </div>
      </section>

      <section className="bg-pearl px-6 md:px-10 pt-20 md:pt-[100px] pb-20 md:pb-[112px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className={eyebrow}>{p.why.eyebrow}</span>
              <h2 className="mt-5 font-serif text-4xl md:text-[44px] leading-[1.1] text-noir">
                {p.why.headline}
              </h2>
            </div>
          </FadeIn>
          <ol className="mt-14 md:mt-[72px] grid sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10">
            {p.why.points.map((pt, i) => (
              <FadeIn key={pt.title} delay={i * 80}>
                <li className="flex flex-col">
                  <span className="font-serif text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-serif font-bold text-[22px] leading-[1.25] text-noir">
                    {pt.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-ink/70">{pt.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-noir px-6 md:px-10 py-20 md:py-[100px]">
        <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <FadeIn className="flex flex-col items-center">
            <span className={eyebrow}>{p.audience.eyebrow}</span>
            <h2 className="mt-5 font-serif text-4xl md:text-[44px] leading-[1.1] text-bone">
              {p.audience.headline}
            </h2>
            <p className="mt-6 max-w-[800px] text-base md:text-[17px] leading-[1.5] text-bone/85">
              {p.audience.body}
            </p>
          </FadeIn>
          <dl className="mt-14 md:mt-[72px] grid grid-cols-3 gap-8 w-full max-w-[900px]">
            {p.audience.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif font-bold text-3xl sm:text-4xl md:text-[48px] leading-none text-sand">
                  {s.value}
                </dd>
                <dd className="mt-3 text-sm md:text-[17px] text-bone">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-pearl px-6 md:px-10 py-20 md:py-[112px]">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className={eyebrow}>{p.tiers.eyebrow}</span>
              <h2 className="mt-5 font-serif text-4xl md:text-[48px] leading-[1.1] text-noir">
                {p.tiers.headline}
              </h2>
              <p className="mt-5 max-w-[780px] text-base md:text-[17px] leading-[1.5] text-ink/70">
                {p.tiers.intro}
              </p>
              <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.1em] text-ink/60">
                {p.tiers.note}
              </p>
            </div>
          </FadeIn>
          <ul className="mt-12 grid md:grid-cols-3 gap-7">
            {p.tiers.list.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 100} className="h-full">
                <li
                  className={`h-full rounded-lg p-9 flex flex-col ${
                    tier.featured ? "bg-[#C59C55] text-bone" : "bg-pearl border border-[#E4DAC7] text-noir"
                  }`}
                >
                  <h3 className="font-serif font-bold text-2xl md:text-[26px] leading-[1.25]">{tier.name}</h3>
                  <p
                    className={`mt-6 font-serif font-bold text-3xl md:text-[34px] leading-none ${
                      tier.featured ? "text-bone" : "text-[#C59C55]"
                    }`}
                  >
                    {tier.price}
                  </p>
                  <p className={`mt-6 italic text-base ${tier.featured ? "text-bone/90" : "text-ink/70"}`}>
                    {tier.tagline}
                  </p>
                  <ul className={`mt-6 flex flex-col gap-3 text-[15px] leading-[1.45] ${tier.featured ? "text-bone/95" : "text-ink/80"}`}>
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-noir px-6 md:px-10 py-20 md:py-[100px]">
        <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <FadeIn className="flex flex-col items-center">
            <span className={eyebrow}>{p.categories.eyebrow}</span>
            <h2 className="mt-5 font-serif text-4xl md:text-[44px] leading-[1.1] text-bone">
              {p.categories.headline}
            </h2>
          </FadeIn>
          <ul className="mt-12 flex flex-wrap justify-center gap-4 max-w-[760px]">
            {p.categories.list.map((c) => (
              <li
                key={c}
                className="rounded-full border border-sand px-6 h-12 inline-flex items-center text-base text-bone"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-noir px-6 md:px-10 pt-4 pb-20 md:pt-[60px] md:pb-[120px]">
        <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <FadeIn className="flex flex-col items-center">
            <span className={eyebrow}>{p.sponsors.eyebrow}</span>
            <h2 className="mt-5 font-serif text-4xl md:text-[52px] leading-[1.1] text-bone">
              {p.sponsors.headline}
            </h2>
            <p className="mt-5 text-base md:text-[17px] leading-[1.5] text-bone/70">{p.sponsors.intro}</p>
          </FadeIn>
          <ul className="mt-12 md:mt-14 flex flex-wrap justify-center gap-x-20 gap-y-10">
            {p.sponsors.list.map((s) => (
              <li key={s.name} className="flex flex-col items-center gap-4">
                <div className="h-32 w-[208px] flex items-center justify-center">
                  {s.image ? (
                    <Image src={s.image} alt={s.name} width={208} height={128} className="max-h-32 w-auto object-contain" />
                  ) : (
                    <div className="h-32 w-[208px]" aria-hidden />
                  )}
                </div>
                <span className="text-[15px] text-bone/70">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="inquire" className="bg-pearl px-6 md:px-10 pt-16 md:pt-[44px] pb-20 md:pb-[96px]">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className={eyebrow}>{p.inquiries.eyebrow}</span>
              <h2 className="mt-5 font-serif text-4xl md:text-[48px] leading-[1.1] text-noir">
                {p.inquiries.headline}
              </h2>
              <p className="mt-5 text-base md:text-[17px] leading-[1.5] text-ink/70">
                {p.inquiries.subhead}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="mt-12 md:mt-14">
            <PartnerForm />
          </FadeIn>
        </div>
      </section>

      <PhotoCarousel eyebrow={p.store.eyebrow} images={p.store.images} tone="dark" />
    </>
  );
}
