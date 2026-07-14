import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCta.css';

const HomeCta = () => {
  return (
    <section className="home-cta">
      <div className="container">
        <div className="home-cta-panel">
          <div className="home-cta-copy">
            <p className="home-cta-kicker">Grâce est là</p>
            <h2>Avant ton départ. Pendant ton séjour. Et bien après ton retour.</h2>
            <p>
              Une belle aventure commence lorsqu’on prend le temps de comprendre ton projet,
              de répondre à tes questions, de te préparer — et de t’accompagner à chaque étape.
              Tu ne devrais pas vivre cette expérience seul(e).
            </p>
            <ul className="home-cta-points">
              <li>Écoute de ton projet et de tes attentes</li>
              <li>Préparation claire avant le départ</li>
              <li>Présence réelle une fois sur place</li>
            </ul>
          </div>
          <div className="home-cta-actions">
            <Link to="/reservation" className="btn btn-primary home-cta-btn">
              Je veux être accompagné(e)
            </Link>
            <Link to="/contact" className="home-cta-secondary">
              Nous contacter
            </Link>
            <Link to="/a-propos" className="home-cta-tertiary">
              Lire notre histoire
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCta;
