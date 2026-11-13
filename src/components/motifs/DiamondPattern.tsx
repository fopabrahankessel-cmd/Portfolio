import { useId } from 'react'

import { cn } from '@/lib/cn'

/**
 * Embroidered background: a lattice of stitched lines with ember and saffron
 * knots at the crossings. Purely decorative.
 */
export function DiamondPattern({ className }: { className?: string }) {
  const id = useId()

  return (
    <svg aria-hidden="true" className={cn('pointer-events-none absolute', className)}>
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M0 40 40 0 80 40 40 80Z"
            fill="none"
            stroke="var(--color-cloth)"
            strokeOpacity=".11"
            strokeWidth="1.2"
            strokeDasharray="5 5"
          />
          <path
            d="M20 40 40 20 60 40 40 60Z"
            fill="none"
            stroke="var(--color-saffron)"
            strokeOpacity=".12"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
          <rect x="37.5" y="37.5" width="5" height="5" transform="rotate(45 40 40)" fill="var(--color-ember)" fillOpacity=".8" />
          <circle cx="0" cy="0" r="2" fill="var(--color-saffron)" fillOpacity=".7" />
          <circle cx="80" cy="0" r="2" fill="var(--color-saffron)" fillOpacity=".7" />
          <circle cx="0" cy="80" r="2" fill="var(--color-saffron)" fillOpacity=".7" />
          <circle cx="80" cy="80" r="2" fill="var(--color-saffron)" fillOpacity=".7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
