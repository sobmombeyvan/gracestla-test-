import React, { useEffect, useState } from 'react';
import { downloadCalendarEvent, getBookedStartDate, getGoogleCalendarUrl } from '../utils/calendar';
import './Success.css';

const Success = () => {
  const [bookedDate, setBookedDate] = useState('');
  const [bookedTime, setBookedTime] = useState('');
  const [calendarError, setCalendarError] = useState('');
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const date = localStorage.getItem('bookedDate');
    const time = localStorage.getItem('bookedTime');
    if (date) setBookedDate(date);
    if (time) setBookedTime(time);
    setStartDate(getBookedStartDate());
  }, []);

  const handleAddToCalendar = () => {
    setCalendarError('');
    const start = startDate || getBookedStartDate();
    const ok = downloadCalendarEvent({ start });
    if (!ok) {
      setCalendarError('Impossible de générer le fichier. Utilisez le bouton Google Calendar ci-dessous.');
    }
  };

  const googleUrl = startDate ? getGoogleCalendarUrl({ start: startDate }) : null;

  return (
    <div className="success-page">
      <section className="suc-hero">
        <div className="suc-hero-content container">
          <h1 className="suc-hero-title">Votre appel est bien réservé 😉</h1>
          <p className="suc-hero-subtitle">Merci pour votre confiance !</p>
          <p className="suc-hero-text">
            Votre rendez-vous est enregistré.<br />
            Retrouvez le récapitulatif ci-dessous.
          </p>
        </div>
      </section>

      <section className="suc-main bg-sand-light">
        <div className="container suc-container">
          <div className="suc-header">
            <span className="line" />
            <h2>Récapitulatif</h2>
            <span className="line" />
          </div>

          <div className="suc-card">
            {bookedDate ? (
              <div className="suc-date">
                <span className="bold">{bookedDate}</span>
                {bookedTime && (
                  <>
                    <span className="separator">|</span> {bookedTime}
                  </>
                )}
              </div>
            ) : (
              <div className="suc-date">Rendez-vous confirmé</div>
            )}
            <div className="suc-details">
              <span>Durée : 20-30 min</span>
              <span className="icon-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                Visio-conférence
              </span>
            </div>

            <div className="suc-calendar-actions">
              <button type="button" className="btn btn-primary suc-calendar-btn" onClick={handleAddToCalendar}>
                Télécharger (.ics)
              </button>
              {googleUrl && (
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary suc-calendar-btn suc-google-btn"
                >
                  Ajouter à Google Calendar
                </a>
              )}
            </div>
            {calendarError && (
              <p className="suc-calendar-error" role="alert">{calendarError}</p>
            )}
          </div>

          <div className="suc-header">
            <span className="line" />
            <h2>Ce que vous devez savoir</h2>
            <span className="line" />
          </div>

          <ul className="suc-benefits">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Apportez quelques notes et préparez vos questions
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <span>Conservez la date dans votre calendrier avec les boutons ci-dessus</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Nous vous recontactons si besoin avant le rendez-vous.
            </li>
          </ul>

          <div className="suc-header small-header">
            <span className="line long-line" />
            <h3 className="italic-heading">À très vite !</h3>
            <span className="line long-line" />
          </div>

          <p className="suc-note">
            Vous n&apos;avez pas besoin de préparer grand-chose.<br />
            Venez tel(le) que vous êtes, tout simplement.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Success;
