import Link from "next/link";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/about", label: "About" },
  { href: "/desert-after-dark", label: "Desert After Dark" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

// Light footer: badge + tagline, link row, copyright (Figma: Footer).
export function Footer() {
  return (
    <footer className="bg-pearl border-t border-sand px-6 md:px-10 py-9 md:py-10">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-7">
        <div className="flex items-center gap-5">
          <Wordmark size="sm" />
          <p className="text-sm text-ink/80">
            Scottsdale Private Social Club, AZ. By invitation only.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-[0.06em]">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-ink/80 hover:text-ember transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-ink/50">© 2026 The Atlas List. Scottsdale, AZ.</p>
        </div>
      </div>
    </footer>
  );
}
