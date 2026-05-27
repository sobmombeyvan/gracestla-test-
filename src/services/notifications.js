import { requireSupabase } from '../lib/supabase';

export async function sendNotification(body) {
  const client = requireSupabase();
  const { data, error } = await client.functions.invoke('send-notification', { body });
  if (error) throw new Error(error.message);
  return data;
}
