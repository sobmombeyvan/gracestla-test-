import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works bg-sand-light">
      <div className="container text-center">
        <div className="section-header">
          <span className="line"></span>
          <h2 className="section-title">Comment ça marche ?</h2>
          <span className="line"></span>
        </div>
        
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                <path d="M12 6a4 4 0 0 0-4 4 2 2 0 0 0 4 0"/>
                <path d="M12 14c-1.5 0-3 1-3 3"/>
              </svg>
            </div>
            <h3 className="step-title">Écoute et Analyse</h3>
            <p className="step-description">
              Nous prenons le temps de comprendre votre situation, vos attentes et vos valeurs pour poser des bases solides.
            </p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <path d="M9 16l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="step-title">Sélection Personnalisée</h3>
            <p className="step-description">
              Nous orientons vers des profils compatibles et facilitons les échanges pour une mise en relation réfléchie.
            </p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 className="step-title">Suivi et Soutien</h3>
            <p className="step-description">
              Nous restons à vos côtés avant, pendant et après le début de l’expérience pour assurer un cadre serein.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
