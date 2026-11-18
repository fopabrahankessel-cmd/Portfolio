import { describe, expect, it } from 'vitest'

import { profile } from '@/content/profile'

import { conceal, reveal } from './obfuscate'

describe('obfuscate', () => {
  it('round-trips a value', () => {
    expect(reveal(conceal('someone@example.com'))).toBe('someone@example.com')
  })

  it('decodes the profile contact details', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/)
    expect(profile.whatsappNumber).toMatch(/^\d{12}$/)
    expect(profile.phoneDisplay.replace(/\D/g, '')).toBe(profile.whatsappNumber)
  })
})
