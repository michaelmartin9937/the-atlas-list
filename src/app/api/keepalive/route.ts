import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Supabase pauses free-tier projects after roughly a week without API
// traffic, which silently took the application form down on 2026-09-09.
// Vercel Cron calls this once a day (see vercel.json) so the project never
// goes idle. The query is a HEAD count — with the anon key RLS returns 0
// rows, but PostgREST still executes it, which is all that matters.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from("lead_applications")
    .select("id", { head: true, count: "exact" });

  if (error) {
    console.error("keepalive query failed", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    at: new Date().toISOString(),
    // Lets us confirm the Resend key landed in Vercel without exposing it.
    emailConfigured: Boolean(process.env.RESEND_API_KEY),
    notifyTo: process.env.NOTIFY_TO || "info@theatlaslist.club",
  });
}
