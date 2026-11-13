import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface CountUpProps {
  to: number
  suffix?: string
}

/** Counts from zero to `to` once, the first time it scrolls into view. */
function CountUp({ to, suffix = '' }: CountUpProps) {
  const { i18n } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduced, to])

  const shown = reduced ? to : value
  return (
    <span ref={ref} className="tabular-nums">
      {new Intl.NumberFormat(i18n.language).format(shown)}
      {suffix}
    </span>
  )
}

export function HeroStats() {
  const { t } = useTranslation()

  const stats = [
    { value: <CountUp to={3} />, label: t('hero.stats.systems') },
    { value: <CountUp to={3000} suffix="+" />, label: t('hero.stats.students') },
    { value: 'FR / EN', label: t('hero.stats.languages') },
  ]

  return (
    <dl className="border-line xs:grid-cols-3 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-dashed pt-7">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-1">
          <dt className="text-faint max-w-[22ch] text-xs leading-snug">{stat.label}</dt>
          <dd className="font-display text-cloth text-2xl font-extrabold sm:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
