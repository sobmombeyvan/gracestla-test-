import React, { useEffect } from 'react';
import './Program.css';

const Program = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="program-page">
      <div className="container">
        
        {/* Title Section */}
        <section className="program-header">
          <h1 className="program-title">Le programme Jeune Au Pair</h1>
          <p className="program-subtitle">
            Un échange culturel unique, basé sur la confiance, le respect et l'accompagnement.
          </p>
        </section>

        {/* Top Info Section */}
        <section className="program-intro">
          <div className="intro-block">
            <h2>Qu'est-ce que<br/>le programme Au Pair ?</h2>
            <p>Le programme Au Pair permet à un jeune de vivre une expérience culturelle enrichissante à l'étranger, au sein d'une famille d'accueil.</p>
            <ul className="intro-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                Découvrir une nouvelle culture
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Améliorer la langue
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Accompagner les enfants dans leur quotidien
              </li>
            </ul>
          </div>

          <div className="intro-center">
            <div className="circle-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '32px', marginBottom: '10px'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <p>Un échange basé<br/>sur la confiance,<br/>le respect et le<br/>partage.</p>
            </div>
          </div>

          <div className="intro-block">
            <h2>Qu'est-ce qu'une<br/>famille d'accueil ?</h2>
            <p>Une famille d'accueil ouvre son foyer à un(e) jeune Au Pair pour l'accueillir comme un membre de la famille.</p>
            <ul className="intro-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Offrir un cadre bienveillant et sécurisé
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 12l-4-4-4 4M12 16V8"></path></svg>
                Partager leur quotidien et leur culture
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Confier des tâches liées aux enfants
              </li>
            </ul>
          </div>
        </section>

        {/* Role Section */}
        <section className="program-role bg-sand-light">
          <div className="role-header">
            <h2>Quel est le rôle de Grâce est là ?</h2>
            <p>Grâce est là est là pour sécuriser, accompagner et guider chaque étape de l'expérience Au Pair.</p>
          </div>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <h3>1. Comprendre vos besoins</h3>
              <p>Nous prenons le temps d'échanger avec vous pour cerner vos attentes, vos valeurs et vos besoins.</p>
            </div>
            
            <div className="step-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>

            <div className="step-item">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>2. Sélectionner avec soin</h3>
              <p>Nous sélectionnons des profils fiables et motivés, en adéquation avec votre famille.</p>
            </div>

            <div className="step-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>

            <div className="step-item">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3>3. Préparer l'expérience</h3>
              <p>Nous vous accompagnons dans toutes les démarches et préparons l'arrivée de votre Au Pair.</p>
            </div>

            <div className="step-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>

            <div className="step-item">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <h3>4. Suivre et accompagner</h3>
              <p>Nous restons à vos côtés avant, pendant et après l'arrivée pour assurer un suivi de qualité.</p>
            </div>

            <div className="step-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>

            <div className="step-item">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3>5. Créer une expérience réussie</h3>
              <p>Notre objectif : une expérience enrichissante et sereine pour tous, basée sur la confiance.</p>
            </div>
          </div>
        </section>

        {/* Bottom Benefits Section */}
        <section className="program-benefits">
          
          <div className="benefit-card bg-sand-light">
            <h3>Pour les Jeunes Au Pair</h3>
            <ul className="benefit-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Vivre une expérience humaine et culturelle unique
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Développer leur autonomie et leur confiance
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Améliorer une langue étrangère au quotidien
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Créer des liens forts et des souvenirs inoubliables
              </li>
            </ul>
            <div className="benefit-icon-corner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="4" y="6" width="16" height="14" rx="2" ry="2"></rect><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="12" y1="6" x2="12" y2="20"></line><line x1="8" y1="13" x2="8" y2="13.01"></line><line x1="16" y1="13" x2="16" y2="13.01"></line></svg>
            </div>
          </div>

          <div className="benefit-center">
            <div className="benefit-center-overlay">
              <div className="overlay-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" style={{width: '32px', marginBottom: '8px'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <h4>GRÂCE EST LÀ</h4>
                <p>L'humain au cœur<br/>de chaque rencontre.</p>
              </div>
            </div>
          </div>

          <div className="benefit-card bg-sand-light">
            <h3>Pour les Familles d'accueil</h3>
            <ul className="benefit-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Recevoir une aide précieuse au quotidien
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Partager leur culture et leur mode de vie
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Vivre un échange enrichissant et humain
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Être accompagnées par des professionnels
              </li>
            </ul>
            <div className="benefit-icon-corner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><rect x="9" y="15" width="6" height="6"></rect><line x1="9" y1="18" x2="15" y2="18"></line><line x1="12" y1="15" x2="12" y2="21"></line></svg>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

export default Program;
