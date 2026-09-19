import { NextResponse, after } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { applicationSchema, normalizeUrl, parseInstagramHandle } from "@/lib/validation";
import { normalizePhoneE164 } from "@/lib/phone";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { notifyNewApplication } from "@/lib/notify";
import { readReferralCookie } from "@/lib/referral";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const clientKey = getClientKey(req.headers);
  const rate = checkRateLimit(clientKey);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec ?? 3600) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot triggered — pretend success, drop silently
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const phoneE164 = normalizePhoneE164(data.phone);
  if (!phoneE164) {
    return NextResponse.json(
      { fieldErrors: { phone: "Enter a valid phone number" } },
      { status: 400 }
    );
  }

  // The short form has always stored whatever was typed (minus the @); keep
  // that as the fallback so an unusual handle is never silently dropped.
  const igHandle =
    parseInstagramHandle(data.instagram) ??
    (data.instagram ? data.instagram.trim().replace(/^@+/, "").toLowerCase() || null : null);
  const email = data.email.toLowerCase();

  const supabase = createServerSupabaseClient();

  // The Oct 10 page moved from /fashion-show to /desert-after-dark; a tab
  // opened before the rename still posts the old value. Store the current one.
  const sourcePage =
    data.sourcePage === "fashion-show" ? "desert-after-dark" : (data.sourcePage ?? null);

  const basePayload = {
    first_name: data.firstName,
    last_name: data.lastName,
    phone: phoneE164,
    email,
    vouch_intro: data.vouchIntro,
    sms_consent: data.smsConsent,
    source_page: sourcePage,
    referral_source: data.heardAbout?.trim() || null,
  };

  // Extended Desert After Dark application + silent attribution. Every one of
  // these columns is nullable, so the short form simply leaves them empty.
  const blank = (v: string | undefined | null) => v?.trim() || null;
  const attr = data.attribution ?? {};
  const extended = data.formVersion === 2;
  const extendedPayload = {
    form_version: extended ? 2 : 1,
    // A clickable profile is one tap away for whoever reviews in Airtable.
    instagram_url: parseInstagramHandle(data.instagram)
      ? `https://www.instagram.com/${parseInstagramHandle(data.instagram)}/`
      : null,
    city: blank(data.city),
    linkedin_url: normalizeUrl(data.linkedin),
    referred_by: blank(data.referredBy),
    attended_before: extended ? data.attendedBefore === "yes" : null,
    attended_event: data.attendedBefore === "yes" ? blank(data.attendedEvent) : null,
    drew_you: blank(data.drewYou),
    about_you: blank(data.aboutYou),
    hoping_for: blank(data.hopingFor),
    agreement_accepted: extended ? data.agreement === true : null,
    landing_page: blank(attr.landingPage),
    referrer: blank(attr.referrer),
    utm_source: blank(attr.utmSource),
    utm_medium: blank(attr.utmMedium),
    utm_campaign: blank(attr.utmCampaign),
    utm_content: blank(attr.utmContent),
    // Set by /r/<handle> (Brand Ambassador links); read server-side from the
    // httpOnly cookie, so the form can't be made to claim someone's credit.
    referral_code: readReferralCookie(req.headers.get("cookie")),
  };

  let { error } = await supabase.from("lead_applications").insert({
    ...basePayload,
    ...extendedPayload,
    instagram_handle: igHandle,
  });

  // Safety net: if the extended columns are ever missing (migration
  // 20260918200000 not applied to this database), PostgREST answers PGRST204.
  // Save the application anyway, with the extra answers folded into the one
  // free-text column every version of the table has, rather than lose it.
  if (error?.code === "PGRST204" && !error.message?.includes("instagram_handle")) {
    console.warn("lead_applications is missing extended columns; folding answers into vouch_intro.", error.message);
    const folded = Object.entries(extendedPayload)
      .filter(([, v]) => v !== null && v !== "")
      .map(([k, v]) => `[${k}: ${String(v)}]`)
      .join("\n");
    ({ error } = await supabase.from("lead_applications").insert({
      ...basePayload,
      vouch_intro: `${basePayload.vouch_intro}\n\n${folded}`.slice(0, 6000),
      instagram_handle: igHandle,
    }));
  }

  // Fallback: if the target DB hasn't had the add_instagram_handle migration
  // applied, PostgREST returns PGRST204. Retry without the column and fold
  // the handle into vouch_intro so the data isn't lost.
  if (
    error?.code === "PGRST204" &&
    error.message?.includes("instagram_handle")
  ) {
    console.warn(
      "lead_applications.instagram_handle column missing; folding handle into vouch_intro. " +
        "Run: alter table public.lead_applications add column if not exists instagram_handle text;"
    );
    const vouchWithHandle = igHandle
      ? `[Instagram: @${igHandle}]\n\n${basePayload.vouch_intro}`
      : basePayload.vouch_intro;
    ({ error } = await supabase
      .from("lead_applications")
      .insert({ ...basePayload, vouch_intro: vouchWithHandle }));
  }

  if (error) {
    console.error("Supabase insert failed", error);
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 500 }
    );
  }

  // The row is saved; notify the team after the response goes out so email
  // can never slow down or fail a submission. Problems land in the logs.
  after(async () => {
    try {
      const result = await notifyNewApplication({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: phoneE164,
        email,
        instagram: igHandle,
        vouchIntro: data.vouchIntro,
        heardAbout: data.heardAbout?.trim() || null,
        smsConsent: data.smsConsent,
        sourcePage: data.sourcePage ?? "unknown",
        city: extendedPayload.city,
        linkedinUrl: extendedPayload.linkedin_url,
        referredBy: extendedPayload.referred_by,
        attendedBefore: extendedPayload.attended_before,
        attendedEvent: extendedPayload.attended_event,
        drewYou: extendedPayload.drew_you,
        aboutYou: extendedPayload.about_you,
        hopingFor: extendedPayload.hoping_for,
        referralCode: extendedPayload.referral_code,
        utm: [extendedPayload.utm_source, extendedPayload.utm_medium, extendedPayload.utm_campaign, extendedPayload.utm_content]
          .filter(Boolean)
          .join(" / ") || null,
      });
      if (!result.sent) console.warn("Application notification skipped:", result.reason);
    } catch (err) {
      console.error("Application notification failed", err);
    }
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
