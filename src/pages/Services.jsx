import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="s-hero">
        <div className="container s-hero-grid">
          <div className="s-hero-text">
            <h1 className="s-title">Nos services,<br /><span className="s-teal-italic">pensés pour vous.</span></h1>
            <p className="s-subtitle">
              Un accompagnement humain et structuré pour vivre<br />
              une expérience au pair réussie, en toute confiance.
            </p>
            <Link to="/contact" className="s-btn s-btn-primary">Découvrir nos accompagnements</Link>
          </div>
          <div className="s-hero-img-box">
            <img 
              src="https://i.ibb.co/273B1nmf/PHOTO-2026-05-19-14-36-07-2.jpg" 
              alt="Services Grâce est là" 
              className="s-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="s-steps">
        <div className="container text-center">
          <h2 className="s-heading">Nous vous accompagnons à chaque étape</h2>
          
          <div className="s-steps-row">
            {/* Step 1 */}
            <div className="s-step">
              <div className="s-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="s-step-content">
                <h3 className="s-step-title">1. Compréhension</h3>
                <p className="s-step-desc">Nous prenons le temps de comprendre vos besoins, vos attentes et votre situation.</p>
              </div>
            </div>
            
            <div className="s-step-line"></div>
            
            {/* Step 2 */}
            <div className="s-step">
              <div className="s-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><path d="M11 8v6" /><path d="M8 11h6" /></svg>
              </div>
              <div className="s-step-content">
                <h3 className="s-step-title">2. Sélection</h3>
                <p className="s-step-desc">Nous recherchons ou orientons vers les profils les plus adaptés.</p>
              </div>
            </div>

            <div className="s-step-line"></div>

            {/* Step 3 */}
            <div className="s-step">
              <div className="s-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /></svg>
              </div>
              <div className="s-step-content">
                <h3 className="s-step-title">3. Échanges</h3>
                <p className="s-step-desc">Nous facilitons les échanges et vous aidons à mieux vous connaître.</p>
              </div>
            </div>

            <div className="s-step-line"></div>

            {/* Step 4 */}
            <div className="s-step">
              <div className="s-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <div className="s-step-content">
                <h3 className="s-step-title">4. Préparation</h3>
                <p className="s-step-desc">Nous préparons chaque partie pour une arrivée sereine et bien cadrée.</p>
              </div>
            </div>

            <div className="s-step-line"></div>

            {/* Step 5 */}
            <div className="s-step">
              <div className="s-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <div className="s-step-content">
                <h3 className="s-step-title">5. Suivi</h3>
                <p className="s-step-desc">Nous restons à vos côtés après le début de l'expérience, pour assurer son bon déroulé.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="s-cards-section">
        <div className="container">
          <h2 className="s-heading text-center mb-5">Des services adaptés à votre situation</h2>
          
          <div className="s-cards-grid">
            {/* Au Pair Card */}
            <div className="s-card">
              <div className="s-card-img-wrapper">
                <img src="https://i.ibb.co/TxrWwd4f/PHOTO-2026-05-19-14-36-06.jpg" alt="Jeune au pair" />
                <div className="s-card-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
              </div>
              <div className="s-card-body">
                <h3 className="s-card-title">Pour les jeunes au pair</h3>
                <p className="s-card-text">
                  Vous souhaitez partir à l'étranger en toute sécurité et vivre une expérience enrichissante ?<br/><br/>
                  Nous vous aidons à trouver la bonne famille, à comprendre le cadre et à vous préparer sereinement à cette aventure.
                </p>
                <ul className="s-card-checklist">
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Aide à la recherche de famille adaptée</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Conseils sur le contrat et les conditions</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Préparation avant le départ</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Suivi et soutien tout au long de l'expérience</span></li>
                </ul>
                <div className="s-card-action">
                   <Link to="/au-pair" className="s-btn-outline">En savoir plus</Link>
                </div>
              </div>
            </div>

            {/* Family Card */}
            <div className="s-card">
              <div className="s-card-img-wrapper">
                <img src="https://i.ibb.co/Xkxypbvs/PHOTO-2026-05-19-14-36-07-3.jpg" alt="Familles d'accueil" />
                <div className="s-card-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </div>
              </div>
              <div className="s-card-body">
                <h3 className="s-card-title">Pour les familles d'accueil</h3>
                <p className="s-card-text">
                  Vous souhaitez accueillir un(e) jeune au pair correspondant à vos valeurs et à vos besoins ?<br/><br/>
                  Nous vous accompagnons pour faire le bon choix et construire une relation harmonieuse.
                </p>
                <ul className="s-card-checklist">
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Définition de vos besoins et attentes</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Sélection de profils compatibles</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Accompagnement dans les échanges</span></li>
                  <li><svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> <span>Suivi et soutien en cas de besoin</span></li>
                </ul>
                <div className="s-card-action">
                   <Link to="/famille" className="s-btn-outline">En savoir plus</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="s-features">
        <div className="container text-center">
          <h2 className="s-heading mb-5">Pourquoi choisir Grâce est là ?</h2>
          
          <div className="s-feat-grid">
            <div className="s-feat">
              <div className="s-feat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <h4 className="s-feat-title">Expérience & Compréhension</h4>
              <p className="s-feat-desc">Nous connaissons les deux côtés<br/>et comprenons vos réalités.</p>
            </div>
            
            <div className="s-feat">
              <div className="s-feat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h4 className="s-feat-title">Accompagnement Humain</h4>
              <p className="s-feat-desc">Un suivi personnalisé, bienveillant<br/>et à l'écoute.</p>
            </div>
            
            <div className="s-feat">
              <div className="s-feat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
              </div>
              <h4 className="s-feat-title">Sécurité & Confiance</h4>
              <p className="s-feat-desc">Des mises en relation fiables<br/>et un cadre clair.</p>
            </div>
            
            <div className="s-feat">
              <div className="s-feat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3CA2A2" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h4 className="s-feat-title">Relation Durable</h4>
              <p className="s-feat-desc">Notre objectif : une expérience<br/>réussie pour tous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="s-cta">
        <div className="container">
          <div className="s-cta-box">
             <div className="s-cta-img-col">
                <img src="https://i.ibb.co/tT63n0kT/PHOTO-2026-05-19-14-36-07.jpg" alt="Accompagnement Grâce est là" />
             </div>
             <div className="s-cta-content">
                <h2 className="s-cta-title">Prêt à vivre une belle expérience<br/>au pair en toute sérénité ?</h2>
                <Link to="/contact" className="s-btn s-btn-primary">Contactez-nous</Link>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
