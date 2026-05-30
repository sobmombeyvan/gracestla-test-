import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/programme', label: 'Le Programme' },
    { path: '/au-pair', label: 'Au pair' },
    { path: '/famille', label: 'Famille' },
    { path: '/services', label: 'Services' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
    { path: '/dashboard', label: 'Se connecter' },
  ];

  return (
    <header className="main-header">
      <div className="container header-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img
            src="https://i.ibb.co/hJZCdQZV/a58c51a0-e528-4428-9001-dc5f2980819c.jpg"
            alt="Grâce est là"
            className="header-logo-img"
          />
        </Link>

        <div className="header-toolbar">
          <div className="header-actions">
            <LanguageSwitcher compact />
            <Link to="/reservation" className="btn btn-primary header-btn desktop-only-btn">
              Je suis intéressé(e)
            </Link>
          </div>
          <button
            type="button"
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {isMenuOpen && (
          <button
            type="button"
            className="nav-overlay"
            onClick={closeMenu}
            aria-label="Fermer le menu"
          />
        )}

        <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`} aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="header-mobile-lang notranslate">
            <LanguageSwitcher />
          </div>
          <Link to="/reservation" className="btn btn-primary header-btn mobile-only-btn" onClick={closeMenu}>
            Je suis intéressé(e)
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
