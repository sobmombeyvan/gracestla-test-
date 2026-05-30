import React, { useEffect } from 'react';
import CountrySelect from '../components/CountrySelect';
import BookingSlotPicker from '../components/BookingSlotPicker';
import { FormFeedback } from '../components/FormFeedback';
import { useFormWithBooking } from '../hooks/useFormWithBooking';
import './AuPairForm.css';

const AuPairForm = () => {
  const {
    selectedDateKey,
    setSelectedDateKey,
    selectedTime,
    onTimeChange,
    slotComplete,
    loading,
    error,
    handleSubmit,
  } = useFormWithBooking('aupair');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aupair-page">
      <section className="ap-hero">
        <div className="ap-hero-content">
          <h1 className="ap-hero-title">Parfait, tu es au bon endroit</h1>
          <p className="ap-hero-subtitle">
            Prends quelques minutes pour nous partager<br />
            ton profil au pair
          </p>
        </div>
      </section>

      <section className="ap-main bg-sand-light">
        <div className="container">
          <div className="ap-header text-center">
            <p className="ap-intro">
              Explique ta situation afin que Grâce puisse vraiment t&apos;aider.<br />
              Ce n&apos;est pas un test, c&apos;est un <span className="bold">partage pour mieux te connaître</span> : )
            </p>
          </div>

          <div className="ap-form-container">
            <div className="ap-form-left">
              <div className="ap-form-steps">
                <span className="ap-step is-active">1. Ton profil</span>
                <span className={`ap-step ${slotComplete ? 'is-active' : ''}`}>2. Ton créneau</span>
                <span className={`ap-step ${slotComplete ? 'is-ready' : ''}`}>3. Confirmation</span>
              </div>

              <FormFeedback error={error} loading={loading} />
              <form
                className="ap-form"
                onSubmit={(e) => handleSubmit(e, { scrollTargetId: 'ap-booking-section' })}
              >
                <div className="ap-form-group">
                  <label>Ton prénom</label>
                  <input type="text" className="ap-input" name="firstName" required />
                </div>
                <div className="ap-form-group">
                  <label>Ton nom</label>
                  <input type="text" className="ap-input" name="lastName" required />
                </div>
                <div className="ap-form-group">
                  <label>Ton email</label>
                  <input type="email" className="ap-input" name="email" placeholder="prenom@exemple.com" required />
                </div>
                <div className="ap-form-group">
                  <label>Ton pays de résidence actuel</label>
                  <CountrySelect name="country" inputClassName="ap-input" required />
                </div>
                <div className="ap-form-group">
                  <label>Numéro de téléphone</label>
                  <input type="tel" className="ap-input" name="phone" required />
                </div>

                <div className="ap-form-group mt-3">
                  <label className="large-label">Dis-nous où tu en es</label>
                  <textarea
                    className="ap-input ap-textarea"
                    name="situation"
                    placeholder="J'explique ma situation, mes envies, mes doutes..."
                    rows="4"
                    required
                  />
                </div>

                <ul className="ap-benefits">
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

                <div className="ap-booking-section" id="ap-booking-section">
                  <div className="ap-booking-head">
                    <span className="ap-booking-badge">Étape 2</span>
                    <h3 className="ap-booking-title">Choisis ton créneau d&apos;échange</h3>
                    <p className="ap-booking-note">Sélectionne une date et une heure avant d&apos;envoyer ton profil.</p>
                  </div>
                  <BookingSlotPicker
                    compact
                    selectedDateKey={selectedDateKey}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDateKey}
                    onTimeChange={onTimeChange}
                  />
                </div>

                <div className="ap-submit-wrapper">
                  <button
                    type="submit"
                    className="btn btn-primary ap-submit-btn"
                    disabled={loading || !slotComplete}
                  >
                    {loading ? 'Envoi en cours…' : 'Envoyer mon profil'}
                  </button>
                  <p className="ap-submit-note">
                    {slotComplete
                      ? <>Tu recevras une réponse sous <span className="bold">24-48h</span> pour échanger directement avec nous.</>
                      : 'Le bouton s\'active une fois ton créneau choisi.'}
                  </p>
                </div>
              </form>
            </div>

            <div className="ap-form-right">
              <div className="ap-image-wrapper">
                <img src="https://i.ibb.co/d0jRLnsN/151329-E8-8784-4601-96-D2-A7-C219-F03-ACB.png" alt="Grace" className="ap-image" />
              </div>
              <div className="ap-right-text">nous répondons à toutes vos questions</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuPairForm;
