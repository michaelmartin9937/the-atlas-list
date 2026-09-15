"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

// Pages whose top section is a full-bleed dark hero.
// On these pages, the nav starts transparent and lights up on scroll.
// On all other pages, the nav stays solid from the start.
const HERO_PAGES = new Set(["/", "/about", "/desert-after-dark"]);

// Pages that render their own #apply section, so the nav Apply button
// should stay on the current page instead of jumping to /#apply.
const PAGES_WITH_APPLY = new Set(["/", "/about", "/desert-after-dark"]);

const INSTAGRAM_URL = "https://www.instagram.com/theatlaslist/";

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

  // Desert After Dark uses its own "Velvet Sunset" palette; the nav stays
  // dark on that page so scrolling doesn't drop a light bar onto a velvet page.
  const velvet = pathname === "/desert-after-dark";

  // Visual states (Figma: 104px bar, hairline rule beneath when solid):
  //   solid (scrolled OR non-hero page) → pearl background, ink text, noir Apply
  //     (velvet page: velvet background, cream text, champagne Apply)
  //   transparent (top of hero page)    → no background, cream text, pearl Apply
  //     (velvet page: champagne Apply)
  const headerClass = scrolled
    ? velvet
      ? "bg-velvet/95 backdrop-blur-sm border-b border-champagne/20"
      : "bg-pearl/95 backdrop-blur-sm border-b border-sand"
    : "bg-transparent";
  const linkClass = velvet
    ? "text-bone hover:text-champagne"
    : scrolled
      ? "text-ink hover:text-ember"
      : "text-bone hover:text-ember drop-shadow-sm";
  const applyClass = velvet
    ? "text-velvet bg-champagne hover:bg-burgundy hover:text-bone"
    : scrolled
      ? "text-bone bg-noir hover:bg-ember"
      : "text-noir bg-pearl hover:bg-ember hover:text-bone";

  const showHome = pathname !== "/";
  const showAbout = pathname !== "/about";
  // Full name on sm+; phones get tighter spacing and a two-line lockup.
  const showEvent = pathname === "/" || pathname === "/about";

  const link = `text-xs font-medium uppercase tracking-[0.06em] transition-colors duration-300 ${linkClass}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <nav className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 h-20 md:h-[104px] flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="The Atlas List — home">
          <Wordmark size="md" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-8 md:gap-[38px]">
          {showHome && (
            <Link href="/" className={link}>
              Home
            </Link>
          )}
          {showAbout && (
            <Link href="/about" className={link}>
              About
            </Link>
          )}
          {showEvent && (
            <Link href="/desert-after-dark" className={`${link} leading-tight`}>
              <span className="sm:hidden">
                Desert
                <br />
                After Dark
              </span>
              <span className="hidden sm:inline">Desert After Dark</span>
            </Link>
          )}
          <Link
            href={PAGES_WITH_APPLY.has(pathname) ? "#apply" : "/#apply"}
            className={`text-xs font-medium uppercase tracking-[0.06em] px-4 sm:px-5 h-11 inline-flex items-center transition-colors duration-300 ${applyClass}`}
          >
            Apply
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Atlas List on Instagram"
            className={`hidden md:inline-flex ${linkClass}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
