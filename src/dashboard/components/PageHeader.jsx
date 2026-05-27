import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, action }) => (
  <header className="page-header">
    <div className="page-header-text">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action && (
      action.to ? (
        <Link to={action.to} className="dash-btn dash-btn-primary dash-btn-sm">
          {action.label}
        </Link>
      ) : (
        <button
          type={action.submit ? 'submit' : 'button'}
          className="dash-btn dash-btn-primary dash-btn-sm"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )
    )}
  </header>
);

export default PageHeader;
