import { NextResponse } from "next/server";
import { REFERRAL_COOKIE, REFERRAL_MAX_AGE_S, normalizeReferralCode, readReferralCookie } from "@/lib/referral";

export const dynamic = "force-dynamic";

// /r/<handle>/tickets → the same referral cookie as /r/<handle>, but the
// visitor lands on the men's ticket page instead of the event page. The
// destination is fixed (never taken from the URL), so this can't be used as
// an open redirect. Added 2026-10-07 for Ocean Solari's second link.
const DESTINATION = "/desert-after-dark/tickets";

export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code: raw } = await ctx.params;
  const code = normalizeReferralCode(raw);

  const res = NextResponse.redirect(new URL(DESTINATION, req.url), 307);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");

  // First click wins for 30 days, exactly as on /r/<handle>.
  const existing = readReferralCookie(req.headers.get("cookie"));
  if (code && !existing) {
    res.cookies.set(REFERRAL_COOKIE, code, {
      maxAge: REFERRAL_MAX_AGE_S,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}
