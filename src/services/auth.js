import { requireSupabase, supabase } from '../lib/supabase';

export function getAuthRedirectUrl() {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/dashboard/auth/callback`;
}

export async function signInWithPassword(email, password) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signUpWithPassword(email, password, metadata = {}) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: getAuthRedirectUrl(),
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function resendSignupConfirmation(email) {
  const client = requireSupabase();
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (!normalizedEmail) {
    throw new Error('Adresse email manquante.');
  }
  const { error } = await client.auth.resend({
    type: 'signup',
    email: normalizedEmail,
    options: {
      emailRedirectTo: getAuthRedirectUrl(),
    },
  });
  if (error) throw new Error(error.message);
}

export async function signInWithGoogle() {
  throw new Error('Connexion Google temporairement désactivée.');
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut();
}

export async function getSession() {
  const client = requireSupabase();
  const { data } = await client.auth.getSession();
  return data.session;
}

export async function checkIsAdmin() {
  const client = requireSupabase();
  const { data, error } = await client.rpc('is_admin');
  if (error) throw new Error(error.message);
  return Boolean(data);
}

/** @deprecated use signInWithPassword */
export const signInAdmin = signInWithPassword;
