import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import {
  SITE_LANGUAGES,
  applyGoogleTranslateLanguage,
  getSavedLanguage,
  getBrowserLanguage,
  initAutoTranslate,
  loadGoogleTranslateScript,
  resolveInitialLanguage,
} from '../utils/googleTranslate';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ compact = false }) => {
  const location = useLocation();
  const [current, setCurrent] = useState(() => resolveInitialLanguage());
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadGoogleTranslateScript(() => {
      setReady(true);
      initAutoTranslate();
      const saved = getSavedLanguage();
      setCurrent(saved || resolveInitialLanguage());
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const lang = getSavedLanguage() || getBrowserLanguage();
    if (lang && lang !== 'fr') {
      const t = setTimeout(() => initAutoTranslate(), 300);
      return () => clearTimeout(t);
    }
  }, [location.pathname, ready]);

  const onPick = (code) => {
    setCurrent(code);
    setOpen(false);
    applyGoogleTranslateLanguage(code);
  };

  const currentLabel =
    SITE_LANGUAGES.find((l) => l.code === current)?.label ?? 'Français';

  return (
    <div className={`lang-switcher ${compact ? 'lang-switcher--compact' : ''}`}>
      <div id="google_translate_element" className="lang-switcher-widget" aria-hidden />

      <button
        type="button"
        className="lang-switcher-btn notranslate"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Choisir la langue du site"
        title="Traduire le site"
      >
        <Globe size={compact ? 18 : 20} />
        {!compact && <span className="notranslate">{currentLabel}</span>}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="lang-switcher-backdrop"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
          />
          <ul className="lang-switcher-menu notranslate" role="listbox">
            {SITE_LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={current === lang.code}
                  className={current === lang.code ? 'is-active' : ''}
                  onClick={() => onPick(lang.code)}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
