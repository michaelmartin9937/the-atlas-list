"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/desert-after-dark", label: "Desert After Dark" },
  { href: "/partner", label: "Partner" },
];
const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
const INSTAGRAM = "https://www.instagram.com/theatlaslist/";
const TIKTOK = "https://www.tiktok.com/@theatlaslist";
// Figma shows hello@, but info@ is the mailbox the team actually reads.
const EMAIL = "info@theatlaslist.club";

// Pages whose footer sits on the dark event palette.
const DARK_PAGES = new Set(["/desert-after-dark", "/partner"]);

// Four-column footer with a black copyright bar (Figma: Footer, Sep 2026).
export function Footer() {
  const pathname = usePathname();
  const dark = DARK_PAGES.has(pathname);
  const text = dark ? "text-bone" : "text-noir";
  const muted = dark ? "text-bone/70" : "text-ink/70";
  const heading = "text-[13px] font-semibold uppercase tracking-[0.08em] text-gold";
  const link = `text-[13px] font-medium uppercase tracking-[0.06em] ${text} hover:text-gold transition-colors`;

  return (
    <footer className={dark ? "bg-velvet" : "bg-white"}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-14 md:pt-[72px] pb-14 md:pb-[72px] grid gap-10 md:grid-cols-[minmax(0,1fr)_240px_280px_160px] md:gap-8">
        <div>
          <div className="flex items-center gap-4">
            <Wordmark size="sm" />
            <span
              className={`font-serif text-[11px] leading-[1.15] tracking-[0.06em] uppercase ${text} md:hidden`}
            >
              The Atlas List
            </span>
            <span
              className={`hidden md:block font-serif text-[9px] leading-[1.2] tracking-[0.1em] uppercase text-center ${text}`}
            >
              The
              <br />
              Atlas
              <br />
              List
            </span>
          </div>
          <p className={`mt-6 text-sm ${muted}`}>Scottsdale Private Social Club, AZ. By invitation only.</p>
        </div>

        <nav aria-label="Explore">
          <h2 className={heading}>Explore</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Connect</h2>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 text-[15px] ${text} hover:text-gold transition-colors`}>
                <InstagramIcon />
                @theatlaslist
              </a>
            </li>
            <li>
              <a href={TIKTOK} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 text-[15px] ${text} hover:text-gold transition-colors`}>
                <TikTokIcon />
                @theatlaslist
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`text-[15px] ${text} hover:text-gold transition-colors`}>
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Legal">
          <h2 className={heading}>Legal</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-noir py-5 text-center text-[13px] text-gold">
        © 2026 The Atlas List. All rights reserved.
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M13.5 3h2.6c.2 1.6 1.2 3.1 2.7 3.8.6.3 1.3.5 2.2.5v2.7c-1.7 0-3.3-.5-4.6-1.4v6.6c0 3.2-2.6 5.8-5.8 5.8S4.8 18.4 4.8 15.2c0-3.2 2.6-5.8 5.8-5.8.4 0 .8 0 1.2.1v2.8a3 3 0 1 0 1.7 2.7V3z" />
    </svg>
  );
}
