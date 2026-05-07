import Image from "next/image";
import { about } from "@/content/about";
import { FadeIn } from "./FadeIn";

export function Hosts() {
  const { heading, intro, people } = about.hosts;
  return (
    <section className="bg-bone py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="max-w-prose mx-auto text-center mb-12 md:mb-20 flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest text-bronze">
              The Founders
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-noir leading-tight">
              {heading}
            </h2>
            <p className="text-ink/80 leading-relaxed text-base md:text-lg">
              {intro}
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
          {people.map((person, i) => (
            <FadeIn key={person.name} delay={i * 120}>
              <figure className="flex flex-col gap-6">
                <div className="relative aspect-[4/5] overflow-hidden bg-taupe/30">
                  <Image
                    src={person.image}
                    alt={`${person.name}, co-founder of The Atlas List`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="flex flex-col gap-3 text-center">
                  <h3 className="font-serif text-3xl text-noir">{person.name}</h3>
                  <p className="text-ink/75 leading-relaxed text-base max-w-sm mx-auto">
                    {person.tagline}
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
