import { home } from "@/content/home";
import { FadeIn } from "./FadeIn";

const tiles = [
  { src: "/images/event-1.jpg", className: "row-span-2", alt: "Rooftop sunset" },
  { src: "/images/event-2.jpg", className: "", alt: "Group conversation" },
  { src: "/images/event-3.jpg", className: "", alt: "Cocktails at golden hour" },
  { src: "/images/event-4.jpg", className: "col-span-2", alt: "Scottsdale skyline at dusk" },
];

export function EventGallery() {
  const { eyebrow, caption } = home.gallery;
  return (
    <section className="bg-pearl py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-bronze">
              {eyebrow}
            </span>
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
          <p className="text-center text-xs uppercase tracking-widest text-taupe mt-8">
            {caption}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
