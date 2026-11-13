import { motion, useScroll, useSpring, useTransform } from 'motion/react'

import { sectionIds } from '@/content/sections'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

interface ScrollThreadProps {
  /** Id of the section currently in view; knots up to it are lit. */
  activeId: string
}

/**
 * An embroidered thread down the left edge that stitches itself as the page
 * scrolls, with one knot per section. Wide screens only, decorative.
 */
export function ScrollThread({ activeId }: ScrollThreadProps) {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })
  const needleTop = useTransform(progress, (value) => `${value * 100}%`)
  const activeIndex = sectionIds.indexOf(activeId as (typeof sectionIds)[number])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-28 bottom-16 left-5 z-30 hidden w-4 xl:block 2xl:left-10"
    >
      {/* Unstitched guide line */}
      <div className="border-line absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed" />

      {/* Stitched thread */}
      <motion.div
        style={{ scaleY: reduced ? 1 : progress }}
        className="from-ember to-saffron absolute inset-y-0 left-1/2 w-[2px] origin-top -translate-x-1/2 bg-linear-to-b"
      />

      {/* One knot per section */}
      {sectionIds.map((id, index) => (
        <span
          key={id}
          style={{ top: `${(index / (sectionIds.length - 1)) * 100}%` }}
          className={cn(
            'absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-colors duration-500',
            index <= activeIndex ? 'border-saffron bg-ember' : 'border-line bg-ink',
          )}
        />
      ))}

      {/* Needle */}
      {reduced ? null : (
        <motion.span
          style={{ top: needleTop }}
          className="bg-cloth absolute left-1/2 h-5 w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_12px_2px_rgba(242,163,58,0.7)]"
        />
      )}
    </div>
  )
}
