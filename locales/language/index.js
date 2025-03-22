import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/language/en.json';
import tc from '@/locales/language/tc.json';
import sc from '@/locales/language/sc.json';

const resources = {
  en: {
    translation: en,
  },
  tc: {
    translation: tc,
  },
  sc: {
    translation: sc,
  },
};

export const setLocale = locale => {
  i18n.changeLanguage(locale);
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;