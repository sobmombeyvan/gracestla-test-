import React, { useEffect } from 'react';
import './Success.css';

const Success = () => {
  const [bookedDate, setBookedDate] = React.useState('Mardi 2 juillet');
  const [bookedTime, setBookedTime] = React.useState('11h00');

  useEffect(() => {
    window.scrollTo(0, 0);
    const date = localStorage.getItem('bookedDate');
    const time = localStorage.getItem('bookedTime');
    if (date) setBookedDate(date);
    if (time) setBookedTime(time);
  }, []);

  return (
    <div className="success-page">
      <section className="suc-hero">
        <div className="suc-hero-content container">
          <h1 className="suc-hero-title">Votre appel est bien réservé 😉</h1>
          <p className="suc-hero-subtitle">Merci pour votre confiance !</p>
          <p className="suc-hero-text">Vous recevrez un email de confirmation avec tous les détails<br/>de votre rendez-vous.</p>
        </div>
      </section>

      <section className="suc-main bg-sand-light">
        <div className="container suc-container">
          
          <div className="suc-header">
            <span className="line"></span>
            <h2>Récapitulatif</h2>
            <span className="line"></span>
          </div>

          <div className="suc-card">
            <div className="suc-date">
              <span className="bold">{bookedDate}</span> <span className="separator">|</span> {bookedTime}
            </div>
            <div className="suc-details">
              <span>Durée : 20-30 min</span>
              <span className="icon-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                Visio-conférence
              </span>
            </div>
            <button className="btn btn-primary suc-calendar-btn">Ajouter à mon calendrier</button>
          </div>

          <div className="suc-header">
            <span className="line"></span>
            <h2>Ce que vous devez savoir</h2>
            <span className="line"></span>
          </div>

          <ul className="suc-benefits">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Apportez quelques notes et préparez vos questions
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Votre email de confirmation contient les informations<br />du rendez-vous (lien, horaires, etc.)</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Vous recevrez un rappel la veille du rendez-vous.
            </li>
          </ul>

          <div className="suc-header small-header">
            <span className="line long-line"></span>
            <h3 className="italic-heading">À très vite !</h3>
            <span className="line long-line"></span>
          </div>

          <p className="suc-note">
            Vous n'avez pas besoin de préparer grand-chose.<br />
            Venez tel(le) que vous êtes, tout simplement.
          </p>

        </div>
      </section>

    </div>
  );
};

export default Success;
