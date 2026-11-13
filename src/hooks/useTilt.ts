import { type MotionStyle, useMotionValue, useSpring } from 'motion/react'
import { type RefObject, useEffect, useRef } from 'react'

import { usePointerEffects } from './useMediaQuery'

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 }

/**
 * Tilts an element towards the pointer. Spread `style` on a `motion` element
 * and attach `ref`. Does nothing on touch devices or with reduced motion.
 */
export function useTilt<T extends HTMLElement>(
  maxDeg = 8,
): { ref: RefObject<T | null>; style: MotionStyle } {
  const ref = useRef<T>(null)
  const enabled = usePointerEffects()
  const rotateX = useSpring(useMotionValue(0), SPRING)
  const rotateY = useSpring(useMotionValue(0), SPRING)

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      rotateX.set(-y * 2 * maxDeg)
      rotateY.set(x * 2 * maxDeg)
    }
    const onLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [enabled, maxDeg, rotateX, rotateY])

  return { ref, style: enabled ? { rotateX, rotateY, transformPerspective: 900 } : {} }
}
