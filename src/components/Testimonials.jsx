import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Testimonials.css';

const testimonialsData = [
  {
    image: "https://i.ibb.co/ynsRxK1f/345c1e8d-0705-4f69-876f-a0b9d3709821.jpg",
    quote: "Grâce a vraiment changé notre expérience au pair.\nUn soutien précieux à chaque étape!",
    author: "Laura & Thomas"
  },
  {
    image: "https://i.ibb.co/4ncNS6ky/5e2aeba4-eb30-466a-8040-2b4fc6b346b9.jpg",
    quote: "Une mise en relation exceptionnelle. Nous avons trouvé la perle rare pour nos enfants en un temps record.",
    author: "Sophie & Marc"
  },
  {
    image: "https://i.ibb.co/bj5HDgd0/653422ad-f084-4450-b82b-b24fea775e1e.jpg",
    quote: "L'accompagnement est personnalisé et très professionnel. Je recommande vivement leurs services !",
    author: "Emma"
  },
  {
    image: "https://i.ibb.co/ynsRxK1f/345c1e8d-0705-4f69-876f-a0b9d3709821.jpg",
    quote: "Grâce à leurs conseils, mon séjour au pair s'est déroulé à merveille du début à la fin.",
    author: "Julia"
  },
  {
    image: "https://i.ibb.co/4ncNS6ky/5e2aeba4-eb30-466a-8040-2b4fc6b346b9.jpg",
    quote: "Une agence de confiance qui prend vraiment soin de ses familles et de ses jeunes au pair.",
    author: "Famille Dubois"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonialsData[currentIndex];

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
             <img src={currentTestimonial.image} alt={currentTestimonial.author} className="testimonial-image" />
          </div>
          <div className="testimonial-text-container">
            <span className="quote-mark open">“</span>
            <p className="quote">
              {currentTestimonial.quote.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== currentTestimonial.quote.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <span className="quote-mark close">”</span>
            <p className="author-name">{currentTestimonial.author}</p>
          </div>
        </div>

        <div className="pagination">
          {testimonialsData.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
        
        <div className="cta-container">
          <Link to="/reservation" className="btn btn-primary cta-btn" style={{textDecoration: 'none'}}>Prêt à vous lancer ?</Link>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
