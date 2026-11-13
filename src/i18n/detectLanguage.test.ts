import { afterEach, describe, expect, it, vi } from 'vitest'

import { detectLanguage, readStoredLanguage, storeLanguage } from './detectLanguage'

describe('detectLanguage', () => {
  it('prefers a valid stored choice', () => {
    expect(detectLanguage('fr', 'en-US')).toBe('fr')
  })

  it('follows a French browser when nothing is stored', () => {
    expect(detectLanguage(null, 'fr-CM')).toBe('fr')
  })

  it('falls back to English for other browsers', () => {
    expect(detectLanguage(null, 'en-GB')).toBe('en')
    expect(detectLanguage(null, undefined)).toBe('en')
  })

  it('ignores an unsupported stored value', () => {
    expect(detectLanguage('de', 'fr')).toBe('fr')
  })
})

describe('language storage', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns null instead of throwing when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readStoredLanguage()).toBeNull()
  })

  it('does not throw when writing to blocked storage', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => storeLanguage('fr')).not.toThrow()
  })

  it('round-trips a stored language', () => {
    storeLanguage('fr')
    expect(readStoredLanguage()).toBe('fr')
  })
})
