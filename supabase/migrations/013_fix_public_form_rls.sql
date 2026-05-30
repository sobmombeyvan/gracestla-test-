-- Fix RLS: les visiteurs (anon) peuvent insérer mais pas SELECT → .insert().select() échoue.
-- Solution: fonctions RPC security definer + réapplication des policies publiques.

-- ── Policies form_submissions ──────────────────────────────────────────────
drop policy if exists "form_submissions_insert_public" on public.form_submissions;
create policy "form_submissions_insert_public"
  on public.form_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "form_submissions_select_admin" on public.form_submissions;
create policy "form_submissions_select_admin"
  on public.form_submissions
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "form_submissions_update_admin" on public.form_submissions;
create policy "form_submissions_update_admin"
  on public.form_submissions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Policies bookings ──────────────────────────────────────────────────────
drop policy if exists "bookings_insert_public" on public.bookings;
create policy "bookings_insert_public"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "bookings_select_admin" on public.bookings;
create policy "bookings_select_admin"
  on public.bookings
  for select
  to authenticated
  using (public.is_admin());

-- ── RPC: soumission publique (retourne la ligne insérée) ───────────────────
create or replace function public.create_form_submission(
  p_type text,
  p_email text,
  p_name text,
  p_payload jsonb default '{}'::jsonb
)
returns public.form_submissions
language plpgsql
security definer
set search_path = public
as $$
declare
  rec public.form_submissions;
begin
  if p_type not in ('contact', 'aupair', 'family', 'reservation') then
    raise exception 'Type de formulaire invalide: %', p_type;
  end if;

  insert into public.form_submissions (type, email, name, payload)
  values (
    p_type,
    nullif(trim(coalesce(p_email, '')), ''),
    nullif(trim(coalesce(p_name, '')), ''),
    coalesce(p_payload, '{}'::jsonb)
  )
  returning * into rec;

  return rec;
end;
$$;

grant execute on function public.create_form_submission(text, text, text, jsonb) to anon, authenticated;

-- ── RPC: réservation publique ──────────────────────────────────────────────
create or replace function public.create_public_booking(
  p_submission_id uuid,
  p_email text,
  p_name text,
  p_starts_at timestamptz,
  p_display_date text,
  p_display_time text
)
returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  rec public.bookings;
begin
  insert into public.bookings (
    submission_id,
    email,
    name,
    starts_at,
    display_date,
    display_time
  )
  values (
    p_submission_id,
    nullif(trim(coalesce(p_email, '')), ''),
    nullif(trim(coalesce(p_name, '')), ''),
    p_starts_at,
    p_display_date,
    p_display_time
  )
  returning * into rec;

  return rec;
end;
$$;

grant execute on function public.create_public_booking(uuid, text, text, timestamptz, text, text) to anon, authenticated;
