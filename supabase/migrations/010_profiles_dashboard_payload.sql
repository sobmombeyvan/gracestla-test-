-- Store dynamic dashboard fields for each profile

alter table public.profiles
  add column if not exists dashboard_payload jsonb not null default '{}'::jsonb;
