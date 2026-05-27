export function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function buildDashboardUser(profile, authUser) {
  const name =
    profile?.full_name ||
    authUser?.user_metadata?.full_name ||
    authUser?.user_metadata?.name ||
    authUser?.email?.split('@')[0] ||
    'Utilisateur';

  const roleLabels = {
    aupair: 'Au Pair',
    family: 'Famille',
    admin: 'Administrateur',
  };

  return {
    name,
    initials: getInitials(name),
    role: roleLabels[profile?.role] || 'Membre',
    avatarUrl: profile?.avatar_url || authUser?.user_metadata?.avatar_url || authUser?.user_metadata?.picture,
  };
}

export function getDashboardPath(effectiveRole) {
  if (effectiveRole === 'admin') return '/dashboard/admin';
  if (effectiveRole === 'family') return '/dashboard/family';
  return '/dashboard/aupair';
}
