import Image from "next/image";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Three equal photos under a centred intro, then the quote in its own black
// band (Figma: Scenes from the Last Gathering). On phones the photos become a
// swipeable row with the second tile peeking in from the right.
export function EventGallery() {
  const { eyebrow, intro, label, photos, caption, location } = home.gallery;
  return (
    <>
      <section className="bg-pearl pt-16 md:pt-[112px] pb-8 md:pb-10 px-6 md:px-10 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-[820px] mx-auto">
              <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
                {eyebrow}
              </span>
              <p className="mt-4 text-base md:text-[17px] leading-[1.5] text-ink/75">{intro}</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <ul className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
              {photos.map((p) => (
                <li
                  key={p.src}
                  className="relative snap-start shrink-0 w-[78vw] sm:w-auto aspect-[6/5] overflow-hidden rounded-sm bg-[#383029]"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 640px) 384px, 78vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="mt-7 text-center text-[13px] uppercase tracking-[0.08em] text-ink/60">
              {label}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mt-8 md:mt-14 bg-noir px-6 md:px-10 py-24 md:py-[128px]">
        <div className="max-w-[880px] mx-auto text-center">
          <FadeIn>
            <p className="font-serif italic text-xl sm:text-2xl md:text-[30px] leading-[1.35] text-bone">
              &ldquo;{caption}&rdquo;
            </p>
            <p className="mt-10 md:mt-12 text-xs uppercase tracking-[0.12em] text-bone/60">
              {location}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
