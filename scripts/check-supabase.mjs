#!/usr/bin/env node
/** Vérifie que booking_availability existe sur Supabase */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, '../.env');
let url = process.env.VITE_SUPABASE_URL;
let key = process.env.VITE_SUPABASE_ANON_KEY;

try {
  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^VITE_SUPABASE_URL=(.+)$/);
    if (m) url = m[1].trim().replace(/^["']|["']$/g, '');
    const k = line.match(/^VITE_SUPABASE_ANON_KEY=(.+)$/);
    if (k) key = k[1].trim().replace(/^["']|["']$/g, '');
  }
} catch { /* ignore */ }

if (!url || !key) {
  console.error('❌ VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant dans .env');
  process.exit(1);
}

const headers = { apikey: key, Authorization: `Bearer ${key}` };

const res = await fetch(`${url}/rest/v1/booking_availability?select=id&limit=1`, { headers });
if (res.ok) {
  console.log('✅ Table booking_availability — OK');
  process.exit(0);
}

const body = await res.text();
if (body.includes('PGRST205') || body.includes('booking_availability')) {
  console.error('❌ Table booking_availability ABSENTE sur Supabase');
  console.error('');
  console.error('→ Ouvrez : https://supabase.com/dashboard/project/bhkzezfufndflmdzerjj/sql/new');
  console.error('→ Collez le fichier : supabase/RUN_NOW.sql');
  console.error('→ Cliquez Run');
  console.error('→ Relancez : node scripts/check-supabase.mjs');
  process.exit(1);
}

console.error('❌ Erreur Supabase:', res.status, body);
process.exit(1);
