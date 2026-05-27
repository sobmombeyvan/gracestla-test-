import React from 'react';
import { Link } from 'react-router-dom';
import './archives.css';

const ArchiveHero = ({ eyebrow, title, subtitle, ctaTo, ctaLabel }) => (
  <section className="archive-hero">
    <div className="archive-hero-bg" aria-hidden />
    <div className="container archive-hero-inner">
      {eyebrow && <p className="archive-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <p className="archive-hero-lead">{subtitle}</p>}
      {ctaTo && (
        <Link to={ctaTo} className="btn btn-primary archive-hero-cta">
          {ctaLabel}
        </Link>
      )}
    </div>
  </section>
);

export default ArchiveHero;
