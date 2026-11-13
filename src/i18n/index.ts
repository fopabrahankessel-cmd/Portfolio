import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en/translation.json'
import fr from '@/locales/fr/translation.json'

import { detectLanguage, type Lang, readStoredLanguage, storeLanguage } from './detectLanguage'

const initial = detectLanguage(
  readStoredLanguage(),
  typeof navigator === 'undefined' ? undefined : navigator.language,
)

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fr: { translation: fr } },
  lng: initial,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

document.documentElement.lang = initial

i18n.on('languageChanged', (lang) => {
  document.documentElement.lang = lang
  storeLanguage(lang as Lang)
})

export default i18n
