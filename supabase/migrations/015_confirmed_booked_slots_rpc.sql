-- Créneaux confirmés (lecture publique via RPC security definer — les clients anon ne peuvent pas SELECT bookings)

create or replace function public.get_confirmed_booked_slots(p_from date, p_to date)
returns table (slot_date date, slot_time text)
language sql
stable
security definer
set search_path = public
as $$
  select distinct
    (b.starts_at at time zone 'Europe/Paris')::date as slot_date,
    to_char(b.starts_at at time zone 'Europe/Paris', 'HH24:MI') as slot_time
  from public.bookings b
  where b.status = 'confirmed'
    and (b.starts_at at time zone 'Europe/Paris')::date between p_from and p_to;
$$;

grant execute on function public.get_confirmed_booked_slots(date, date) to anon, authenticated;
