import React, { useRef, useState } from 'react';
import { FormFeedback } from '../components/FormFeedback';
import { usePublicFormSubmit } from '../hooks/usePublicFormSubmit';
import './Contact.css';

const Contact = () => {
  const formRef = useRef(null);
  const [success, setSuccess] = useState('');
  const { handleSubmit, loading, error } = usePublicFormSubmit({
    type: 'contact',
    onSuccess: () => {
      setSuccess('Message envoyé avec succès ! Nous vous recontacterons bientôt.');
      formRef.current?.reset();
    },
  });

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="contact-title">Contactez-nous</h1>
        <p className="contact-subtitle">Une question ? Un projet ? N'hésitez pas à nous écrire.</p>

        <FormFeedback error={error} success={success} loading={loading} />

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" required rows="5"></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Envoi…' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
