import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your application is in.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-bone min-h-[80vh] flex items-center px-6 md:px-10 pt-32 pb-24">
      <div className="max-w-prose mx-auto text-center flex flex-col gap-8">
        <span className="text-xs uppercase tracking-widest text-bronze">
          Application Received
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-noir leading-tight">
          Your application is in.
        </h1>
        <p className="text-ink/85 text-lg leading-relaxed">
          We read every one personally. If it feels like a fit, you'll hear from us within two
          weeks.
        </p>
        <p className="font-serif italic text-xl text-ink mt-2">— Devaun &amp; Michael</p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-widest text-noir border-b border-bronze pb-1 hover:text-bronze transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
