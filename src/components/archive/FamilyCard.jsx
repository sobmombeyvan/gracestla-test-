import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, Car } from 'lucide-react';
import './archives.css';

const FamilyCard = ({ profile }) => (
  <article className="archive-card archive-card--family">
    <div className="archive-card-media">
      <img src={profile.photo} alt={profile.name} loading="lazy" />
      <span className="archive-card-badge">{profile.country}</span>
    </div>
    <div className="archive-card-body">
      <h3>{profile.name}</h3>
      <ul className="archive-card-meta">
        <li>
          <MapPin size={14} />
          {profile.city}, {profile.country}
        </li>
        <li>
          <Users size={14} />
          {profile.childrenCount} enfant{profile.childrenCount > 1 ? 's' : ''}
        </li>
        <li>
          <Clock size={14} />
          {profile.stayDuration}
        </li>
        {profile.drivingLicense && (
          <li>
            <Car size={14} />
            Permis souhaité
          </li>
        )}
      </ul>
      <Link to={`/jeunes-au-pair/familles/${profile.id}`} className="btn btn-primary archive-card-btn">
        Voir le profil
      </Link>
    </div>
  </article>
);

export default FamilyCard;
