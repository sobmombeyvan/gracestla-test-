import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormFeedback } from '../components/FormFeedback';
import { usePublicFormSubmit } from '../hooks/usePublicFormSubmit';
import './Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const { handleSubmit, loading, error } = usePublicFormSubmit({
    type: 'reservation',
    needsBooking: true,
    onSuccess: () => navigate('/calendrier'),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reservation-page">
      <section className="res-hero">
        <div className="res-hero-content">
          <h1 className="res-hero-title">Vous êtes au bon endroit</h1>
          <p className="res-hero-subtitle">
            Vous souhaitez vivre une expérience au pair réussie,<br />
            ou recruter en toute sérénité.
          </p>
          <a href="#booking-form" className="btn btn-primary res-hero-btn">Je réserve mon appel</a>
        </div>
      </section>

      <section className="res-main bg-sand-light" id="booking-form">
        <div className="container res-grid">
          
          <div className="res-left">
            <div className="res-header">
              <span className="line"></span>
              <h2>En quelques secondes,<br/>dites-nous où vous en êtes :</h2>
              <span className="line"></span>
            </div>

            <div className="res-cards">
              <Link to="/au-pair" className="res-card" style={{textDecoration: 'none'}}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <p>Je suis un(e) au pair</p>
              </Link>
              <Link to="/famille" className="res-card" style={{textDecoration: 'none'}}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <p>Je suis une famille</p>
              </Link>
            </div>

            <div className="res-header small">
              <span className="line"></span>
              <h3>Ce que vous allez obtenir</h3>
              <span className="line"></span>
            </div>

            <ul className="res-benefits">
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Vous clarifiez votre situation
              </li>
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Vous évitez les erreurs
              </li>
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Vous comprenez les prochaines étapes
              </li>
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Vous savez exactement quoi faire
              </li>
            </ul>

            <div className="res-badges">
              <span><svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 20-30 min</span>
              <span><svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Sans engagement</span>
              <span><svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 100% confidentiel</span>
            </div>

            <p className="res-note-bottom">
              Vous n'avez pas besoin d'avoir toutes les réponses.<br/>
              C'est justement pour ça que vous êtes ici.
            </p>

          </div>

          <div className="res-right">
            <div className="res-form-wrapper">
              <h2>Réservez votre appel</h2>
              <FormFeedback error={error} loading={loading} />
              <form className="res-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Votre nom</label>
                  <input type="text" name="name" className="input-field" required />
                </div>
                <div className="form-group">
                  <label>Votre email</label>
                  <input type="email" name="email" className="input-field" required />
                </div>
                <div className="form-group">
                  <label>Vous êtes</label>
                  <select name="role" className="input-field" required>
                    <option value="aupair">Je suis un(e) au pair</option>
                    <option value="family">Je suis une famille</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Votre situation</label>
                  <textarea name="situation" className="input-field" placeholder="Décrivez votre situation" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Envoi…' : 'Réserver mon appel'}
                </button>
              </form>
              
              <div className="res-form-footer">
                <span><svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 20-30 min</span>
                <span><svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Sans engagement</span>
                <span><svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 100% confidentiel</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="res-bottom">
        <p className="res-bottom-text">Quand vous ne savez pas quoi faire... <span className="italic" style={{fontFamily: "var(--font-heading)"}}>Grâce est là</span></p>
      </div>

    </div>
  );
};
export default Reservation;
