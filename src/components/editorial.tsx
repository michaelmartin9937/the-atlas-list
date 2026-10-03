import Link from "next/link";
import type { ReactNode } from "react";

// Shared pieces of the editorial design system (Figma "Altas List Desert
// After Dark", Oct 2026): numbered mono eyebrows, uppercase Playfair display
// type, hairline-boxed buttons, arrow links, the hero "issue" rail.

type Tone = "light" | "dark";

export const container = "max-w-[1296px] mx-auto px-6 md:px-12";

// "01 — HOW WE GATHER"
export function Eyebrow({
  n,
  children,
  tone = "light",
  className = "",
}: {
  n?: string | number;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const color = tone === "dark" ? "text-bone/55" : "text-ink/55";
  return (
    <span className={`block font-mono text-[11px] uppercase tracking-[0.22em] ${color} ${className}`}>
      {n !== undefined && (
        <>
          {String(n).padStart(2, "0")}
          <span className="mx-3" aria-hidden>
            —
          </span>
        </>
      )}
      {children}
    </span>
  );
}

// Uppercase Playfair display heading; `em` spans render italic in the copy.
export function Display({
  as: Tag = "h2",
  size = "lg",
  tone = "light",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: "xl" | "lg" | "md" | "sm";
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  const sizes = {
    xl: "text-[2.75rem] sm:text-6xl md:text-[88px] leading-[0.98]",
    lg: "text-[2.4rem] sm:text-5xl md:text-[64px] leading-[1.02]",
    md: "text-[2rem] sm:text-4xl md:text-[48px] leading-[1.05]",
    sm: "text-2xl sm:text-3xl md:text-[34px] leading-[1.1]",
  }[size];
  const color = tone === "dark" ? "text-bone" : "text-noir";
  return (
    <Tag className={`font-serif font-normal uppercase tracking-[-0.01em] ${sizes} ${color} ${className}`}>
      {children}
    </Tag>
  );
}

// Section header: eyebrow + display on the left, a short intro with a
// hairline to its left on the right (Figma: every numbered section).
export function SectionHeader({
  n,
  eyebrow,
  title,
  intro,
  tone = "light",
  size = "lg",
  aside,
  className = "",
}: {
  n?: string | number;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  size?: "xl" | "lg" | "md";
  aside?: ReactNode;
  className?: string;
}) {
  const introColor = tone === "dark" ? "text-bone/70" : "text-ink/70";
  const rule = tone === "dark" ? "border-hairline-dark" : "border-hairline";
  return (
    <div className={`grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:gap-16 md:items-end ${className}`}>
      <div>
        <Eyebrow n={n} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <Display size={size} tone={tone} className="mt-7 md:mt-9">
          {title}
        </Display>
      </div>
      {(intro || aside) && (
        <div className={`md:pb-2 border-l ${rule} pl-6`}>
          {intro && <p className={`text-[15px] leading-[1.6] ${introColor}`}>{intro}</p>}
          {aside && <div className={intro ? "mt-6" : ""}>{aside}</div>}
        </div>
      )}
    </div>
  );
}

type ButtonVariant = "cream" | "dark" | "coral" | "outline-light" | "outline-dark";

const BUTTON: Record<ButtonVariant, string> = {
  cream: "bg-cream text-noir hover:bg-coral hover:text-noir",
  dark: "bg-noir text-cream hover:bg-coral hover:text-noir",
  coral: "bg-coral text-noir hover:bg-cream",
  "outline-light": "border border-noir/70 text-noir hover:bg-noir hover:text-cream",
  "outline-dark": "border border-bone/50 text-bone hover:bg-bone hover:text-noir",
};

// Mono, tracked, 52px tall, with the trailing arrow (Figma buttons).
export function Button({
  href,
  variant = "dark",
  children,
  arrow = true,
  className = "",
  download,
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
  download?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-5 h-[52px] px-7 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${BUTTON[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <span aria-hidden>→</span>}
    </>
  );
  if (download || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} download={download} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

// "DESERT AFTER DARK · OCT 10 →" — a tracked text link.
export function ArrowLink({
  href,
  children,
  tone = "light",
  underline = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone | "coral";
  underline?: boolean;
  className?: string;
}) {
  const color =
    tone === "dark" ? "text-bone hover:text-coral" : tone === "coral" ? "text-coral hover:text-noir" : "text-noir hover:text-coral";
  const line = underline
    ? `pb-2 border-b ${tone === "dark" ? "border-bone/50" : tone === "coral" ? "border-coral" : "border-noir/60"}`
    : "";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${color} ${line} ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}

// Big coral Playfair numeral ("01").
export function Numeral({ n, className = "" }: { n: number | string; className?: string }) {
  return (
    <span className={`block font-serif text-coral leading-none ${className}`}>{String(n).padStart(2, "0")}</span>
  );
}

// Bottom rail of every hero: "ISSUE NO. 01 ———— SCROLL TO ENTER THE ROOM ↓".
export function IssueRail({
  left,
  right = "Scroll to enter the room",
  tone = "dark",
}: {
  left: string;
  right?: string;
  tone?: Tone;
}) {
  const color = tone === "dark" ? "text-bone/80" : "text-ink/70";
  const rule = tone === "dark" ? "bg-bone/30" : "bg-noir/25";
  return (
    <div className={`flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.24em] ${color}`}>
      <span className="shrink-0">{left}</span>
      <span className={`h-px flex-1 ${rule}`} aria-hidden />
      <span className="shrink-0 inline-flex items-center gap-3">
        <span className="hidden sm:inline">{right}</span>
        <span aria-hidden>↓</span>
      </span>
    </div>
  );
}

// Vertical keyword list beside a hairline (hero, right-hand side).
export function KeywordList({ items }: { items: readonly string[] }) {
  return (
    <ul className="hidden md:flex flex-col gap-3 border-r border-bone/40 pr-8 font-mono text-[11px] uppercase tracking-[0.22em] text-bone">
      {items.map((k) => (
        <li key={k}>{k}</li>
      ))}
    </ul>
  );
}

// Round "↑ Back to top" control.
export function BackToTop({ tone = "dark", label = "Back to top" }: { tone?: Tone; label?: string }) {
  const ring = tone === "dark" ? "border-bone/40 text-bone hover:border-coral hover:text-coral" : "border-noir/40 text-noir hover:border-coral hover:text-coral";
  const text = tone === "dark" ? "text-bone/80" : "text-ink/70";
  return (
    <a href="#top" className={`inline-flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.24em] ${text}`}>
      {label}
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${ring}`} aria-hidden>
        ↑
      </span>
    </a>
  );
}

// Left-bordered italic note ("A NOTE ON ADMISSION").
export function Note({ label, children, tone = "dark" }: { label: string; children: ReactNode; tone?: Tone }) {
  const text = tone === "dark" ? "text-bone/90" : "text-ink/85";
  const rule = tone === "dark" ? "border-brass/70" : "border-coral";
  return (
    <div className={`border-l ${rule} pl-5`}>
      <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-brass">{label}</span>
      <p className={`mt-3 font-serif italic text-[17px] leading-[1.55] ${text}`}>{children}</p>
    </div>
  );
}
