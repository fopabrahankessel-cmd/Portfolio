import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** The striped Toghu band used as a picture frame. */
export function StripeFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'bg-stripes rounded-[1.4rem] p-2.5 shadow-[0_30px_80px_-30px_rgba(232,69,44,0.55)]',
        className,
      )}
    >
      <div className="bg-ink overflow-hidden rounded-[0.9rem]">{children}</div>
    </div>
  )
}
