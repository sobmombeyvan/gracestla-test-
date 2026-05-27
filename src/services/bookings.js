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

  const { data, error } = await client
    .from('bookings')
    .insert({
      submission_id: submissionId || null,
      email: email || null,
      name: name || null,
      starts_at: startsAt,
      display_date: displayDate,
      display_time: displayTime,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await sendNotification({
    event: 'booking_confirmed',
    record: data,
  }).catch(() => {});

  return data;
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
