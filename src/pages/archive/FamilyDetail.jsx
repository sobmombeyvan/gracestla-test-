import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PhotoGallery from '../../components/archive/PhotoGallery';
import { getFamilyById } from '../../data/archiveProfiles';
import '../../components/archive/archives.css';

const FamilyDetail = () => {
  const { id } = useParams();
  const profile = getFamilyById(id);

  if (!profile) return <Navigate to="/jeunes-au-pair/familles" replace />;

  return (
    <div className="archive-detail">
      <div className="archive-detail-hero">
        <div className="container">
          <p className="archive-breadcrumb">
            <Link to="/jeunes-au-pair/familles">Familles</Link> / {profile.name}
          </p>
          <h1>{profile.name}</h1>
          <p className="archive-detail-location">
            {profile.city}, {profile.country}
          </p>
        </div>
      </div>

      <div className="container archive-detail-grid">
        <PhotoGallery photos={profile.photos} alt={profile.name} />

        <div className="archive-detail-main">
          <div className="archive-info-strip">
            <div>
              <strong>Enfants</strong>
              <span>
                {profile.childrenCount} ({profile.childrenAges})
              </span>
            </div>
            <div>
              <strong>Séjour</strong>
              <span>{profile.stayDuration}</span>
            </div>
            <div>
              <strong>Âge recherché</strong>
              <span>{profile.ageSought}</span>
            </div>
            <div>
              <strong>Permis</strong>
              <span>{profile.drivingLicense ? 'Souhaité' : 'Non requis'}</span>
            </div>
          </div>

          <div className="archive-detail-tags">
            {profile.languages.map((l) => (
              <span key={l} className="archive-detail-tag">
                {l}
              </span>
            ))}
          </div>

          <h2>Description</h2>
          <p>{profile.description}</p>

          <h2>Tâches demandées</h2>
          <ul>
            {profile.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h2>Horaires</h2>
          <p>{profile.schedule}</p>

          <h2>Logement</h2>
          <p>{profile.housing}</p>

          <h2>Avantages</h2>
          <ul>
            {profile.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <h2>Localisation</h2>
          <p>{profile.location}</p>

          <div className="archive-detail-cta">
            <Link to="/au-pair" className="btn btn-primary">
              Candidater / Contacter
            </Link>
            <Link to="/reservation" className="btn btn-outline">
              Réserver un appel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetail;
