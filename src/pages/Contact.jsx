import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé avec succès ! Nous vous recontacterons bientôt.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="contact-title">Contactez-nous</h1>
        <p className="contact-subtitle">Une question ? Un projet ? N'hésitez pas à nous écrire.</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Envoyer le message</button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
