import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://the-curated.life"),
  title: {
    default: "The Curated Life — Private Gatherings in Scottsdale",
    template: "%s · The Curated Life",
  },
  description:
    "An invitation-only social circle for women in Scottsdale, AZ. Curated gatherings, private rooms, no fees — only the right room.",
  openGraph: {
    title: "The Curated Life",
    description:
      "An invitation-only social circle for women in Scottsdale, AZ. Curated gatherings, private rooms, no fees — only the right room.",
    url: "https://the-curated.life",
    siteName: "The Curated Life",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Curated Life",
    description: "An invitation-only social circle for women in Scottsdale, AZ.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
