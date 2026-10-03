"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BackToTop } from "./editorial";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/desert-after-dark", label: "Event" },
  { href: "/partner", label: "Partner" },
  { href: "/#apply", label: "Apply" },
  { href: "/terms", label: "Terms" },
];
const INSTAGRAM = "https://www.instagram.com/theatlaslist/";
// Figma shows hello@, but info@ is the mailbox the team actually reads.
const EMAIL = "info@theatlaslist.club";

const heading = "font-mono text-[10px] uppercase tracking-[0.24em] text-brass";
const link = "text-[15px] text-bone/90 hover:text-coral transition-colors";

// Figma (Oct 2026): one dark footer on every page. The wordmark set huge with
// "List" in italics, a hairline, five columns, a mono copyright bar.
export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/private/")) return null;

  return (
    <footer className="bg-night text-bone">
      <div className="max-w-[1296px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-10">
        <div className="flex items-end justify-between gap-8">
          <p className="font-serif uppercase text-[2.6rem] sm:text-6xl md:text-[96px] leading-[0.9] tracking-[0.02em]">
            The Atlas <em className="italic">List</em>
          </p>
          <div className="hidden sm:block pb-2">
            <BackToTop />
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-hairline-dark pt-12 md:pt-16 grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)] md:gap-10">
          <div>
            <p className="font-serif text-[19px] md:text-[21px] leading-[1.35]">
              Scottsdale&apos;s private social club.
              <br />
              By invitation, never by open sale.
            </p>
            <h2 className={`${heading} mt-9`}>Join the list</h2>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 flex items-center justify-between gap-4 border-b border-hairline-dark pb-3 text-[14px] text-bone/70 hover:text-coral transition-colors"
            >
              <span>{EMAIL}</span>
              <span className="text-coral" aria-hidden>
                →
              </span>
            </a>
            <p className="mt-3 text-[11px] text-bone/50">A few notes a month, never more.</p>
          </div>

          <nav aria-label="Explore">
            <h2 className={heading}>Explore</h2>
            <ul className="mt-5 flex flex-col gap-3">
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
            <h2 className={heading}>Next gathering</h2>
            <p className="mt-5 font-serif uppercase text-[22px] leading-none">
              Desert After <em className="italic">Dark</em>
            </p>
            <p className="mt-4 text-[13px] leading-[1.6] text-bone/75">
              Saturday, October 10, 2026
              <br />
              Private estate · Paradise Valley, AZ
              <br />
              Doors open 5:30 PM
              <br />
              Address shared 48 hours before
            </p>
            <Link
              href="/desert-after-dark"
              className="mt-5 inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-coral hover:text-bone transition-colors"
            >
              Event details <span aria-hidden>→</span>
            </Link>
          </div>

          <div>
            <h2 className={heading}>Connect</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={link}>
                  Instagram · @theatlaslist
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={link}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <Link href="/partner#inquire" className={link}>
                  Partnership inquiries
                </Link>
              </li>
              <li>
                <a href={`mailto:${EMAIL}?subject=Press%20inquiry`} className={link}>
                  Press &amp; media
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Legal">
            <h2 className={heading}>Legal</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href="/terms" className={link}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={link}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-[11px] leading-[1.6] text-bone/50">
              21+ only. Valid ID required at entry.
              <br />
              Photography happens at every event.
            </p>
          </nav>
        </div>

        <div className="mt-16 md:mt-20 border-t border-hairline-dark pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
          <span>© 2026 The Atlas List. All rights reserved.</span>
          <span>Scottsdale · Paradise Valley · Arizona</span>
          <span>Desert After Dark powered by Thundr</span>
        </div>
      </div>
    </footer>
  );
}
