"use client";

import Script from "next/script";
import { createElement } from "react";
import { STRIPE_BUY_BUTTON } from "@/content/private-preview";

// Stripe's hosted Buy Button (the embed Mike supplied). Stripe renders the
// button itself once buy-button.js loads; until then the slot keeps its
// height so nothing jumps. The publishable key is public by design.
export function StripeBuyButton({ className = "" }: { className?: string }) {
  if (!STRIPE_BUY_BUTTON.id || !STRIPE_BUY_BUTTON.publishableKey) return null;
  return (
    <div className={`min-h-[56px] ${className}`}>
      <Script src="https://js.stripe.com/v3/buy-button.js" strategy="lazyOnload" />
      {createElement("stripe-buy-button", {
        "buy-button-id": STRIPE_BUY_BUTTON.id,
        "publishable-key": STRIPE_BUY_BUTTON.publishableKey,
      })}
    </div>
  );
}
