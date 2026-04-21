import React from 'react';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials text-center">
      <div className="container">
        <div className="section-header">
          <span className="line"></span>
          <h2 className="section-title">Elles en parlent mieux que nous</h2>
          <span className="line"></span>
        </div>
        
        <div className="testimonial-box">
          <div className="testimonial-image-container">
             <img src="/why_1.png" alt="Laura & Thomas" className="testimonial-image" />
          </div>
          <div className="testimonial-text-container">
            <span className="quote-mark open">“</span>
            <p className="quote">
              Grâce a vraiment changé notre expérience au pair.<br />
              Un soutien précieux à chaque étape!
            </p>
            <span className="quote-mark close">”</span>
            <p className="author-name">Laura & Thomas</p>
          </div>
        </div>

        <div className="pagination">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        
        <div className="cta-container">
          <Link to="/reservation" className="btn btn-primary cta-btn" style={{textDecoration: 'none'}}>Prêt à vous lancer ?</Link>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
