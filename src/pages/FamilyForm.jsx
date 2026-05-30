import React, { useEffect } from 'react';
import CountrySelect from '../components/CountrySelect';
import BookingSlotPicker from '../components/BookingSlotPicker';
import { FormFeedback } from '../components/FormFeedback';
import { useFormWithBooking } from '../hooks/useFormWithBooking';
import './FamilyForm.css';

const FamilyForm = () => {
  const {
    selectedDateKey,
    setSelectedDateKey,
    selectedTime,
    onTimeChange,
    slotComplete,
    loading,
    error,
    handleSubmit,
  } = useFormWithBooking('family');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="family-page">
      <section className="fam-hero">
        <div className="container">
          <div className="fam-hero-content">
            <h1 className="fam-hero-title">Derrière chaque famille,<br />il y a une vraie histoire</h1>

            <div className="fam-hero-bullets">
              <div className="fam-hero-bullet-item">
                <span className="fam-hero-bullet-dot" />
                <span>Une organisation à gérer.</span>
              </div>
              <div className="fam-hero-bullet-item">
                <span className="fam-hero-bullet-dot" />
                <span>Des enfants à accompagner.</span>
              </div>
              <div className="fam-hero-bullet-item">
                <span className="fam-hero-bullet-dot" />
                <span>Un équilibre à préserver.</span>
              </div>
            </div>

            <p className="fam-hero-subtitle bold-sub">
              Chez Grâce est là, nous savons qu&apos;une jeune au pair ne doit pas seulement &laquo;&nbsp;aider&nbsp;&raquo;.<br />
              Elle doit aussi s&apos;intégrer humainement à votre foyer.
            </p>

            <p className="fam-hero-subtitle fam-hero-last-paragraph">
              Prenez quelques minutes pour nous parler de votre famille.<br />
              Nous nous chargeons du reste avec attention, écoute et exigence.
            </p>
          </div>
        </div>
      </section>

      <section className="fam-main">
        <div className="container">
          <div className="fam-form-container">
            <FormFeedback error={error} loading={loading} />
            <form
              className="fam-form"
              onSubmit={(e) => handleSubmit(e, { scrollTargetId: 'fam-booking-section' })}
            >
              <div className="fam-gender-row">
                <span className="fam-gender-label"><span className="line" /> Je suis...</span>
                <label className="radio-label">
                  <input type="radio" name="gender" value="madame" required />
                  <span className="radio-custom" /> Madame
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="monsieur" />
                  <span className="radio-custom" /> Monsieur
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="autre" />
                  <span className="radio-custom" /> Autre...
                </label>
              </div>

              <div className="fam-form-row">
                <div className="fam-form-group">
                  <label>Votre prénom</label>
                  <input type="text" className="fam-input" name="firstName" required />
                </div>
                <div className="fam-form-group">
                  <label>Votre nom</label>
                  <input type="text" className="fam-input" name="lastName" required />
                </div>
              </div>

              <div className="fam-form-row">
                <div className="fam-form-group">
                  <label>Votre email</label>
                  <input type="email" className="fam-input" name="email" placeholder="dupont@exemple.com" required />
                </div>
                <div className="fam-form-group">
                  <label>Pays de résidence</label>
                  <CountrySelect name="country" inputClassName="fam-input" required />
                </div>
              </div>

              <div className="fam-form-group full-width">
                <label>Numéro de téléphone</label>
                <div className="input-with-icon">
                  <span className="phone-icon">📞</span>
                  <input type="tel" className="fam-input icon-input" name="phone" required />
                </div>
              </div>

              <div className="fam-situation-box">
                <label className="fam-situation-label">Votre situation ?</label>
                <textarea
                  className="fam-input fam-textarea"
                  name="situation"
                  placeholder="Le nombre et l'âge de vos enfants, les dates de début souhaitées, vos attentes, vos doutes..."
                  rows="4"
                  required
                />

                <ul className="fam-benefits">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    20-30 min de votre temps
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    Réponse personnalisée (visio, mail...)
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    100% confidentiel
                  </li>
                </ul>
              </div>

              <div className="fam-booking-section" id="fam-booking-section">
                <div className="fam-booking-head">
                  <span className="fam-booking-badge">Étape 2</span>
                  <h3 className="fam-booking-title">Choisissez votre créneau d&apos;échange</h3>
                  <p className="fam-booking-note">
                    Sélectionnez une date et une heure avant d&apos;envoyer votre demande.
                  </p>
                </div>
                <BookingSlotPicker
                  compact
                  selectedDateKey={selectedDateKey}
                  selectedTime={selectedTime}
                  onDateChange={setSelectedDateKey}
                  onTimeChange={onTimeChange}
                />
              </div>

              <div className="fam-submit-wrapper">
                <button
                  type="submit"
                  className="btn btn-primary fam-submit-btn"
                  disabled={loading || !slotComplete}
                >
                  {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
                <p className="fam-submit-note">
                  {slotComplete
                    ? <>Vous recevrez une réponse sous <span style={{ fontWeight: 600 }}>24-48h</span> pour échanger directement avec nous.</>
                    : 'Le bouton d\'envoi s\'active une fois votre créneau choisi.'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FamilyForm;
