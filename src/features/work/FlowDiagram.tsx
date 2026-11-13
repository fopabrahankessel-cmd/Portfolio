import { Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TechIcon } from '@/components/icons/TechIcon'
import { flowNodes } from '@/content/flow'
import type { FlowNodeId } from '@/content/types'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

/**
 * SchoolLink's request flow. Each step is a button; choosing one shows the
 * engineering decision made at that point.
 */
export function FlowDiagram() {
  const { t } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const [selected, setSelected] = useState<FlowNodeId>(flowNodes[0].id)
  const selectedIndex = flowNodes.findIndex((node) => node.id === selected)

  return (
    <div className="border-line bg-ink/60 rounded-2xl border p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="font-display text-cloth text-lg font-semibold">{t('work.flowTitle')}</h4>
        <p className="text-faint text-xs">{t('work.flowHint')}</p>
      </div>

      <div className="relative">
        {/* The thread connecting the steps (wide screens) */}
        <div
          aria-hidden="true"
          className="absolute top-7 right-[8%] left-[8%] hidden h-px lg:block"
        >
          <div className="border-line absolute inset-0 border-t border-dashed" />
          <div
            className="from-ember to-saffron absolute inset-y-0 left-0 h-px bg-linear-to-r transition-[width] duration-500"
            style={{ width: `${(selectedIndex / (flowNodes.length - 1)) * 100}%` }}
          />
          {reduced
            ? null
            : [0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="bg-saffron absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full shadow-[0_0_10px_2px_rgba(242,163,58,0.8)]"
                  initial={{ left: '0%', opacity: 0 }}
                  animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4.5, delay: dot * 1.5, repeat: Infinity, ease: 'linear' }}
                />
              ))}
        </div>

        <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {flowNodes.map((node, index) => {
            const active = node.id === selected
            const passed = index <= selectedIndex
            return (
              <li key={node.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(node.id)}
                  className={cn(
                    'group flex h-full w-full flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition-colors duration-300',
                    active
                      ? 'border-saffron/70 bg-surface-2'
                      : 'hover:border-line hover:bg-surface border-transparent',
                  )}
                >
                  <span
                    className={cn(
                      'bg-ink grid size-8 place-items-center rounded-lg border transition-colors duration-300',
                      passed ? 'border-saffron/70' : 'border-line',
                    )}
                  >
                    {node.techId ? (
                      <TechIcon id={node.techId} size={16} />
                    ) : (
                      <Users size={16} aria-hidden="true" className="text-saffron" />
                    )}
                  </span>
                  <span className="text-cloth text-[13px] leading-tight font-semibold">
                    {t(`flow.${node.id}.label`)}
                  </span>
                  <span className="text-faint font-mono text-[10px] leading-tight">
                    {t(`flow.${node.id}.caption`)}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div
        aria-live="polite"
        className="border-line mt-5 min-h-[9.5rem] border-t border-dashed pt-5 sm:min-h-[7.5rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-saffron mb-2 font-mono text-[11px] tracking-[0.18em] uppercase">
              {t('work.flowStep', { current: selectedIndex + 1, total: flowNodes.length })}
              {' · '}
              {t(`flow.${selected}.decisionTitle`)}
            </p>
            <p className="text-muted max-w-3xl text-sm leading-relaxed sm:text-base">
              {t(`flow.${selected}.decision`)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
