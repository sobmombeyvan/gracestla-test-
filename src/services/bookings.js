import { requireSupabase } from '../lib/supabase';
import { sendNotification } from './notifications';

export async function createBooking({
  submissionId,
  email,
  name,
  startsAt,
  displayDate,
  displayTime,
}) {
  const client = requireSupabase();

  const { data, error } = await client.rpc('create_public_booking', {
    p_submission_id: submissionId || null,
    p_email: email || null,
    p_name: name || null,
    p_starts_at: startsAt,
    p_display_date: displayDate,
    p_display_time: displayTime,
  });

  if (error) {
    const msg = error.message || '';
    if (msg.toLowerCase().includes('row-level security') || msg.includes('create_public_booking')) {
      throw new Error(
        'Réservation refusée (RLS). Exécutez la migration 013_fix_public_form_rls.sql sur Supabase.',
      );
    }
    throw new Error(error.message);
  }

  const row = Array.isArray(data) ? data[0] : data;

  await sendNotification({
    event: 'booking_confirmed',
    record: row,
  }).catch(() => {});

  return row;
}

export async function fetchBookings(limit = 50) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('bookings')
    .select('*')
    .order('starts_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}
