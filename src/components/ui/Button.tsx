import { motion } from 'motion/react'
import type { MouseEventHandler, ReactNode } from 'react'

import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'lg' | 'sm'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Renders a link when set, a button otherwise. */
  href?: string
  /** Opens the link in a new tab with safe rel attributes. */
  external?: boolean
  /** File name to download the link target as. */
  download?: string
  /** Pulls the button slightly towards the pointer. */
  magnetic?: boolean
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  'aria-label'?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold whitespace-nowrap transition-[box-shadow,border-color,background-color,color] duration-300 will-change-transform'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-ink shadow-[0_0_0_0_rgba(232,69,44,0)] hover:shadow-[0_10px_40px_-8px_rgba(232,69,44,0.65)]',
  ghost:
    'border border-line bg-surface/60 text-cloth backdrop-blur hover:border-saffron/70 hover:bg-surface-2',
}

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-3 text-sm sm:text-[15px]',
  lg: 'px-7 py-4 text-base sm:text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  download,
  magnetic,
  icon,
  onClick,
  className,
  ...aria
}: ButtonProps) {
  const { ref, style } = useMagnetic<HTMLElement>(magnetic ? 0.25 : 0)
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {icon ? <span className="shrink-0 text-[1.15em]">{icon}</span> : null}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        style={style}
        whileTap={{ scale: 0.97 }}
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={classes}
        {...aria}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      style={style}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onClick}
      className={classes}
      {...aria}
    >
      {content}
    </motion.button>
  )
}
