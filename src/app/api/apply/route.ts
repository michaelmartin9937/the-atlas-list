import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { applicationSchema } from "@/lib/validation";
import { normalizePhoneE164 } from "@/lib/phone";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

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

  const igHandle = data.instagram
    ? data.instagram.trim().replace(/^@+/, "").toLowerCase() || null
    : null;

  const supabase = createServerSupabaseClient();

  const basePayload = {
    first_name: data.firstName,
    last_name: data.lastName,
    phone: phoneE164,
    email: data.email.toLowerCase(),
    vouch_intro: data.vouchIntro,
    sms_consent: data.smsConsent,
    source_page: data.sourcePage ?? null,
  };

  let { error } = await supabase.from("lead_applications").insert({
    ...basePayload,
    instagram_handle: igHandle,
  });

  // Fallback: if the production DB hasn't had the add_instagram_handle migration
  // applied yet, PostgREST returns PGRST204. Retry without the column and fold
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

  return NextResponse.json({ ok: true }, { status: 201 });
}
