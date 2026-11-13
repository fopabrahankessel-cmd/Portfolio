import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Id of the heading that names this section for assistive technology. */
  labelledBy?: string
}

/** A page section with the shared width, gutters and vertical rhythm. */
export function Section({ id, children, className, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28', className)}
    >
      {children}
    </section>
  )
}
