-- The Desert After Dark application grew from a lead-capture form into a
-- 2–3 minute curation form (Sep 2026). Every new column is nullable: the Home
-- and About forms stay short and keep inserting the original columns only.
--
-- Nothing here changes RLS: anon is still INSERT-only with status = 'pending'.

alter table public.lead_applications
  -- About you
  add column if not exists city text,
  add column if not exists linkedin_url text,
  add column if not exists instagram_url text,
  -- Your connection
  add column if not exists referred_by text,
  add column if not exists attended_before boolean,
  add column if not exists attended_event text,
  -- The room
  add column if not exists drew_you text,
  add column if not exists about_you text,
  add column if not exists hoping_for text,
  -- Agreement: 21+, respectful conduct, no unapproved guests, no guarantee
  add column if not exists agreement_accepted boolean,
  -- Marketing attribution, captured silently on the visitor's first page view
  add column if not exists landing_page text,
  add column if not exists referrer text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  -- 1 = original short form, 2 = extended Desert After Dark form
  add column if not exists form_version smallint;

-- Length guards mirror src/lib/validation.ts so the anon key can't be used to
-- stuff arbitrarily large values into the new columns.
alter table public.lead_applications
  drop constraint if exists lead_applications_extended_lengths;
alter table public.lead_applications
  add constraint lead_applications_extended_lengths check (
    coalesce(length(city), 0) <= 120
    and coalesce(length(linkedin_url), 0) <= 300
    and coalesce(length(instagram_url), 0) <= 200
    and coalesce(length(referred_by), 0) <= 200
    and coalesce(length(attended_event), 0) <= 200
    and coalesce(length(drew_you), 0) <= 800
    and coalesce(length(about_you), 0) <= 1200
    and coalesce(length(hoping_for), 0) <= 800
    and coalesce(length(landing_page), 0) <= 500
    and coalesce(length(referrer), 0) <= 500
    and coalesce(length(utm_source), 0) <= 200
    and coalesce(length(utm_medium), 0) <= 200
    and coalesce(length(utm_campaign), 0) <= 200
    and coalesce(length(utm_content), 0) <= 200
  );

-- Make PostgREST pick the new columns up immediately.
notify pgrst, 'reload schema';
