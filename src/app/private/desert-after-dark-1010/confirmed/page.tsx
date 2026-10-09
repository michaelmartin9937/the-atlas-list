import { redirect } from "next/navigation";
import { arrival } from "@/content/arrival";

// The old post-payment "confirmed" URL (also the Stripe after-payment
// redirect, if configured) now lands on the shared Arrival Notes page.
export default function ConfirmedRedirect() {
  redirect(arrival.route);
}
