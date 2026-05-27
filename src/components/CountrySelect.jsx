import React from 'react';
import { COUNTRIES, COUNTRY_SELECT_PLACEHOLDER } from '../data/countries';
import './CountrySelect.css';

/**
 * Liste déroulante mondiale des pays (noms en français).
 * Utilise un <select> natif pour un rendu clair sur mobile et desktop.
 */
const CountrySelect = ({
  name = 'country',
  className = '',
  inputClassName = '',
  required = false,
  defaultValue = '',
  id,
}) => {
  const selectClass = ['country-select-native', inputClassName].filter(Boolean).join(' ');

  return (
    <div className={`country-select ${className}`}>
      <select
        id={id}
        name={name}
        className={selectClass}
        required={required}
        defaultValue={defaultValue}
      >
        <option value="" disabled>
          {COUNTRY_SELECT_PLACEHOLDER}
        </option>
        {COUNTRIES.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
