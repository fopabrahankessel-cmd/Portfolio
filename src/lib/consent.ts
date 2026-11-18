export type Consent = 'granted' | 'denied'

const STORAGE_KEY = 'bkf.consent'
/** Ask again after 13 months, as recommended by European regulators. */
const MAX_AGE_MS = 395 * 24 * 60 * 60 * 1000
const OPEN_EVENT = 'bkf:open-consent'

interface StoredConsent {
  value: Consent
  at: number
}

/** Returns null when no valid, unexpired choice exists. Never throws. */
export function readConsent(now = Date.now()): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    if (parsed.value !== 'granted' && parsed.value !== 'denied') return null
    if (typeof parsed.at !== 'number' || now - parsed.at > MAX_AGE_MS) return null
    return parsed.value
  } catch {
    return null
  }
}

/** Never throws: without storage the banner simply shows again next visit. */
export function storeConsent(value: Consent, now = Date.now()): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: now }))
  } catch {
    // Remembering the choice is a convenience only.
  }
}

/** Lets any component (the footer link) reopen the banner. */
export function openConsentBanner(): void {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onConsentBannerOpen(listener: () => void): () => void {
  window.addEventListener(OPEN_EVENT, listener)
  return () => window.removeEventListener(OPEN_EVENT, listener)
}
