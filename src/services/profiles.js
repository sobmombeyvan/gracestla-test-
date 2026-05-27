import { requireSupabase } from '../lib/supabase';
import { getInitials } from '../utils/userDisplay';
import { isSiteOwnerAdminUser } from '../utils/siteOwner';

export const PENDING_ROLE_KEY = 'grace_auth_role';

export function savePendingRole(role) {
  if (!['aupair', 'family'].includes(role)) return;
  sessionStorage.setItem(PENDING_ROLE_KEY, role);
}

export function peekPendingRole() {
  const role = sessionStorage.getItem(PENDING_ROLE_KEY);
  return role && ['aupair', 'family'].includes(role) ? role : null;
}

export function consumePendingRole() {
  const role = peekPendingRole();
  sessionStorage.removeItem(PENDING_ROLE_KEY);
  return role;
}

export async function fetchProfile(userId) {
  const client = requireSupabase();
  const { data, error } = await client.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function getMyRole() {
  const client = requireSupabase();
  const { data, error } = await client.rpc('get_my_role');
  if (error) throw new Error(error.message);
  return data;
}

function resolveSignupRole(user, pendingRole) {
  const meta = user.user_metadata || {};
  const metaRole = meta.role;
  if (pendingRole && ['aupair', 'family'].includes(pendingRole)) return pendingRole;
  if (metaRole && ['aupair', 'family'].includes(metaRole)) return metaRole;
  return 'aupair';
}

export async function ensureProfileAfterAuth(user) {
  const client = requireSupabase();
  const pendingRole = consumePendingRole();
  const forceAdmin = isSiteOwnerAdminUser(user);
  const lockedRole = forceAdmin ? 'admin' : resolveSignupRole(user, pendingRole);
  const meta = user.user_metadata || {};
  const fullName = meta.full_name || meta.name || user.email?.split('@')[0] || '';
  const avatarUrl = meta.avatar_url || meta.picture || null;
  const phone = meta.phone || null;
  const country = meta.country || null;

  let profile = await fetchProfile(user.id);

  if (!profile) {
    const { data, error } = await client
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        role: forceAdmin ? 'admin' : lockedRole,
        full_name: fullName,
        avatar_url: avatarUrl,
        phone,
        country,
        onboarding_completed: true,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    profile = data;
  } else {
    const patch = {
      full_name: profile.full_name || fullName,
      avatar_url: profile.avatar_url || avatarUrl,
      updated_at: new Date().toISOString(),
      onboarding_completed: true,
    };
    if (phone) patch.phone = phone;
    if (country) patch.country = country;
    if (forceAdmin) {
      patch.role = 'admin';
    } else if (profile.role !== 'admin' && profile.onboarding_completed === false) {
      patch.role = pendingRole && ['aupair', 'family'].includes(pendingRole) ? pendingRole : lockedRole;
    }

    const { data, error } = await client.from('profiles').update(patch).eq('id', user.id).select().single();
    if (error) throw new Error(error.message);
    profile = data;
  }

  return profile;
}

export async function completeOnboarding(userId) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .update({
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export function profileNeedsOnboarding(profile, isAdmin) {
  if (isAdmin) return false;
  if (!profile) return true;
  return profile.onboarding_completed === false;
}

export async function fetchAllProfiles() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('id, email, role, full_name, created_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateProfile(userId, patch) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export function getDashboardPayload(profile) {
  const payload = profile?.dashboard_payload;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return {};
  return payload;
}

export async function updateDashboardPayload(userId, payloadPatch) {
  const client = requireSupabase();
  const current = await fetchProfile(userId);
  const mergedPayload = {
    ...getDashboardPayload(current),
    ...(payloadPatch || {}),
  };
  return updateProfile(userId, { dashboard_payload: mergedPayload });
}

export async function uploadProfileAvatar(file) {
  const client = requireSupabase();
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError) throw new Error(authError.message);
  const userId = authData?.user?.id;
  if (!userId) throw new Error('Utilisateur non authentifié.');
  if (!file) throw new Error('Fichier manquant.');

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `avatars/${userId}/${Date.now()}-${safeName}`;
  const { error: uploadError } = await client.storage
    .from('documents')
    .upload(storagePath, file, { upsert: false });
  if (uploadError) throw new Error(uploadError.message);

  const { data: publicData } = client.storage.from('documents').getPublicUrl(storagePath);
  const avatarUrl = publicData?.publicUrl || '';
  if (!avatarUrl) throw new Error('Impossible de générer l’URL de la photo.');

  const updated = await updateProfile(userId, { avatar_url: avatarUrl });
  return updated;
}

export function deriveNameParts(profile, authUser) {
  const full =
    profile?.full_name ||
    authUser?.user_metadata?.full_name ||
    authUser?.user_metadata?.name ||
    authUser?.email?.split('@')[0] ||
    '';
  const parts = full.trim().split(/\s+/).filter(Boolean);
  return {
    fullName: full,
    firstName: parts[0] || '',
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : '',
    initials: getInitials(full || authUser?.email || '?'),
  };
}
