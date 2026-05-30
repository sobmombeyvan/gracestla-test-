/**
 * Smoke test Supabase public APIs used by the app.
 * Run: node scripts/smoke-test.mjs
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dir, '../.env'), 'utf8');
let url = '';
let key = '';
for (const line of env.split('\n')) {
  const u = line.match(/^VITE_SUPABASE_URL=(.+)$/);
  if (u) url = u[1].trim().replace(/^["']|["']$/g, '');
  const k = line.match(/^VITE_SUPABASE_ANON_KEY=(.+)$/);
  if (k) key = k[1].trim().replace(/^["']|["']$/g, '');
}

const sb = createClient(url, key);
const results = [];

async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (e) {
    results.push({ name, ok: false, error: e.message });
  }
}

const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth() + 1).padStart(2, '0');
const from = `${y}-${m}-01`;
const to = `${y}-${m}-28`;

await check('booking_availability table readable', async () => {
  const { error } = await sb.from('booking_availability').select('id').limit(1);
  if (error) throw error;
});

await check('get_available_booking_slots RPC', async () => {
  const { error } = await sb.rpc('get_available_booking_slots', { p_from: from, p_to: to });
  if (error) throw error;
});

await check('create_form_submission RPC', async () => {
  const { data, error } = await sb.rpc('create_form_submission', {
    p_type: 'contact',
    p_email: 'smoke-test@graceestla.local',
    p_name: 'Smoke Test',
    p_payload: { source: 'smoke-test', ts: new Date().toISOString() },
  });
  if (error) throw error;
  if (!data?.id) throw new Error('No id returned');
});

await check('create_public_booking RPC', async () => {
  const start = new Date();
  start.setDate(start.getDate() + 14);
  start.setHours(10, 0, 0, 0);
  const { data, error } = await sb.rpc('create_public_booking', {
    p_submission_id: null,
    p_email: 'smoke-test@graceestla.local',
    p_name: 'Smoke Test',
    p_starts_at: start.toISOString(),
    p_display_date: 'Test',
    p_display_time: '10h00',
  });
  if (error) throw error;
  if (!data?.id) throw new Error('No id returned');
});

let failed = 0;
for (const r of results) {
  if (r.ok) console.log(`✅ ${r.name}`);
  else {
    console.log(`❌ ${r.name}: ${r.error}`);
    failed++;
  }
}
process.exit(failed ? 1 : 0);
