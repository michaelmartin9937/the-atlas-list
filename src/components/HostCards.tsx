import Image from "next/image";
import { about } from "@/content/about";
import { FadeIn } from "./FadeIn";

// Figma: "The Founders" — centred heading, then two 580×460 portraits with
// the name set large beneath and a short bio.
export function HostCards() {
  const { eyebrow, headline, people } = about.hosts;
  return (
    <section className="bg-pearl px-6 md:px-10 pt-16 md:pt-[78px] pb-20 md:pb-[120px]">
      <div className="max-w-[1280px] mx-auto">
        <FadeIn>
          <div className="text-center flex flex-col items-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
              {eyebrow}
            </span>
            <h2 className="mt-5 font-serif text-4xl md:text-[52px] leading-[1.1] text-noir">
              {headline}
            </h2>
          </div>
        </FadeIn>

        <div className="mt-12 md:mt-[52px] grid md:grid-cols-2 gap-10 md:gap-10">
          {people.map((person, i) => (
            <FadeIn key={person.name} delay={i * 120}>
              <figure className="flex flex-col">
                <div className="relative aspect-[580/460] overflow-hidden rounded bg-[#383029]">
                  <Image
                    src={person.image}
                    alt={`${person.name}, co-founder of The Atlas List`}
                    fill
                    sizes="(min-width: 768px) 580px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-8 md:mt-10 flex flex-col">
                  <h3 className="font-serif text-4xl md:text-[52px] leading-none text-noir">
                    {person.name}
                  </h3>
                  <p className="mt-6 md:mt-8 text-[15px] leading-[1.5] text-ink/70">
                    {person.bio}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
