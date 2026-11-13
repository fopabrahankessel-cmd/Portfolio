import { type MotionStyle, useMotionValue, useSpring } from 'motion/react'
import { type RefObject, useEffect, useRef } from 'react'

import { usePointerEffects } from './useMediaQuery'

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 }

/**
 * Pulls an element slightly towards the pointer while it hovers.
 * Does nothing on touch devices or with reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.25,
): { ref: RefObject<T | null>; style: MotionStyle } {
  const ref = useRef<T>(null)
  const enabled = usePointerEffects()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [enabled, strength, x, y])

  return { ref, style: enabled ? { x, y } : {} }
}
