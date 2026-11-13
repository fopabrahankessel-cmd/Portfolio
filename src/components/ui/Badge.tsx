import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'live' | 'private' | 'neutral' | 'brand'

const tones: Record<Tone, string> = {
  live: 'border-line text-saffron',
  private: 'border-line text-muted',
  neutral: 'border-line text-muted',
  brand: 'border-ember/50 text-saffron',
}

interface BadgeProps {
  tone?: Tone
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function Badge({ tone = 'neutral', children, icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-ink/60 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur',
        tones[tone],
        className,
      )}
    >
      {tone === 'live' ? (
        <span aria-hidden="true" className="relative flex size-2">
          <span className="bg-live absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping" />
          <span className="bg-live relative inline-flex size-2 rounded-full" />
        </span>
      ) : null}
      {icon}
      {children}
    </span>
  )
}
