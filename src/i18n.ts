import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {}
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

const anyI18n = i18n as any;

if (typeof anyI18n.detectLanguage !== 'function') {
  anyI18n.detectLanguage = (callback?: (lng: string) => void) => {
    const lng =
      anyI18n.language ||
      anyI18n.options?.lng ||
      (Array.isArray(anyI18n.languages) && anyI18n.languages[0]) ||
      'en';

    if (typeof callback === 'function') {
      callback(lng);
    }

    return lng;
  };
}

export default i18n;
