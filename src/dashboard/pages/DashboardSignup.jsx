import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Users } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { signUpWithPassword, signInWithPassword } from '../../services/auth';
import { savePendingRole } from '../../services/profiles';
import { useAuth } from '../../context/AuthContext';
import '../styles/dashboard.css';

const COUNTRY_OPTIONS = [
  'France',
  'Belgique',
  'Suisse',
  'Canada',
  'Luxembourg',
  'Cote d\'Ivoire',
  'Senegal',
  'Cameroun',
  'Maroc',
  'Tunisie',
  'Algerie',
  'Autre',
];

const passwordRules = {
  minLength: (value) => value.length >= 8,
  upper: (value) => /[A-Z]/.test(value),
  lower: (value) => /[a-z]/.test(value),
  digit: (value) => /\d/.test(value),
  special: (value) => /[^A-Za-z0-9]/.test(value),
};

const DashboardSignup = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'family' ? 'family' : 'aupair';
  const [accountType, setAccountType] = useState(initialType);
  const [roleLocked, setRoleLocked] = useState(Boolean(searchParams.get('type')));

  useEffect(() => {
    savePendingRole(initialType);
  }, [initialType]);

  const lockRole = (role) => {
    setAccountType(role);
    setRoleLocked(true);
    savePendingRole(role);
  };
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const isPasswordValid = Object.values(passwordRules).every((checkRule) => checkRule(password));
    if (!isPasswordValid) {
      setError('Le mot de passe ne respecte pas les criteres de securite.');
      return;
    }
    if (password !== confirmPassword) {
      setError('La confirmation du mot de passe ne correspond pas.');
      return;
    }

    if (!isSupabaseConfigured) {
      setError('Service indisponible. Configuration Supabase requise.');
      return;
    }
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const data = await signUpWithPassword(email, password, {
        role: accountType,
        full_name: fullName.trim(),
        phone: phone.trim(),
        country: country.trim(),
      });

      if (data.session) {
        await refreshProfile();
        const role = data.user?.user_metadata?.role || accountType;
        navigate(role === 'family' ? '/dashboard/family' : '/dashboard/aupair', { replace: true });
        return;
      }

      // Pas de session après inscription : connexion directe (sans email de confirmation)
      try {
        const login = await signInWithPassword(normalizedEmail, password);
        if (login.session) {
          await refreshProfile();
          const role = login.user?.user_metadata?.role || accountType;
          navigate(role === 'family' ? '/dashboard/family' : '/dashboard/aupair', { replace: true });
          return;
        }
      } catch {
        /* connexion immédiate impossible */
      }

      setMessage('Compte créé. Connectez-vous avec votre email et mot de passe.');
      navigate('/dashboard', { replace: true, state: { signupEmail: normalizedEmail } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Création de compte impossible');
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = {
    minLength: passwordRules.minLength(password),
    upper: passwordRules.upper(password),
    lower: passwordRules.lower(password),
    digit: passwordRules.digit(password),
    special: passwordRules.special(password),
  };
  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  return (
    <div className="login-page login-page--pro">
      <div className="login-shell">
        <aside className="login-aside">
          <img
            src="https://i.ibb.co/hJZCdQZV/a58c51a0-e528-4428-9001-dc5f2980819c.jpg"
            alt="Grâce est là"
            className="login-aside-logo"
          />
          <h2 className="login-aside-title">Se connecter</h2>
          <p className="login-aside-text">
            Rejoignez la plateforme en tant qu’au pair ou famille d’accueil. Votre espace sera configuré automatiquement.
          </p>
        </aside>

        <div className="login-card login-card--pro">
          <h1>Inscription</h1>
          <p className="login-lead">Je m’inscris en tant que…</p>

          <div className="signup-type-grid">
            <button
              type="button"
              className={`signup-type-card ${accountType === 'aupair' ? 'selected' : ''}`}
              onClick={() => lockRole('aupair')}
              disabled={roleLocked && accountType !== 'aupair'}
            >
              <User size={22} />
              <span>Au pair</span>
            </button>
            <button
              type="button"
              className={`signup-type-card ${accountType === 'family' ? 'selected' : ''}`}
              onClick={() => lockRole('family')}
              disabled={roleLocked && accountType !== 'family'}
            >
              <Users size={22} />
              <span>Famille</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Nom complet</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Ex: Mariam Diallo"
              />
            </div>
            <div className="login-field">
              <label>Numéro de téléphone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="tel"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            <div className="login-field">
              <label>Pays</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                autoComplete="country-name"
              >
                <option value="" disabled>Choisissez votre pays</option>
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="login-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="login-field">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <ul className="password-criteria">
              <li className={passwordChecks.minLength ? 'valid' : ''}>Au moins 8 caracteres</li>
              <li className={passwordChecks.upper ? 'valid' : ''}>Au moins une lettre majuscule</li>
              <li className={passwordChecks.lower ? 'valid' : ''}>Au moins une lettre minuscule</li>
              <li className={passwordChecks.digit ? 'valid' : ''}>Au moins un chiffre</li>
              <li className={passwordChecks.special ? 'valid' : ''}>Au moins un caractere special</li>
            </ul>
            <div className="login-field">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="login-hint login-hint--warn">Les mots de passe ne correspondent pas.</p>
            )}
            {message && <p className="login-hint login-hint--ok">{message}</p>}
            {error && <p className="login-hint login-hint--warn">{error}</p>}
            <button type="submit" className="login-btn" disabled={loading || !isPasswordStrong}>
              {loading ? 'Création…' : 'Créer mon compte'}
            </button>
          </form>

          <p className="login-signup-prompt">
            Déjà inscrit(e) ? <Link to="/dashboard">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSignup;
