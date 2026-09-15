"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

// Figma: a solid pearl 104px bar with a sand hairline, the same on every
// page — Home / About / Desert After Dark / Partner, an Apply button, and the
// Instagram mark.
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/desert-after-dark", label: "Desert After Dark" },
  { href: "/partner", label: "Partner" },
];

// Pages that render their own #apply section, so the nav Apply button
// should stay on the current page instead of jumping to /#apply.
const PAGES_WITH_APPLY = new Set(["/", "/about", "/desert-after-dark"]);

const INSTAGRAM_URL = "https://www.instagram.com/theatlaslist/";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the phone menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const link =
    "text-xs font-medium uppercase tracking-[0.06em] text-ink hover:text-ember transition-colors";
  const applyHref = PAGES_WITH_APPLY.has(pathname) ? "#apply" : "/#apply";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pearl border-b border-sand">
      <nav className="max-w-[1280px] mx-auto px-5 sm:px-6 md:px-10 h-20 md:h-[104px] flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="The Atlas List — home">
          <Wordmark size="md" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-[38px]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={link}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={applyHref}
            className="text-xs font-medium uppercase tracking-[0.06em] text-bone bg-noir hover:bg-ember px-6 h-11 inline-flex items-center transition-colors"
          >
            Apply
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Atlas List on Instagram"
            className="inline-flex text-ink hover:text-ember transition-colors"
          >
            <InstagramIcon />
          </a>
        </div>

        {/* Phone: Apply stays visible, the rest folds into a menu. */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={applyHref}
            className="text-xs font-medium uppercase tracking-[0.06em] text-bone bg-noir px-4 h-10 inline-flex items-center"
          >
            Apply
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="site-menu"
        hidden={!open}
        className="md:hidden border-t border-sand bg-pearl"
      >
        <ul className="px-5 py-3 flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`${link} block py-3`}
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
              className={`${link} flex items-center gap-3 py-3`}
            >
              <InstagramIcon className="w-5 h-5" />
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
