import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isSupabaseConfigured } from '../../lib/supabase';
import { signInWithPassword } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import { getDashboardPath } from '../../utils/userDisplay';
import '../styles/dashboard.css';

const DashboardLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, profile, effectiveRole, needsOnboarding, loading: authLoading, refreshProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!session) return;
    const path = needsOnboarding ? '/dashboard/bienvenue' : getDashboardPath(effectiveRole || profile?.role || 'aupair');
    navigate(path, { replace: true });
  }, [session, effectiveRole, needsOnboarding, profile, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!isSupabaseConfigured) {
      setError('Service indisponible. Configuration Supabase requise.');
      return;
    }
    setLoading(true);
    try {
      await signInWithPassword(email, password);
      await refreshProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page login-page--pro">
      <div className="login-shell">
        <aside className="login-aside">
          <img
            src="https://i.ibb.co/hJZCdQZV/a58c51a0-e528-4428-9001-dc5f2980819c.jpg"
            alt="Grâce est là"
            className="login-aside-logo"
          />
          <h2 className="login-aside-title">Mon espace</h2>
          <p className="login-aside-text">
            Suivez votre dossier, vos échanges et votre parcours au pair en toute confidentialité.
          </p>
        </aside>

        <div className="login-card login-card--pro">
          <h1>Connexion</h1>
          <p className="login-lead">Accédez à votre tableau de bord personnel.</p>

          {location.state?.authRequired && (
            <p className="login-hint login-hint--warn">Identifiez-vous pour continuer.</p>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email">Adresse email</label>
              <input
                id="login-email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="login-field">
              <label htmlFor="login-password">Mot de passe</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p className="login-hint login-hint--warn">{error}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          <p className="login-signup-prompt">
            Pas encore de compte ? <Link to="/dashboard/inscription">Créer un compte</Link>
          </p>

          <p className="login-footer-note">
            <Link to="/">← Retour au site</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
