import { createClient } from "@supabase/supabase-js";

// Database target, resolved in this order:
//
//   1. ATLAS_SUPABASE_URL + ATLAS_SUPABASE_KEY — explicit override (any key).
//   2. NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY — the pair the
//      Vercel ↔ Supabase integration injects for the "the-curated-life"
//      project (vnnhcjvkhcwrenlglfnw). Service role bypasses RLS. Used only
//      when both are present.
//   3. Built-in default — the same project through its anon key, which is
//      public by design and limited by RLS to inserting pending applications
//      (supabase/migrations/20260909000000_lead_applications_anon_insert_policy.sql).
//      This is what lets the form work with no deploy-time secrets at all.
//
// The project is on Supabase's free tier, which pauses after about a week
// without API traffic — that took the form down on 2026-09-09.
// /api/keepalive (scheduled in vercel.json) keeps it awake.
const DEFAULT_SUPABASE_URL = "https://vnnhcjvkhcwrenlglfnw.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubmhjanZraGN3cmVubGdsZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NjA5NzQsImV4cCI6MjA5MzQzNjk3NH0.YUmNGF3ccT_8pqHNJnkgPWmgMZwv3aNyWI4y6P88Mgk";

export function createServerSupabaseClient() {
  const env = process.env;
  let url = DEFAULT_SUPABASE_URL;
  let key = DEFAULT_SUPABASE_KEY;
  if (env.ATLAS_SUPABASE_URL && env.ATLAS_SUPABASE_KEY) {
    url = env.ATLAS_SUPABASE_URL;
    key = env.ATLAS_SUPABASE_KEY;
  } else if (env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    url = env.NEXT_PUBLIC_SUPABASE_URL;
    key = env.SUPABASE_SERVICE_ROLE_KEY;
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
