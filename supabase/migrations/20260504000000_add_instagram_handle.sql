alter table public.lead_applications
  add column if not exists instagram_handle text;
