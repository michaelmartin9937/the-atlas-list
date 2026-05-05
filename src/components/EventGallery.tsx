import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

const tiles = [
  { src: "/images/event-1.jpg", className: "row-span-2", alt: "Stylish guest at the rooftop gathering" },
  { src: "/images/event-2.jpg", className: "", alt: "Group conversation at golden hour" },
  { src: "/images/event-3.jpg", className: "", alt: "Editorial portrait, evening lighting" },
  { src: "/images/event-4.jpg", className: "col-span-2", alt: "Indoor lounge gathering" },
];

export function EventGallery() {
  const { eyebrow, intro, caption, location } = home.gallery;
  return (
    <section className="bg-pearl py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
            <p className="text-ink/85 leading-relaxed text-lg">{intro}</p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 h-[500px] md:h-[600px]">
            {tiles.map((tile) => (
              <div
                key={tile.src}
                className={`bg-cover bg-center bg-taupe/30 ${tile.className}`}
                style={{ backgroundImage: `url(${tile.src})` }}
                role="img"
                aria-label={tile.alt}
              />
            ))}
          </div>
          <div className="text-center mt-10 max-w-2xl mx-auto flex flex-col gap-3">
            <p className="font-serif italic text-xl md:text-2xl text-noir leading-snug">
              "{caption}"
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
