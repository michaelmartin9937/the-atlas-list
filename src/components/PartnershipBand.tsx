import type { ReactNode } from "react";
import { Button, Display, Eyebrow, container } from "./editorial";

type Headline = string | { before: string; em: string; after: string };

type Props = {
  eyebrow: string;
  headline: Headline;
  subhead: string;
  cta: string;
  href: string;
  // Cream band with a dark button (home), or a dark band with a coral one.
  tone?: "dark" | "light";
  n?: number;
};

function renderHeadline(h: Headline): ReactNode {
  if (typeof h === "string") return h;
  return (
    <>
      {h.before}
      <em className="italic">{h.em}</em>
      {h.after}
    </>
  );
}

// Figma "08 — Partnership": eyebrow, the headline with an italic accent, a
// one-line subhead, and the button sitting on the right.
export function PartnershipBand({ eyebrow, headline, subhead, cta, href, tone = "light", n = 9 }: Props) {
  const dark = tone === "dark";
  return (
    <section className={`${dark ? "bg-night text-bone" : "bg-cream"} py-20 md:py-[112px]`}>
      <div className={`${container} grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end`}>
        <div>
          <Eyebrow n={n} tone={dark ? "dark" : "light"}>
            {eyebrow}
          </Eyebrow>
          <Display as="h2" size="lg" tone={dark ? "dark" : "light"} className="mt-8 md:mt-10 max-w-[760px]">
            {renderHeadline(headline)}
          </Display>
          <p className={`mt-6 text-[16px] leading-[1.6] ${dark ? "text-bone/70" : "text-ink/70"}`}>{subhead}</p>
        </div>
        <Button href={href} variant={dark ? "coral" : "dark"} className="self-start md:self-end">
          {cta}
        </Button>
      </div>
    </section>
  );
}
