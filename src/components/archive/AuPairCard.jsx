import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Languages, Briefcase, Calendar } from 'lucide-react';
import './archives.css';

const AuPairCard = ({ profile }) => (
  <article className="archive-card archive-card--aupair">
    <div className="archive-card-media">
      <img src={profile.photo} alt={profile.firstName} loading="lazy" />
      <span className="archive-card-badge">{profile.nationality}</span>
    </div>
    <div className="archive-card-body">
      <h3>
        {profile.firstName}, {profile.age} ans
      </h3>
      <ul className="archive-card-meta">
        <li>
          <Globe size={14} />
          {profile.nationality}
        </li>
        <li>
          <Languages size={14} />
          {profile.languages.join(' · ')}
        </li>
        <li>
          <Briefcase size={14} />
          {profile.experience}
        </li>
        <li>
          <Calendar size={14} />
          {profile.availability}
        </li>
      </ul>
      <Link to={`/familles-d-accueil/au-pairs/${profile.id}`} className="btn btn-primary archive-card-btn">
        Voir le profil
      </Link>
    </div>
  </article>
);

export default AuPairCard;
