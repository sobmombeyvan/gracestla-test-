import React from 'react';
import { Link } from 'react-router-dom';
import ArchiveHero from '../../components/archive/ArchiveHero';
import FamilyCard from '../../components/archive/FamilyCard';
import { FAMILY_PROFILES } from '../../data/archiveProfiles';
import '../../components/archive/archives.css';

const FamilyArchives = () => (
  <>
    <ArchiveHero
      eyebrow="Jeunes au pair"
      title="Archives des familles d'accueil"
      subtitle="Explorez les familles qui accueillent une au pair. Connectez-vous à votre espace pour affiner votre recherche."
      ctaTo="/au-pair"
      ctaLabel="Devenir au pair"
    />
    <div className="archive-page">
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <p className="archive-browse-hint">
          <Link to="/dashboard/aupair/families">Ouvrir la recherche avec filtres</Link> dans votre espace au pair.
        </p>
        <div className="archive-grid">
          {FAMILY_PROFILES.map((profile) => (
            <FamilyCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default FamilyArchives;
