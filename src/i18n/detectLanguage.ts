export type Lang = 'en' | 'fr'

export const languages: Lang[] = ['en', 'fr']

const STORAGE_KEY = 'bkf.lang'

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'fr'
}

/** A stored choice wins; otherwise French browsers get French, everyone else English. */
export function detectLanguage(stored: string | null, navigatorLang: string | undefined): Lang {
  if (isLang(stored)) return stored
  return navigatorLang?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

/** Never throws: storage can be blocked in private windows. */
export function readStoredLanguage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/** Never throws: the switch must keep working without storage. */
export function storeLanguage(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Remembering the choice is a convenience only.
  }
}
