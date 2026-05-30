import { requireSupabase } from '../lib/supabase';
import { buildBookingSlotFromKey, toDateKey, isPastTimeSlot } from '../lib/bookingSlot';

function normalizeDateKey(value) {
  if (!value) return '';
  return String(value).slice(0, 10);
}

function groupSlotsByDate(rows) {
  const map = {};
  for (const row of rows ?? []) {
    const dateKey = normalizeDateKey(row.slot_date);
    if (!dateKey) continue;
    if (!map[dateKey]) map[dateKey] = [];
    if (!map[dateKey].includes(row.slot_time)) {
      map[dateKey].push(row.slot_time);
    }
  }
  for (const key of Object.keys(map)) {
    map[key].sort();
  }
  return map;
}

function isMissingSchemaError(error) {
  const msg = (error?.message ?? error?.code ?? '').toLowerCase();
  return (
    msg.includes('booking_availability') ||
    msg.includes('get_available_booking_slots') ||
    msg.includes('does not exist') ||
    msg.includes('could not find') ||
    msg.includes('pgrst202') ||
    msg.includes('pgrst205') ||
    msg.includes('42p01')
  );
}

const SETUP_HINT =
  'Les créneaux ne sont pas encore activés sur le serveur. L\'administrateur doit exécuter supabase/RUN_NOW.sql dans Supabase (SQL Editor).';

export function isAvailabilitySetupError(error) {
  const msg = (error?.message ?? String(error ?? '')).toLowerCase();
  return (
    msg.includes('run_now.sql') ||
    msg.includes('setup_booking') ||
    msg.includes('configuration supabase') ||
    msg.includes('booking_availability') ||
    msg.includes('pgrst205') ||
    msg.includes('could not find the table')
  );
}

async function fetchSlotsFromTable(client, fromDateKey, toDateKey) {
  const nowIso = new Date().toISOString();
  const { data, error } = await client
    .from('booking_availability')
    .select('slot_date, slot_time')
    .gte('slot_date', fromDateKey)
    .lte('slot_date', toDateKey)
    .gt('starts_at', nowIso)
    .order('slot_date')
    .order('slot_time');

  if (error) throw error;

  const filtered = (data ?? []).filter(
    (row) => !isPastTimeSlot(normalizeDateKey(row.slot_date), row.slot_time),
  );
  return groupSlotsByDate(filtered);
}

export async function fetchPublicAvailableSlots(fromDateKey, toDateKey) {
  const client = requireSupabase();

  const { data, error } = await client.rpc('get_available_booking_slots', {
    p_from: fromDateKey,
    p_to: toDateKey,
  });

  if (!error) {
    return groupSlotsByDate(data);
  }

  if (isMissingSchemaError(error)) {
    try {
      return await fetchSlotsFromTable(client, fromDateKey, toDateKey);
    } catch (tableError) {
      if (isMissingSchemaError(tableError)) {
        throw new Error(SETUP_HINT);
      }
      throw new Error(tableError.message ?? SETUP_HINT);
    }
  }

  throw new Error(error.message);
}

export async function fetchAdminAvailabilityForMonth(year, monthIndex) {
  const client = requireSupabase();
  const from = toDateKey(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const to = toDateKey(year, monthIndex, lastDay);

  const { data, error } = await client
    .from('booking_availability')
    .select('slot_date, slot_time, starts_at')
    .gte('slot_date', from)
    .lte('slot_date', to)
    .order('slot_date')
    .order('slot_time');

  if (error) {
    if (isMissingSchemaError(error)) throw new Error(SETUP_HINT);
    throw new Error(error.message);
  }
  return groupSlotsByDate(data);
}

export async function fetchBookedSlotsForMonth(year, monthIndex) {
  const client = requireSupabase();
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();

  const startIso = new Date(year, monthIndex, 1).toISOString();
  const endIso = new Date(year, monthIndex, lastDay, 23, 59, 59).toISOString();

  const { data, error } = await client
    .from('bookings')
    .select('starts_at, display_time, status')
    .eq('status', 'confirmed')
    .gte('starts_at', startIso)
    .lte('starts_at', endIso);

  if (error) throw new Error(error.message);

  const map = {};
  for (const row of data ?? []) {
    const d = new Date(row.starts_at);
    const dateKey = toDateKey(d.getFullYear(), d.getMonth(), d.getDate());
    const time = row.display_time?.replace('h', ':') || `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    if (!map[dateKey]) map[dateKey] = [];
    if (!map[dateKey].includes(time)) map[dateKey].push(time);
  }
  return map;
}

export async function openAvailabilitySlot(dateKey, time) {
  const client = requireSupabase();
  const slot = buildBookingSlotFromKey(dateKey, time);

  const { error } = await client.from('booking_availability').upsert(
    {
      starts_at: slot.startsAt,
      slot_date: dateKey,
      slot_time: time,
    },
    { onConflict: 'starts_at' },
  );

  if (error) {
    if (isMissingSchemaError(error)) throw new Error(SETUP_HINT);
    throw new Error(error.message);
  }
}

export async function closeAvailabilitySlot(dateKey, time) {
  const client = requireSupabase();
  const { error } = await client
    .from('booking_availability')
    .delete()
    .eq('slot_date', dateKey)
    .eq('slot_time', time);

  if (error) throw new Error(error.message);
}

export async function isSlotStillAvailable(dateKey, time) {
  const slots = await fetchPublicAvailableSlots(dateKey, dateKey);
  return (slots[dateKey] ?? []).includes(time);
}
