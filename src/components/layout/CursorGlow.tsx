import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

import { usePointerEffects } from '@/hooks/useMediaQuery'

const SIZE = 520
const SPRING = { stiffness: 120, damping: 22, mass: 0.6 }

/** A soft ember glow that trails the pointer. Desktop only, decorative. */
export function CursorGlow() {
  const enabled = usePointerEffects()
  const x = useSpring(useMotionValue(-SIZE), SPRING)
  const y = useSpring(useMotionValue(-SIZE), SPRING)

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - SIZE / 2)
      y.set(event.clientY - SIZE / 2)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        background:
          'radial-gradient(circle, rgba(232,69,44,0.13) 0%, rgba(242,163,58,0.06) 35%, transparent 65%)',
      }}
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full"
    />
  )
}
