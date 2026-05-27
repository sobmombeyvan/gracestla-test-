import React from 'react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

const AuPairFavorites = () => (
  <div>
    <PageHeader title="Favoris" subtitle="Familles que vous avez enregistrées." />
    <div className="dash-card">
      <EmptyState title="Aucun favori" description="Ajoutez des familles à vos favoris depuis la liste des profils." />
    </div>
  </div>
);

export default AuPairFavorites;
