import { home } from "@/content/home";
import { PhotoCarousel } from "./PhotoCarousel";
import { FadeIn } from "./FadeIn";

// Figma (Sep 26): "Scenes from the Last Gathering" is a carousel now — three
// 384×320 photos per view with dots and the tracked caption beneath — then
// the quote in its own black band. On phones one photo fills the width with
// the next peeking in.
export function EventGallery() {
  const { eyebrow, intro, label, photos, caption, location } = home.gallery;
  return (
    <>
      <div className="pt-4 md:pt-[48px]">
        <PhotoCarousel
          eyebrow={eyebrow}
          intro={intro}
          images={photos}
          tile="lg"
          center
          arrows={false}
          caption={label}
        />
      </div>

      <section className="mt-2 md:mt-6 bg-noir px-6 md:px-10 py-24 md:py-[128px]">
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
