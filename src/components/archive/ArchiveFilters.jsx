import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import './archives.css';

const ArchiveFilters = ({ title, fields, values, onChange, onReset, resultCount }) => {
  const handle = (key, value) => onChange({ ...values, [key]: value });

  return (
    <aside className="archive-filters">
      <div className="archive-filters-head">
        <SlidersHorizontal size={18} />
        <h2>{title}</h2>
        <span className="archive-filters-count">{resultCount} résultat{resultCount !== 1 ? 's' : ''}</span>
      </div>
      <div className="archive-filters-body">
        {fields.map((field) => (
          <label key={field.key} className="archive-filter-field">
            <span>{field.label}</span>
            {field.type === 'select' ? (
              <select value={values[field.key] || ''} onChange={(e) => handle(field.key, e.target.value)}>
                <option value="">{field.placeholder || 'Tous'}</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={values[field.key] || ''}
                onChange={(e) => handle(field.key, e.target.value)}
              />
            )}
          </label>
        ))}
      </div>
      <button type="button" className="archive-filters-reset" onClick={onReset}>
        <RotateCcw size={14} />
        Réinitialiser
      </button>
    </aside>
  );
};

export default ArchiveFilters;
