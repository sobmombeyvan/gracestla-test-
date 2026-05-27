import React from 'react';
import { Link } from 'react-router-dom';
import ArchiveHero from '../../components/archive/ArchiveHero';
import AuPairCard from '../../components/archive/AuPairCard';
import { AUPAIR_PROFILES } from '../../data/archiveProfiles';
import '../../components/archive/archives.css';

const AuPairArchives = () => (
  <>
    <ArchiveHero
      eyebrow="Familles d'accueil"
      title="Archives des jeunes au pair"
      subtitle="Parcourez les profils disponibles. Connectez-vous à votre espace pour filtrer par langues, expérience et disponibilité."
      ctaTo="/famille"
      ctaLabel="Accueillir une au pair"
    />
    <div className="archive-page">
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <p className="archive-browse-hint">
          <Link to="/dashboard/family/search">Ouvrir la recherche avec filtres</Link> dans votre espace famille.
        </p>
        <div className="archive-grid">
          {AUPAIR_PROFILES.map((profile) => (
            <AuPairCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default AuPairArchives;
