import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { ensureProfileAfterAuth, profileNeedsOnboarding } from '../../services/profiles';
import { checkIsAdmin } from '../../services/auth';
import { getDashboardPath } from '../../utils/userDisplay';
import { isSiteOwnerAdminUser } from '../../utils/siteOwner';
import { useAuth } from '../../context/AuthContext';
import '../styles/dashboard.css';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase non configuré.');
      return;
    }

    const finish = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!data.session?.user) {
          navigate('/dashboard', { replace: true });
          return;
        }

        const profile = await ensureProfileAfterAuth(data.session.user);
        await refreshProfile();

        const admin = await checkIsAdmin().catch(() => false);
        if (admin || isSiteOwnerAdminUser(data.session.user)) {
          navigate('/dashboard/admin', { replace: true });
          return;
        }

        if (profileNeedsOnboarding(profile, false)) {
          navigate('/dashboard/bienvenue', { replace: true });
          return;
        }

        navigate(getDashboardPath(profile?.role || 'aupair'), { replace: true });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de connexion');
      }
    };

    finish();
  }, [navigate, refreshProfile]);

  if (error) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Connexion interrompue</h1>
          <p style={{ color: '#b42318', fontSize: '0.9rem' }}>{error}</p>
          <a href="/dashboard" className="login-btn" style={{ display: 'inline-block', textAlign: 'center', marginTop: '1rem' }}>
            Réessayer
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <p style={{ textAlign: 'center', color: '#8B6B56' }}>Connexion en cours…</p>
      </div>
    </div>
  );
};

export default AuthCallback;
