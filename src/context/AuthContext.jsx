import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { checkIsAdmin, signOut as authSignOut } from '../services/auth';
import { ensureProfileAfterAuth, fetchProfile, getMyRole, profileNeedsOnboarding } from '../services/profiles';
import { getDashboardPath } from '../utils/userDisplay';
import { isSiteOwnerAdminUser } from '../utils/siteOwner';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [effectiveRole, setEffectiveRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const loadUserData = useCallback(async (activeSession) => {
    if (!activeSession?.user) {
      setProfile(null);
      setEffectiveRole(null);
      setIsAdmin(false);
      return;
    }

    try {
      if (isSiteOwnerAdminUser(activeSession.user)) {
        try {
          await ensureProfileAfterAuth(activeSession.user);
        } catch {
          /* keep loading with existing profile */
        }
      }

      const [prof, admin, role] = await Promise.all([
        fetchProfile(activeSession.user.id).catch(() => null),
        checkIsAdmin().catch(() => false),
        getMyRole().catch(() => null),
      ]);
      setProfile(prof);
      const owner = isSiteOwnerAdminUser(activeSession.user);
      const treatAsAdmin = admin || owner;
      setIsAdmin(treatAsAdmin);
      const resolved = treatAsAdmin ? 'admin' : role || prof?.role || null;
      setEffectiveRole(resolved);
    } catch {
      setProfile(null);
      setEffectiveRole(null);
      setIsAdmin(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session) await loadUserData(session);
  }, [session, loadUserData]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadUserData(data.session).finally(() => setLoading(false));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      loadUserData(nextSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadUserData]);

  const needsOnboarding = useMemo(
    () => Boolean(session && profileNeedsOnboarding(profile, isAdmin)),
    [session, profile, isAdmin],
  );

  const signOut = useCallback(async () => {
    await authSignOut();
    setSession(null);
    setProfile(null);
    setEffectiveRole(null);
    setIsAdmin(false);
  }, []);

  const dashboardPath =
    needsOnboarding ? '/dashboard/bienvenue' : effectiveRole ? getDashboardPath(effectiveRole) : '/dashboard';

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        effectiveRole,
        isAdmin,
        needsOnboarding,
        loading,
        signOut,
        refreshProfile,
        dashboardPath,
        isConfigured: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
