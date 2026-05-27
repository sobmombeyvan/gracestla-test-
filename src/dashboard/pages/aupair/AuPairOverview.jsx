import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../../context/AuthContext';
import { buildDashboardUser } from '../../../utils/userDisplay';

const AuPairOverview = () => {
  const { profile, user } = useAuth();
  const display = buildDashboardUser(profile, user);
  const firstName = display.name.split(' ')[0];

  return (
    <div>
      <PageHeader
        title={`Bonjour ${firstName}`}
        subtitle="Votre espace personnel pour suivre votre parcours au pair avec Grâce est là."
        action={{ to: '/dashboard/aupair/profile', label: 'Mon profil' }}
      />

      <div className="stat-bar">
        <div className="stat-bar-item">
          <span className="stat-bar-label">Familles suggérées</span>
          <span className="stat-bar-value">—</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Messages</span>
          <span className="stat-bar-value">0</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Favoris</span>
          <span className="stat-bar-value">0</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Dossier</span>
          <span className="stat-bar-value">À compléter</span>
        </div>
      </div>

      {profile?.kyc_status !== 'verified' && (
        <div className="dash-card" style={{ marginBottom: '1rem', borderLeft: '4px solid var(--dash-red)' }}>
          <strong>Compte non vérifié</strong>
          <p style={{ marginTop: '0.5rem', color: 'var(--dash-gray-600)', fontSize: '0.85rem' }}>
            Votre KYC n’est pas encore validé. Merci de téléverser vos documents pour validation par l’admin.
          </p>
          <Link to="/dashboard/aupair/documents" className="dash-btn dash-btn-primary dash-btn-sm">
            Faire mon KYC
          </Link>
        </div>
      )}

      <div className="dash-grid-3">
        <div className="dash-card">
          <div className="card-section-head">
            <h2 className="section-title">Familles</h2>
            <Link to="/dashboard/aupair/families" className="card-section-link">Parcourir</Link>
          </div>
          <EmptyState
            title="Aucune famille pour le moment"
            description="Lorsque des familles correspondront à votre profil, elles s’afficheront ici."
            action={
              <Link to="/dashboard/aupair/profile" className="dash-btn dash-btn-primary dash-btn-sm">
                Compléter mon profil
              </Link>
            }
          />
        </div>

        <div className="dash-card">
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Votre parcours</h2>
          <EmptyState
            title="Étapes à venir"
            description="Votre calendrier de placement sera visible ici une fois votre dossier validé par l’équipe."
          />
        </div>
      </div>

      <div className="dash-card">
        <div className="card-section-head">
          <h2 className="section-title">Messages</h2>
          <Link to="/dashboard/aupair/messages" className="card-section-link">Messagerie</Link>
        </div>
        <EmptyState
          title="Pas de message"
          description="Vos conversations avec les familles et l’équipe Grâce est là apparaîtront ici."
        />
      </div>
    </div>
  );
};

export default AuPairOverview;
