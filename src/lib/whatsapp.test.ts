import { describe, expect, it } from 'vitest'

import { buildWhatsAppUrl } from './whatsapp'

const message = "Bonjour Brahan,\nj'ai vu ton portfolio é"

describe('buildWhatsAppUrl', () => {
  it('encodes accents, spaces and line breaks in the message', () => {
    expect(buildWhatsAppUrl('237640154719', message)).toBe(
      'https://wa.me/237640154719?text=' + encodeURIComponent(message),
    )
  })

  it('strips formatting from a displayed phone number', () => {
    expect(buildWhatsAppUrl('+237 640 154 719', message)).toBe(
      buildWhatsAppUrl('237640154719', message),
    )
  })
})
