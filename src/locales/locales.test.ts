import { describe, expect, it } from 'vitest'

import en from './en/translation.json'
import fr from './fr/translation.json'

type Tree = { [key: string]: Tree | string | string[] }

function flatten(tree: Tree, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') out[path] = value
    else if (Array.isArray(value)) value.forEach((item, i) => (out[`${path}.${i}`] = item))
    else Object.assign(out, flatten(value, path))
  }
  return out
}

const flatEn = flatten(en as Tree)
const flatFr = flatten(fr as Tree)

describe('locale files', () => {
  it('have identical keys in English and French', () => {
    expect(Object.keys(flatFr).sort()).toEqual(Object.keys(flatEn).sort())
  })

  it('have no empty values', () => {
    for (const flat of [flatEn, flatFr]) {
      const empty = Object.entries(flat).filter(([, value]) => value.trim() === '')
      expect(empty).toEqual([])
    }
  })

  it('never claim professional experience', () => {
    const forbidden = /professional experience|expérience professionnelle/i
    for (const flat of [flatEn, flatFr]) {
      const offending = Object.entries(flat).filter(([, value]) => forbidden.test(value))
      expect(offending).toEqual([])
    }
  })
})
