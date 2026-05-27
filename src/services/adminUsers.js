import { requireSupabase } from '../lib/supabase';

function isMissingDbObject(error) {
  const msg = (error?.message || '').toLowerCase();
  return (
    msg.includes('does not exist') ||
    msg.includes('could not find') ||
    msg.includes('undefined column') ||
    msg.includes('relation')
  );
}

function toAdminError(error, fallbackMessage) {
  const msg = error?.message || fallbackMessage || 'Erreur Supabase';
  if (isMissingDbObject(error)) {
    return new Error(
      "La base Supabase n'est pas complete pour l'admin. Executez les migrations SQL 001 a 010 puis rechargez.",
    );
  }
  return new Error(msg);
}

export async function fetchAllowlistEmails() {
  const client = requireSupabase();
  const { data, error } = await client.rpc('admin_get_allowlist');
  if (error) throw toAdminError(error, 'Impossible de charger la liste admin.');
  return (data ?? []).map((r) => r.email?.toLowerCase()).filter(Boolean);
}

export async function fetchAllProfilesAdmin() {
  const client = requireSupabase();
  const { data, error } = await client.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) throw toAdminError(error, 'Impossible de charger les utilisateurs.');

  return (data ?? []).map((row) => ({
    ...row,
    role: row.role || 'aupair',
    kyc_status: row.kyc_status || 'none',
    onboarding_completed: Boolean(row.onboarding_completed),
  }));
}

export async function setProfileRole(userId, role) {
  const client = requireSupabase();
  const { data, error } = await client.rpc('admin_set_profile_role', {
    target_user_id: userId,
    new_role: role,
  });
  if (error) throw toAdminError(error, 'Impossible de changer le role.');
  return data;
}

export async function setKycStatus(userId, status) {
  const client = requireSupabase();
  const { data, error } = await client.rpc('admin_set_kyc_status', {
    target_user_id: userId,
    new_status: status,
  });
  if (error) throw toAdminError(error, 'Impossible de changer le statut KYC.');
  return data;
}

export async function grantAdminAccess(email) {
  const client = requireSupabase();
  const { error } = await client.rpc('admin_grant_admin_access', { target_email: email });
  if (error) throw toAdminError(error, 'Impossible de nommer cet utilisateur admin.');
}

export async function revokeAdminAccess(email) {
  const client = requireSupabase();
  const { error } = await client.rpc('admin_revoke_admin_access', { target_email: email });
  if (error) throw toAdminError(error, 'Impossible de retirer les droits admin.');
}

export async function fetchUserAdminBundle(userId, email) {
  const client = requireSupabase();

  const [profileRes, docsRes, famQRes, apQRes, formsRes] = await Promise.all([
    client.from('profiles').select('*').eq('id', userId).maybeSingle(),
    client.from('documents').select('*').eq('owner_id', userId).order('created_at', { ascending: false }),
    client.from('family_questionnaires').select('*').eq('user_id', userId).maybeSingle(),
    client.from('aupair_questionnaires').select('*').eq('user_id', userId).maybeSingle(),
    email
      ? client.from('form_submissions').select('*').ilike('email', email).order('created_at', { ascending: false }).limit(20)
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (profileRes.error) throw toAdminError(profileRes.error, 'Impossible de charger le profil utilisateur.');

  return {
    profile: profileRes.data,
    documents: docsRes.error ? [] : docsRes.data ?? [],
    familyQuestionnaire: famQRes.error ? null : famQRes.data,
    aupairQuestionnaire: apQRes.error ? null : apQRes.data,
    formSubmissions: formsRes.error ? [] : formsRes.data ?? [],
  };
}
