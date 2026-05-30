-- Ouvre tous les créneaux standards pour les 120 prochains jours (optionnel si VITE_OPEN_ALL_BOOKING_SLOTS=true côté app).
-- Exécuter dans Supabase SQL Editor si vous préférez gérer les créneaux uniquement en base.

insert into public.booking_availability (starts_at, slot_date, slot_time)
select
  ((d.dt + t.tm::time) at time zone 'Europe/Paris')::timestamptz as starts_at,
  d.dt::date as slot_date,
  t.tm as slot_time
from
  generate_series(current_date, current_date + interval '120 days', interval '1 day') as d(dt),
  (values
    ('09:00'), ('09:30'), ('10:00'), ('10:30'), ('11:00'), ('11:30'),
    ('14:00'), ('14:30'), ('15:00'), ('15:30'), ('16:00'), ('16:30')
  ) as t(tm)
where ((d.dt + t.tm::time) at time zone 'Europe/Paris')::timestamptz > now()
on conflict (starts_at) do nothing;
