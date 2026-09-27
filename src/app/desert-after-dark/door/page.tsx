import type { Metadata } from "next";
import { DoorForm } from "@/components/DoorForm";

// Day-of page for guests paying in person at Desert After Dark. Reached by
// the link or a QR code at the door only: it is not in the nav or footer,
// and search engines are told to leave it alone.
const TITLE = "Pay at Door";
const DESCRIPTION =
  "Desert After Dark, October 10 · The Atlas List. Add your details to be checked in, then see the host to pay.";

export const metadata: Metadata = {
  title: `${TITLE} · Desert After Dark`,
  description: DESCRIPTION,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  // Its own card (./opengraph-image.tsx) and title, so a texted link shows
  // what it opens instead of the generic event preview.
  openGraph: {
    title: `${TITLE} · Desert After Dark · The Atlas List`,
    description: DESCRIPTION,
    url: "/desert-after-dark/door",
    siteName: "The Atlas List",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${TITLE} · Desert After Dark · The Atlas List`, description: DESCRIPTION },
};

export default function DoorPage() {
  return (
    <section className="relative overflow-hidden bg-velvet px-5 md:px-10 pt-12 md:pt-20 pb-24 min-h-[80vh]">
      <div
        className="absolute inset-x-0 top-0 h-[420px] pointer-events-none bg-[radial-gradient(ellipse_45%_50%_at_50%_0%,rgba(164,62,120,0.22),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[520px]">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gold">
          Desert After Dark · October 10
        </span>
        <h1 className="mt-4 font-serif text-[40px] md:text-[52px] leading-[1.05] text-bone">
          Pay at Door
        </h1>
        <p className="mt-4 text-[17px] leading-[1.5] text-velvet-text">
          A few quick details and you&rsquo;re on the list. Then see the host to pay and come in.
        </p>
        <div className="mt-10">
          <DoorForm />
        </div>
      </div>
    </section>
  );
}
