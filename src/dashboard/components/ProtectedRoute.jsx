import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { getDashboardPath } from '../../utils/userDisplay';

const ProtectedRoute = ({ children, role }) => {
  const { session, effectiveRole, isAdmin, needsOnboarding, loading } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Configuration requise</h1>
          <p style={{ color: '#8B6B56', fontSize: '0.9rem' }}>
            Ajoutez les variables Supabase dans <code>.env</code>.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        Chargement…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/dashboard" replace state={{ authRequired: true }} />;
  }

  if (needsOnboarding) {
    return <Navigate to="/dashboard/bienvenue" replace />;
  }

  if (role === 'admin') {
    if (!isAdmin) {
      return (
        <div className="login-page">
          <div className="login-card">
            <h1>Accès non autorisé</h1>
            <p style={{ color: '#8B6B56' }}>
              Ce compte n’a pas les droits d’administration. Si vous pensez qu’il s’agit d’une erreur, contactez
              l’équipe Grâce est là.
            </p>
            <a href="/dashboard" style={{ color: '#1DB2AA', fontWeight: 600 }}>
              Retour à la connexion
            </a>
          </div>
        </div>
      );
    }
    return children;
  }

  if (isAdmin) {
    return <Navigate to={getDashboardPath('admin')} replace />;
  }

  if (effectiveRole && effectiveRole !== role) {
    return <Navigate to={getDashboardPath(effectiveRole)} replace />;
  }

  return children;
};

export default ProtectedRoute;
