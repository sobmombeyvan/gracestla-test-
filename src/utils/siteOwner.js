/**
 * Identities that must land on the admin dashboard after login.
 * Prefer env VITE_SITE_OWNER_EMAILS (comma-separated) for deploy-specific admins.
 */
const DEFAULT_OWNER_EMAILS = ['sobmombeyvan@gmail.com'];

function parseEnvEmailList(raw) {
  if (!raw || typeof raw !== 'string') return [];
  return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
}

export function isSiteOwnerAdminUser(user) {
  const email = (user?.email || '').trim().toLowerCase();
  if (!email) return false;
  const fromEnv = parseEnvEmailList(import.meta.env?.VITE_SITE_OWNER_EMAILS);
  const allowed = new Set([...DEFAULT_OWNER_EMAILS, ...fromEnv]);
  return allowed.has(email);
}
