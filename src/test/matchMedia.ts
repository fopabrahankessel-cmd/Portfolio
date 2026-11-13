import { vi } from 'vitest'

/** Test helper: makes `window.matchMedia` report the given queries as matching. */
export function mockMatchMedia(matching: string[] = []): void {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: matching.includes(query),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const POINTER_FINE = '(pointer: fine)'
