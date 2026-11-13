import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface RevealProps {
  children: ReactNode
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number
  className?: string
}

/** Fades and lifts its children in the first time they enter the viewport. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}
