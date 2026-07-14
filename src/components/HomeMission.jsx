import React from 'react';
import { Link } from 'react-router-dom';
import './HomeMission.css';

const HomeMission = () => {
  return (
    <section className="home-mission bg-sand-light">
      <div className="container home-mission-layout">
        <div className="home-mission-visual">
          <img
            src="https://i.ibb.co/273B1nmf/PHOTO-2026-05-19-14-36-07-2.jpg"
            alt="Accompagnement Grâce est là"
            loading="lazy"
          />
        </div>
        <div className="home-mission-copy">
          <span className="home-mission-label">Notre histoire</span>
          <h2>Et si ton expérience Au Pair ne dépendait plus de la chance&nbsp;?</h2>
          <p>
            Grâce est là est née d’une expérience réelle. En 2022, j’ai moi aussi vécu
            le programme Au Pair — avec des rêves plein la tête, une famille chaleureuse
            au départ… puis des doutes, des changements, et la solitude de ne pas savoir
            vers qui me tourner.
          </p>
          <p>
            Le véritable défi n’est pas le programme. C’est de partir sans être suffisamment
            préparé, accompagné et soutenu. Une belle rencontre entre deux projets de vie
            ne devrait jamais être laissée au hasard.
          </p>
          <p className="home-mission-emphasis">
            Notre conviction est simple&nbsp;: une expérience Au Pair réussie commence bien
            avant le départ.
          </p>
          <div className="home-mission-actions">
            <Link to="/a-propos" className="btn btn-primary">
              Lire notre histoire
            </Link>
            <Link to="/programme" className="home-mission-link">
              Voir le programme
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMission;
