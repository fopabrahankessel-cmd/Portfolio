import Lenis from 'lenis'
import { type ReactNode, useEffect } from 'react'

import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Smooth wheel scrolling and eased anchor jumps. With reduced motion the
 * browser's native, instant scrolling is left untouched.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.11 })
    return () => lenis.destroy()
  }, [reduced])

  return <>{children}</>
}
