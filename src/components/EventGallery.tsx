import Image from "next/image";
import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

type Tile = {
  src: string;
  width: number;
  height: number;
  alt: string;
  desktopClass: string;
};

const tiles: Tile[] = [
  {
    src: "/images/event-1.jpg",
    width: 800,
    height: 1600,
    alt: "Stylish guest at the rooftop gathering",
    desktopClass: "row-span-2",
  },
  {
    src: "/images/event-2.jpg",
    width: 1200,
    height: 1200,
    alt: "Group conversation at golden hour",
    desktopClass: "",
  },
  {
    src: "/images/event-3.jpg",
    width: 1200,
    height: 1200,
    alt: "Editorial portrait, evening lighting",
    desktopClass: "",
  },
  {
    src: "/images/event-4.jpg",
    width: 2000,
    height: 1000,
    alt: "Indoor lounge gathering",
    desktopClass: "col-span-2",
  },
];

export function EventGallery() {
  const { eyebrow, intro, caption, location } = home.gallery;
  return (
    <section className="bg-pearl py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
            <p className="text-ink/85 leading-relaxed text-base md:text-lg">
              {intro}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          {/* Mobile: stacked single column, each image at its native aspect — nothing cropped. */}
          <div className="flex flex-col gap-3 md:hidden">
            {tiles.map((tile) => (
              <Image
                key={tile.src}
                src={tile.src}
                width={tile.width}
                height={tile.height}
                alt={tile.alt}
                sizes="100vw"
                className="w-full h-auto bg-taupe/20"
              />
            ))}
          </div>

          {/* Tablet+: editorial magazine grid. */}
          <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[600px]">
            {tiles.map((tile) => (
              <div
                key={tile.src}
                className={`relative overflow-hidden bg-taupe/30 ${tile.desktopClass}`}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1280px) 33vw, 40vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 max-w-2xl mx-auto flex flex-col gap-3">
            <p className="font-serif italic text-xl md:text-2xl text-noir leading-snug">
              &ldquo;{caption}&rdquo;
            </p>
            <p className="text-xs uppercase tracking-widest text-taupe">
              {location}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
