import { STRIPE_PAYMENT_LINK } from "@/content/private-preview";

type Props = {
  label: string;
  size?: "md" | "lg";
  className?: string;
};

// Every payment button on the private preview. One link, read from
// NEXT_PUBLIC_STRIPE_PAYMENT_LINK; opens in the same tab. Until the link is
// configured the button is visibly inert so a reviewer can't mistake it for
// a working checkout.
export function StripeButton({ label, size = "lg", className = "" }: Props) {
  const base =
    "inline-flex items-center justify-center font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-velvet";
  const dims = size === "lg" ? "h-[56px] px-9 text-[13px]" : "h-12 px-6 text-[12px]";
  if (!STRIPE_PAYMENT_LINK) {
    return (
      <span
        aria-disabled="true"
        title="Payment link not configured yet"
        className={`${base} ${dims} border border-velvet-line text-velvet-text cursor-not-allowed ${className}`}
      >
        {label}
      </span>
    );
  }
  return (
    <a
      href={STRIPE_PAYMENT_LINK}
      className={`${base} ${dims} bg-gold text-noir hover:bg-bone active:bg-[#B08B48] ${className}`}
    >
      {label}
    </a>
  );
}
