type Props = {
  handle: string; // without the leading @
  label?: string; // accessible name, e.g. "Almer on Instagram"
  // "light" (default) for bone/pearl sections; "dark" for velvet-black ones.
  tone?: "light" | "dark";
};

const TONE = {
  light: "text-noir/85 border-noir/25 hover:border-bronze hover:text-bronze",
  dark: "text-bone/85 border-burgundy/50 hover:border-burgundy hover:text-champagne",
};

// Small outline button that opens an Instagram profile in a new tab. Handle
// text is kept in its natural case — uppercase handles read wrong.
export function InstagramLink({ handle, label, tone = "light" }: Props) {
  return (
    <a
      href={`https://www.instagram.com/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? `@${handle} on Instagram`}
      className={`inline-flex items-center gap-2 self-start text-sm border px-3.5 py-2 transition-colors ${TONE[tone]}`}
    >
      <InstagramIcon className="w-4 h-4 flex-shrink-0" />
      <span>@{handle}</span>
    </a>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
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
