import { STRIPE_PAYMENT_LINK } from "@/content/private-preview";

type Props = {
  label: string;
  size?: "md" | "lg";
  className?: string;
};

// Every payment button on the private ticket page. One link, read from
// NEXT_PUBLIC_STRIPE_PAYMENT_LINK; opens in the same tab. Until the link is
// configured the button is visibly inert so a reviewer can't mistake it for
// a working checkout. Figma (Oct 2026): a cream block with tracked mono text.
export function StripeButton({ label, size = "lg", className = "" }: Props) {
  const base =
    "inline-flex items-center justify-center font-mono uppercase tracking-[0.22em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-night";
  const dims = size === "lg" ? "h-[56px] px-9 text-[12px]" : "h-12 px-6 text-[11px]";
  if (!STRIPE_PAYMENT_LINK) {
    return (
      <span
        aria-disabled="true"
        title="Payment link not configured yet"
        className={`${base} ${dims} border border-hairline-dark text-bone/50 cursor-not-allowed ${className}`}
      >
        {label}
      </span>
    );
  }
  return (
    <a href={STRIPE_PAYMENT_LINK} className={`${base} ${dims} bg-cream text-noir hover:bg-coral ${className}`}>
      {label}
    </a>
  );
}
