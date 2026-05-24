import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <Link to="/" className="footer-logo-link">
            <img src="https://i.ibb.co/hJZCdQZV/a58c51a0-e528-4428-9001-dc5f2980819c.jpg" alt="Grâce est là" className="footer-logo" />
          </Link>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/politique-confidentialite">Politique de confidentialité</Link></li>
            <li><Link to="/politique-cookies">Cookies</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Grâce est là. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
