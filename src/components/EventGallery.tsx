import Image from "next/image";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

// Three equal photos in a row, then the label / quote / location
// (Figma: Scenes from the Last Gathering — 384×320 tiles on a 1200 grid).
const photos = [
  { src: "/images/event-2.jpg", alt: "Two guests in conversation with the skyline behind" },
  { src: "/images/event-3.jpg", alt: "Guests greeting each other" },
  { src: "/images/event-4.jpg", alt: "The lounge at golden hour" },
];

export function EventGallery() {
  const { eyebrow, intro, label, caption, location } = home.gallery;
  return (
    <section className="bg-pearl py-14 md:py-16 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center max-w-[820px] mx-auto">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
              {eyebrow}
            </span>
            <p className="mt-3 text-base leading-[1.5] text-ink/85">{intro}</p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <ul className="mt-9 grid gap-4 sm:grid-cols-3 md:gap-6">
            {photos.map((p) => (
              <li key={p.src} className="relative aspect-[6/5] overflow-hidden bg-sand/40">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover object-[center_35%]"
                />
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={160}>
          <div className="mt-6 text-center">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-ember">
              {label}
            </span>
            <p className="mt-6 max-w-[900px] mx-auto font-serif italic text-xl sm:text-2xl md:text-[30px] leading-[1.35] text-noir">
              &ldquo;{caption}&rdquo;
            </p>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-ink/60">
              {location}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
