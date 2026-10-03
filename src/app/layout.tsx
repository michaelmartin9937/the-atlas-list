import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Oswald, Playfair_Display } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AttributionCapture } from "@/components/AttributionCapture";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display serif — matches the Figma redesign and the badge logo.
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// Editorial redesign (Figma, Oct 2026): tracked mono eyebrows and labels…
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// …and condensed uppercase card titles.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theatlaslist.club"),
  title: {
    default: "The Atlas List — Private Gatherings in Scottsdale",
    template: "%s · The Atlas List",
  },
  description:
    "An invitation-only social circle for women in Scottsdale, AZ. Curated gatherings, private rooms, no fees — only the right room.",
  openGraph: {
    title: "The Atlas List",
    description:
      "An invitation-only social circle for women in Scottsdale, AZ. Curated gatherings, private rooms, no fees — only the right room.",
    url: "https://www.theatlaslist.club",
    siteName: "The Atlas List",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Atlas List",
    description: "An invitation-only social circle for women in Scottsdale, AZ.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${plexMono.variable} ${oswald.variable}`}>
      <body>
        <AttributionCapture />
        <Nav />
        {/* The nav is a fixed, solid 64/74px cream bar on every page (Figma),
            so pages start below it rather than underneath it. */}
        <main className="pt-16 md:pt-[74px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
