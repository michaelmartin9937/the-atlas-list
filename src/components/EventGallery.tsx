import Image from "next/image";
import { home } from "@/content/home";
import { EditorialCarousel } from "./EditorialCarousel";
import { FadeIn } from "./FadeIn";
import { Eyebrow, SectionHeader, container } from "./editorial";

// Figma "In our words" + "Scenes from the last gathering": the quote over a
// dimmed photo, then the four-up strip with its progress row.
export function EventGallery() {
  const { quote, gallery } = home;
  return (
    <>
      <section className="relative overflow-hidden bg-[#140605] text-bone">
        <Image src={quote.image} alt="" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140605]/80 via-[#140605]/40 to-[#140605]/60" aria-hidden />
        <div className={`relative ${container} py-24 md:py-[150px]`}>
          <FadeIn>
            <Eyebrow n={3} tone="dark">
              {quote.eyebrow}
            </Eyebrow>
            <p className="mt-9 max-w-[1000px] font-serif italic text-[1.9rem] sm:text-4xl md:text-[52px] leading-[1.15]">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/70">{quote.location}</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-night text-bone pt-20 md:pt-[112px] pb-20 md:pb-[112px] overflow-hidden">
        <div className={container}>
          <FadeIn>
            <SectionHeader
              n={4}
              eyebrow={gallery.eyebrow}
              tone="dark"
              title={
                <>
                  {gallery.headline.before}
                  <em className="italic">{gallery.headline.em}</em>
                </>
              }
              intro={gallery.intro}
            />
          </FadeIn>
          <FadeIn delay={120}>
            <EditorialCarousel images={gallery.photos} tone="dark" caption={gallery.caption} className="mt-12 md:mt-16" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
