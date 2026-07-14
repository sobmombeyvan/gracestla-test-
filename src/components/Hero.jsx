import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Une expérience Au Pair<br />
          <span className="italic">qui ne dépend plus de la chance</span>
        </h1>
        <p className="hero-subtitle">
          Accompagnement humain avant le départ, pendant le séjour et bien après ton retour.
        </p>
        <div className="hero-cta">
          <Link to="/services" className="btn btn-primary hero-btn-main">
            Découvrir nos services
          </Link>

          <div className="hero-auth">
            <p className="hero-auth-label">Mon espace personnel</p>
            <div className="hero-auth-actions">
              <Link to="/dashboard" className="hero-auth-btn hero-auth-btn--login">
                Se connecter
              </Link>
              <Link to="/dashboard/inscription" className="hero-auth-btn hero-auth-btn--signup">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
