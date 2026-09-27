-- Door form (Sep 2026) asks each guest's gender so the team can balance the
-- room. Nullable; only the door form sends it. RLS unchanged.
alter table public.lead_applications
  add column if not exists gender text;
alter table public.lead_applications
  drop constraint if exists lead_applications_gender_values;
alter table public.lead_applications
  add constraint lead_applications_gender_values check (
    gender is null or gender in ('woman', 'man', 'non-binary')
  );
notify pgrst, 'reload schema';
