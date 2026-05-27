const STORAGE_KEY = 'grace_site_lang';
const PAGE_LANG = 'fr';

/** Langues proposées dans le menu (code Google Translate) */
export const SITE_LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'sv', label: 'Svenska' },
  { code: 'da', label: 'Dansk' },
  { code: 'no', label: 'Norsk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'cs', label: 'Čeština' },
  { code: 'hu', label: 'Magyar' },
  { code: 'ro', label: 'Română' },
  { code: 'uk', label: 'Українська' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'hi', label: 'हिन्दी' },
];

const includedLanguages = SITE_LANGUAGES.map((l) => l.code).join(',');

export function getSavedLanguage() {
  return localStorage.getItem(STORAGE_KEY);
}

export function getBrowserLanguage() {
  const raw = navigator.language || navigator.userLanguage || PAGE_LANG;
  const code = raw.split('-')[0].toLowerCase();
  const full = raw.replace('_', '-');

  if (SITE_LANGUAGES.some((l) => l.code === full)) return full;
  if (SITE_LANGUAGES.some((l) => l.code === code)) return code;
  if (code === 'zh') return 'zh-CN';
  return code;
}

export function resolveInitialLanguage() {
  const saved = getSavedLanguage();
  if (saved) return saved;
  const browser = getBrowserLanguage();
  return browser === PAGE_LANG ? PAGE_LANG : browser;
}

export function saveLanguage(code) {
  if (code === PAGE_LANG) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, code);
  }
}

function setTranslateCookie(targetLang) {
  const value = targetLang === PAGE_LANG ? '' : `/${PAGE_LANG}/${targetLang}`;
  const hostname = window.location.hostname;
  const cookie = value
    ? `googtrans=${value};path=/;max-age=31536000`
    : 'googtrans=;path=/;max-age=0';

  document.cookie = cookie;
  if (hostname && hostname !== 'localhost') {
    document.cookie = `${cookie};domain=${hostname}`;
    document.cookie = `${cookie};domain=.${hostname}`;
  }
}

export function applyGoogleTranslateLanguage(targetLang) {
  saveLanguage(targetLang);
  setTranslateCookie(targetLang);

  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = targetLang;
    combo.dispatchEvent(new Event('change'));
    return;
  }

  window.location.reload();
}

export function loadGoogleTranslateScript(onReady) {
  if (window.google?.translate?.TranslateElement) {
    onReady();
    return;
  }

  window.googleTranslateElementInit = () => {
    const el = document.getElementById('google_translate_element');
    if (!el || !window.google?.translate?.TranslateElement) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: PAGE_LANG,
        includedLanguages,
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element',
    );

    onReady();
  };

  if (document.getElementById('google-translate-script')) return;

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

export function initAutoTranslate() {
  const target = resolveInitialLanguage();
  if (target === PAGE_LANG) return;

  const tryApply = (attempt = 0) => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      setTranslateCookie(target);
      combo.value = target;
      combo.dispatchEvent(new Event('change'));
      return;
    }
    if (attempt < 20) {
      setTimeout(() => tryApply(attempt + 1), 200);
    }
  };

  tryApply();
}
