import type { Metadata } from "next";
import { terms } from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of The Atlas List website and events.",
};

export default function TermsPage() {
  return (
    <article className="bg-bone pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
      <div className="max-w-prose mx-auto">
        <header className="mb-12">
          <span className="text-xs uppercase tracking-widest text-bronze">
            Terms of Service
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-noir mt-4 leading-tight">
            The terms behind the door.
          </h1>
          <p className="text-sm text-taupe mt-3">
            Effective {terms.effectiveDate}
          </p>
        </header>

        <p className="text-ink/85 text-lg leading-relaxed mb-12">
          {terms.intro}
        </p>

        <div className="flex flex-col gap-12">
          {terms.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl md:text-3xl text-noir mb-5 leading-tight">
                {section.heading}
              </h2>
              <div className="flex flex-col gap-4">
                {section.body.map((p, i) => (
                  <p key={i} className="text-ink/85 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
