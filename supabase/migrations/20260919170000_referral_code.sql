-- Brand Ambassador links (Sep 2026): theatlaslist.club/r/<instagram-handle>
-- sets a 30-day first-party cookie; /api/apply copies it here. Kept separate
-- from the utm_* columns so paid campaigns and ambassadors never mix.
-- Nullable, no RLS change (anon stays INSERT-only with status = 'pending').

alter table public.lead_applications
  add column if not exists referral_code text;

alter table public.lead_applications
  drop constraint if exists lead_applications_referral_code_format;
alter table public.lead_applications
  add constraint lead_applications_referral_code_format check (
    referral_code is null or referral_code ~ '^[a-z0-9._]{1,30}$'
  );

create index if not exists lead_applications_referral_code_idx
  on public.lead_applications (referral_code)
  where referral_code is not null;

notify pgrst, 'reload schema';
