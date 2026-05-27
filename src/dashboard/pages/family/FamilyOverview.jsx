import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../../context/AuthContext';
import { buildDashboardUser } from '../../../utils/userDisplay';

const FamilyOverview = () => {
  const { profile, user } = useAuth();
  const display = buildDashboardUser(profile, user);

  return (
    <div>
      <PageHeader
        title={`Bonjour ${display.name.split(' ')[0]}`}
        subtitle="Gérez votre recherche d’au pair et vos échanges depuis votre espace famille."
        action={{ to: '/dashboard/family/search', label: 'Rechercher' }}
      />

      <div className="stat-bar">
        <div className="stat-bar-item">
          <span className="stat-bar-label">Profils suggérés</span>
          <span className="stat-bar-value">—</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Conversations</span>
          <span className="stat-bar-value">0</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Favoris</span>
          <span className="stat-bar-value">0</span>
        </div>
        <div className="stat-bar-item">
          <span className="stat-bar-label">Dossier</span>
          <span className="stat-bar-value">En préparation</span>
        </div>
      </div>

      {profile?.kyc_status !== 'verified' && (
        <div className="dash-card" style={{ marginBottom: '1rem', borderLeft: '4px solid var(--dash-red)' }}>
          <strong>Compte non vérifié</strong>
          <p style={{ marginTop: '0.5rem', color: 'var(--dash-gray-600)', fontSize: '0.85rem' }}>
            Votre KYC n’est pas encore validé. Merci de téléverser vos documents pour validation par l’admin.
          </p>
          <Link to="/dashboard/family/documents" className="dash-btn dash-btn-primary dash-btn-sm">
            Faire mon KYC
          </Link>
        </div>
      )}

      <div className="dash-grid-3">
        <div className="dash-card">
          <div className="card-section-head">
            <h2 className="section-title">Au pairs</h2>
            <Link to="/dashboard/family/search" className="card-section-link">Tout voir</Link>
          </div>
          <EmptyState
            title="Aucun profil pour le moment"
            description="Les au pairs compatibles avec votre famille seront proposés ici par notre équipe."
            action={
              <Link to="/reservation" className="dash-btn dash-btn-primary dash-btn-sm">
                Nous contacter
              </Link>
            }
          />
        </div>

        <div className="dash-card">
          <div className="card-section-head">
            <h2 className="section-title">Messages</h2>
            <Link to="/dashboard/family/messages" className="card-section-link">Messagerie</Link>
          </div>
          <EmptyState
            title="Pas de message"
            description="Vos échanges avec les au pairs et Grâce est là s’afficheront ici."
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyOverview;
