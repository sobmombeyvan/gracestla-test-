import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { completeOnboarding } from '../../services/profiles';
import { getDashboardPath } from '../../utils/userDisplay';
import '../styles/dashboard.css';

const RoleOnboarding = () => {
  const navigate = useNavigate();
  const { user, refreshProfile, isAdmin, profile } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!user) return;
    if (isAdmin) {
      navigate('/dashboard/admin', { replace: true });
      return;
    }
    if (profile?.onboarding_completed) {
      navigate(getDashboardPath(profile.role), { replace: true });
    }
  }, [user, profile, isAdmin, navigate]);

  if (!user || !profile) {
    return (
      <div className="login-page">
        <div className="login-card">
          <p>Chargement…</p>
        </div>
      </div>
    );
  }

  const role = profile.role === 'family' ? 'family' : 'aupair';

  return (
    <div className="login-page login-page--pro">
      <div className="login-card login-card--pro" style={{ maxWidth: 440 }}>
        <h1>Bienvenue</h1>
        <p className="login-lead">
          Votre compte est configuré en tant que <strong>{role === 'family' ? 'famille d’accueil' : 'au pair'}</strong>.
        </p>
        {error && <p className="login-hint login-hint--warn">{error}</p>}
        <button
          type="button"
          className="login-btn"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              await completeOnboarding(user.id);
              await refreshProfile();
              navigate(getDashboardPath(role), { replace: true });
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Erreur');
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? 'Accès…' : 'Accéder à mon espace'}
        </button>
      </div>
    </div>
  );
};

export default RoleOnboarding;