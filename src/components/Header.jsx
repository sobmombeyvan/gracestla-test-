import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/au-pair', label: 'Jeune au pair' },
    { path: '/famille', label: "Familles d'accueil" },
    { path: '/services', label: 'Services' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="main-header">
      <div className="container header-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <div className="logo-wrapper">
             <div className="logo-icon-svg">
               <svg viewBox="0 0 100 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                 {/* Left abstract person (Teal) */}
                 <circle cx="25" cy="15" r="10" fill="var(--teal)" />
                 <path d="M 25 30 C 10 30, -5 50, 10 70 C 15 78, 30 75, 40 68 C 45 62, 50 55, 52 50 C 42 60, 20 70, 15 55 C 10 40, 25 40, 35 45" fill="var(--teal)" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                 
                 {/* Right abstract person (Brown) */}
                 <circle cx="55" cy="15" r="10" fill="var(--brown)" />
                 <path d="M 55 30 C 70 30, 85 50, 70 70 C 65 78, 50 75, 40 68 C 35 62, 30 55, 28 50 C 38 60, 60 70, 65 55 C 70 40, 55 40, 45 45" fill="var(--brown)" stroke="var(--brown)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                 
               </svg>
             </div>
             <div className="logo-text">
                <h1 className="header-logo"><span className="logo-grace">Grâce</span><span className="logo-estla">est là</span></h1>
             </div>
          </div>
        </Link>

        {/* Hamburger Toggle */}
        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
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
          <Link to="/reservation" className="btn btn-primary header-btn mobile-only-btn" onClick={closeMenu}>Je suis intéressé(e)</Link>
        </nav>
        
        <Link to="/reservation" className="btn btn-primary header-btn desktop-only-btn">Je suis intéressé(e)</Link>
      </div>
    </header>
  );
};

export default Header;

