"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

// Pages whose top section is a full-bleed dark hero image.
// On these pages, the nav starts transparent and lights up on scroll.
// On all other pages, the nav stays solid from the start.
const HERO_PAGES = new Set(["/", "/about"]);

export function Nav() {
  const pathname = usePathname();
  const hasHero = HERO_PAGES.has(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!hasHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  // Two visual states:
  //   solid (scrolled OR non-hero page) → bone background, noir text/wordmark, noir Apply button
  //   transparent (top of hero page)    → no background, bone wordmark/text, bone Apply button with noir text
  const wordmarkTone = scrolled ? "noir" : "bone";
  const linkClass = scrolled
    ? "text-noir hover:text-bronze"
    : "text-bone hover:text-bronze drop-shadow-sm";
  const applyClass = scrolled
    ? "text-bone bg-noir hover:bg-ink"
    : "text-noir bg-bone hover:bg-bronze hover:text-bone";

  // Show Home link on every page except the home page itself
  const showHome = pathname !== "/";
  // Show About link everywhere except the about page itself
  const showAbout = pathname !== "/about";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bone/95 backdrop-blur-sm border-b border-taupe/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Wordmark size="md" tone={wordmarkTone} />
        </Link>
        <div className="flex items-center gap-5 sm:gap-8">
          {showHome && (
            <Link
              href="/"
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${linkClass}`}
            >
              Home
            </Link>
          )}
          {showAbout && (
            <Link
              href="/about"
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${linkClass}`}
            >
              About
            </Link>
          )}
          <Link
            href={pathname === "/" ? "/#apply" : "/#apply"}
            className={`text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 sm:py-3 transition-colors duration-300 ${applyClass}`}
          >
            Apply
          </Link>
        </div>
      </nav>
    </header>
  );
}
