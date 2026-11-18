import { beforeEach, describe, expect, it } from 'vitest'

import { readConsent, storeConsent } from './consent'

const DAY = 24 * 60 * 60 * 1000

describe('consent', () => {
  beforeEach(() => window.localStorage.clear())

  it('is unknown until the visitor chooses', () => {
    expect(readConsent()).toBeNull()
  })

  it('remembers a choice', () => {
    storeConsent('denied')
    expect(readConsent()).toBe('denied')
    storeConsent('granted')
    expect(readConsent()).toBe('granted')
  })

  it('expires after 13 months', () => {
    storeConsent('granted', 0)
    expect(readConsent(300 * DAY)).toBe('granted')
    expect(readConsent(400 * DAY)).toBeNull()
  })

  it('ignores corrupted storage', () => {
    window.localStorage.setItem('bkf.consent', '{not json')
    expect(readConsent()).toBeNull()
  })
})
