import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { TechIcon } from '@/components/icons/TechIcon'
import { techIcons } from '@/components/icons/techIcons'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { stackGroups } from '@/content/stack'
import type { StackGroup } from '@/content/types'
import { cn } from '@/lib/cn'

type Item = StackGroup['items'][number]

function TechTile({ item }: { item: Item }) {
  const { t } = useTranslation()
  const { label, color } = techIcons[item.techId]

  return (
    <motion.li
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{ '--brand': color } as React.CSSProperties}
      className={cn(
        'group/tile relative flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300',
        item.core
          ? 'border-saffron/60 bg-surface-2 basis-full sm:basis-[calc(50%-0.375rem)]'
          : 'border-line bg-ink/50 hover:border-(--brand)',
      )}
    >
      <span
        className={cn(
          'bg-ink grid shrink-0 place-items-center rounded-lg border',
          item.core ? 'border-saffron/50 size-12' : 'border-line size-9',
        )}
      >
        <TechIcon id={item.techId} size={item.core ? 26 : 18} />
      </span>
      <span
        className={cn('text-cloth font-medium', item.core ? 'font-display text-lg' : 'text-sm')}
      >
        {label}
      </span>
      {item.core ? (
        <span className="bg-gradient-brand text-ink ml-auto rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase">
          {t('stack.core')}
        </span>
      ) : null}
    </motion.li>
  )
}

export default function Stack() {
  const { t } = useTranslation()

  return (
    <Section id="stack" labelledBy="stack-title">
      <SectionHeading id="stack-title" index="03" eyebrow={t('stack.eyebrow')} title={t('stack.title')} />

      <div className="grid gap-5 lg:grid-cols-6">
        {stackGroups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={index * 0.07}
            className={cn(
              // Backend leads on a full-width row, the rest sit in pairs.
              index === 0 ? 'lg:col-span-6' : index === 4 ? 'lg:col-span-6' : 'lg:col-span-2',
            )}
          >
            <div className="border-line bg-surface/70 h-full rounded-2xl border p-5 backdrop-blur sm:p-6">
              <h3 className="text-saffron mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
                <span aria-hidden="true" className="bg-ember size-1.5 rotate-45" />
                {t(`stack.groups.${group.id}`)}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <TechTile key={item.techId} item={item} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
