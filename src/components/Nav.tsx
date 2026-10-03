"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Figma (Oct 2026): a cream 74px bar with a hairline. Text wordmark on the
// left, four mono links in the middle (the current page underlined), a dark
// Apply button on the right.
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/desert-after-dark", label: "Event" },
  { href: "/partner", label: "Partner" },
];

// Pages that render their own #apply section, so the nav Apply button
// should stay on the current page instead of jumping to /#apply.
const PAGES_WITH_APPLY = new Set(["/", "/about", "/desert-after-dark", "/desert-after-dark/tickets"]);

const INSTAGRAM_URL = "https://www.instagram.com/theatlaslist/";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the phone menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const applyHref = PAGES_WITH_APPLY.has(pathname) ? "#apply" : "/#apply";
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const link = (href: string) =>
    `relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-coral ${
      isCurrent(href)
        ? "text-noir after:absolute after:left-0 after:right-0 after:-bottom-[10px] after:h-px after:bg-noir"
        : "text-ink/80"
    }`;

  // Private, unlisted pages (the approved-guest preview) carry no site
  // navigation at all.
  if (pathname.startsWith("/private/")) return null;

  return (
    <header id="top" className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-hairline/70">
      <nav className="max-w-[1296px] mx-auto px-5 sm:px-6 md:px-12 h-16 md:h-[74px] flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-[17px] md:text-[21px] uppercase tracking-[0.16em] text-noir whitespace-nowrap"
          aria-label="The Atlas List — home"
        >
          The Atlas List
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined} className={link(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href={applyHref}
          className="hidden md:inline-flex items-center h-11 px-7 bg-noir text-cream font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-coral hover:text-noir transition-colors"
        >
          Apply
        </Link>

        {/* Phone: Apply stays visible, the rest folds into a menu. */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={applyHref}
            className="inline-flex items-center h-10 px-5 bg-noir text-cream font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            Apply
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center text-noir"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="site-menu" hidden={!open} className="md:hidden border-t border-hairline/70 bg-cream">
        <ul className="px-5 py-4 flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className={`block py-3 font-mono text-[12px] uppercase tracking-[0.22em] ${isCurrent(l.href) ? "text-noir" : "text-ink/80"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink/80"
            >
              Instagram · @theatlaslist
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
