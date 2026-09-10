"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

// Pages whose top section is a full-bleed dark hero image.
// On these pages, the nav starts transparent and lights up on scroll.
// On all other pages, the nav stays solid from the start.
const HERO_PAGES = new Set(["/", "/about", "/desert-after-dark"]);

// Pages that render their own #apply section, so the nav Apply button
// should stay on the current page instead of jumping to /#apply.
const PAGES_WITH_APPLY = new Set(["/", "/about", "/desert-after-dark"]);

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
  // dark on that page so scrolling doesn't drop a cream bar onto a velvet page.
  const velvet = pathname === "/desert-after-dark";

  // Visual states:
  //   solid (scrolled OR non-hero page) → bone background, noir text, noir Apply button
  //     (velvet page: velvet background, bone text, champagne Apply button)
  //   transparent (top of hero page)    → no background, bone text, bone Apply button
  //     (velvet page: champagne Apply button)
  // The logo badge carries its own cream disc + bronze ring, so it reads in all states.
  const headerClass = scrolled
    ? velvet
      ? "bg-velvet/95 backdrop-blur-sm border-b border-champagne/20"
      : "bg-bone/95 backdrop-blur-sm border-b border-taupe/20"
    : "bg-transparent";
  const linkClass = velvet
    ? "text-bone hover:text-champagne"
    : scrolled
      ? "text-noir hover:text-bronze"
      : "text-bone hover:text-bronze drop-shadow-sm";
  const applyClass = velvet
    ? "text-velvet bg-champagne hover:bg-burgundy hover:text-bone"
    : scrolled
      ? "text-bone bg-noir hover:bg-ink"
      : "text-noir bg-bone hover:bg-bronze hover:text-bone";

  // Show Home link on every page except the home page itself
  const showHome = pathname !== "/";
  // Show About link everywhere except the about page itself
  const showAbout = pathname !== "/about";
  // Desert After Dark link surfaces on the two marketing pages so the event
  // is discoverable from Home and About without cluttering the utility pages.
  // Phones get tighter spacing and a two-line lockup so the full name fits.
  const showFashionShow = pathname === "/" || pathname === "/about";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Wordmark size="md" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-8">
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
          {showFashionShow && (
            <Link
              href="/desert-after-dark"
              className={`text-xs uppercase tracking-widest leading-tight transition-colors duration-300 ${linkClass}`}
            >
              {/* Phones: stacked two-line lockup so the full name fits beside
                  About + Apply; single line from sm up. */}
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
            className={`text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 sm:py-3 transition-colors duration-300 ${applyClass}`}
          >
            Apply
          </Link>
        </div>
      </nav>
    </header>
  );
}
