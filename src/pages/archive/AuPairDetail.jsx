import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PhotoGallery from '../../components/archive/PhotoGallery';
import { getAuPairById } from '../../data/archiveProfiles';
import '../../components/archive/archives.css';

const AuPairDetail = () => {
  const { id } = useParams();
  const profile = getAuPairById(id);

  if (!profile) return <Navigate to="/familles-d-accueil/au-pairs" replace />;

  return (
    <div className="archive-detail">
      <div className="archive-detail-hero">
        <div className="container">
          <p className="archive-breadcrumb">
            <Link to="/familles-d-accueil/au-pairs">Au pairs</Link> / {profile.firstName}
          </p>
          <h1>
            {profile.firstName}, {profile.age} ans
          </h1>
          <p className="archive-detail-location">
            {profile.nationality} · {profile.gender}
          </p>
        </div>
      </div>

      <div className="container archive-detail-grid">
        <PhotoGallery photos={profile.photos} alt={profile.firstName} />

        <div className="archive-detail-main">
          <div className="archive-info-strip">
            <div>
              <strong>Âge</strong>
              <span>{profile.age} ans</span>
            </div>
            <div>
              <strong>Expérience</strong>
              <span>{profile.experience}</span>
            </div>
            <div>
              <strong>Disponibilité</strong>
              <span>{profile.availability}</span>
            </div>
            <div>
              <strong>Permis</strong>
              <span>{profile.drivingLicense ? 'Oui' : 'Non'}</span>
            </div>
          </div>

          <div className="archive-detail-tags">
            {profile.languages.map((l) => (
              <span key={l} className="archive-detail-tag">
                {l}
              </span>
            ))}
          </div>

          <h2>Biographie</h2>
          <p>{profile.bio}</p>

          <h2>Expériences</h2>
          <ul>
            {profile.experiences.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>

          <h2>Langues</h2>
          <p>{profile.languages.join(', ')}</p>

          <h2>Motivations</h2>
          <p>{profile.motivations}</p>

          <h2>Préférences</h2>
          <p>{profile.preferences}</p>

          <h2>Disponibilité</h2>
          <p>{profile.availability}</p>

          <div className="archive-detail-cta">
            <Link to="/famille" className="btn btn-primary">
              Contacter / Accueillir
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

export default AuPairDetail;
