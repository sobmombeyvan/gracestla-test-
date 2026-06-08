import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Des relations au pair<br />
          <span className="italic">qui fonctionnent vraiment</span>
        </h1>
        <p className="hero-subtitle">
          Accompagnement & mise en relation au pair
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
