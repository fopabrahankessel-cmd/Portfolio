import { ArrowUpRight, ChevronDown, Lock } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, type ReactNode, use, useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { GitHubIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import type { Project } from '@/content/types'
import { cn } from '@/lib/cn'

/*
 * Compound component: <ProjectCard> owns the project and the open/closed
 * state, and its parts read both from context. A page composes only the
 * parts it needs, in the order it wants.
 */

interface ProjectCardContext {
  project: Project
  expanded: boolean
  toggle: () => void
  detailsId: string
}

const Context = createContext<ProjectCardContext | null>(null)

function useProjectCard(): ProjectCardContext {
  const value = use(Context)
  if (!value) throw new Error('ProjectCard parts must be rendered inside <ProjectCard>.')
  return value
}

interface ProjectCardProps {
  project: Project
  children: ReactNode
  className?: string
}

function ProjectCardRoot({ project, children, className }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const detailsId = useId()
  const value = useMemo(
    () => ({ project, expanded, toggle: () => setExpanded((open) => !open), detailsId }),
    [project, expanded, detailsId],
  )

  return (
    <Context value={value}>
      <article
        className={cn(
          'border-line bg-surface/80 relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl border p-6 backdrop-blur sm:p-8',
          className,
        )}
      >
        {children}
      </article>
    </Context>
  )
}

function Header({ index }: { index: string }) {
  const { t } = useTranslation()
  const { project } = useProjectCard()

  return (
    <header>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="text-faint font-mono text-xs">{index}</span>
        {project.featured ? <Badge tone="brand">{t('work.flagship')}</Badge> : null}
        {project.isPrivate ? (
          <Badge tone="private" icon={<Lock size={12} aria-hidden="true" />}>
            {t('work.privateCode')}
          </Badge>
        ) : null}
      </div>
      <h3
        className={cn(
          'font-display text-cloth font-extrabold tracking-tight',
          project.featured ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl',
        )}
      >
        {t(`projects.${project.id}.name`)}
      </h3>
      <p className="text-saffron mt-2 text-sm font-medium sm:text-base">
        {t(`projects.${project.id}.tagline`)}
      </p>
      <p
        className={cn(
          'text-muted mt-4 leading-relaxed',
          project.featured ? 'max-w-3xl text-base sm:text-lg' : 'text-sm sm:text-base',
        )}
      >
        {t(`projects.${project.id}.summary`)}
      </p>
    </header>
  )
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-faint mb-2.5 font-mono text-[11px] tracking-[0.18em] uppercase">
      {children}
    </p>
  )
}

function Role() {
  const { t } = useTranslation()
  const { project } = useProjectCard()

  return (
    <div>
      <Label>{t('work.role')}</Label>
      <p className="text-cloth text-sm leading-relaxed sm:text-base">
        {t(`projects.${project.id}.role`)}
      </p>
    </div>
  )
}

function Tech() {
  const { t } = useTranslation()
  const { project } = useProjectCard()

  return (
    <div>
      <Label>{t('work.tech')}</Label>
      <ul className="flex flex-wrap gap-2">
        {project.techIds.map((techId) => (
          <li key={techId}>
            <Chip techId={techId} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Extra facts (constraint, status) and the numbered engineering decisions. */
function Decisions() {
  const { t } = useTranslation()
  const { project } = useProjectCard()
  const numbers = Array.from({ length: project.decisionCount }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      {project.facts.map((fact) => (
        <div key={fact}>
          <Label>{t(`work.${fact}`)}</Label>
          <p
            className={cn(
              'text-sm leading-relaxed sm:text-base',
              fact === 'constraint'
                ? 'border-ember text-cloth border-l-2 pl-4 font-medium'
                : 'text-muted',
            )}
          >
            {t(`projects.${project.id}.${fact}`)}
          </p>
        </div>
      ))}

      {numbers.length > 0 ? (
        <div>
          <Label>{t('work.decisions')}</Label>
          <ol className="space-y-4">
            {numbers.map((n) => (
              <li key={n} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="border-line text-saffron grid size-7 shrink-0 place-items-center rounded-lg border font-mono text-xs"
                >
                  {n}
                </span>
                <div>
                  <p className="text-cloth text-sm font-semibold sm:text-base">
                    {t(`projects.${project.id}.decisions.${n}.title`)}
                  </p>
                  <p className="text-muted mt-1 text-sm leading-relaxed">
                    {t(`projects.${project.id}.decisions.${n}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  )
}

/** A collapsible region, opened by <ProjectCard.Toggle>. */
function Details({ children }: { children: ReactNode }) {
  const { expanded, detailsId } = useProjectCard()

  return (
    <AnimatePresence initial={false}>
      {expanded ? (
        <motion.div
          id={detailsId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
          className="overflow-hidden"
        >
          <div className="border-line space-y-6 border-t border-dashed pt-6">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Toggle() {
  const { t } = useTranslation()
  const { expanded, toggle, detailsId } = useProjectCard()

  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={detailsId}
      onClick={toggle}
      className="text-cloth hover:text-saffron inline-flex items-center gap-2 text-sm font-semibold transition-colors"
    >
      {expanded ? t('work.collapse') : t('work.expand')}
      <ChevronDown
        size={16}
        aria-hidden="true"
        className={cn('transition-transform duration-300', expanded && 'rotate-180')}
      />
    </button>
  )
}

function Links({ children }: { children?: ReactNode }) {
  const { t } = useTranslation()
  const { project } = useProjectCard()

  return (
    <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
      {children}
      {project.repoUrl ? (
        <Button
          href={project.repoUrl}
          external
          variant="ghost"
          size="sm"
          icon={<GitHubIcon aria-hidden="true" />}
          aria-label={`${t('work.viewCode')}: ${t(`projects.${project.id}.name`)} (${t('common.newTab')})`}
        >
          {t('work.viewCode')}
          <ArrowUpRight size={14} aria-hidden="true" className="ml-1.5 inline" />
        </Button>
      ) : null}
    </footer>
  )
}

export const ProjectCard = Object.assign(ProjectCardRoot, {
  Header,
  Role,
  Tech,
  Decisions,
  Details,
  Toggle,
  Links,
})
