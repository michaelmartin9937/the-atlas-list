type Props = {
  handle: string; // without the leading @
  label?: string; // accessible name, e.g. "Almer on Instagram"
};

// Small outline button that opens an Instagram profile in a new tab. Handle
// text is kept in its natural case — uppercase handles read wrong.
export function InstagramLink({ handle, label }: Props) {
  return (
    <a
      href={`https://www.instagram.com/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? `@${handle} on Instagram`}
      className="inline-flex items-center gap-2 self-start text-sm text-noir/85 border border-noir/25 px-3.5 py-2 hover:border-bronze hover:text-bronze transition-colors"
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
