import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { DiamondPattern } from '@/components/motifs/DiamondPattern'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/content/projects'
import type { Project } from '@/content/types'
import { useTilt } from '@/hooks/useTilt'

import { FlowDiagram } from './FlowDiagram'
import { ProjectCard } from './ProjectCard'

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <ProjectCard project={project} className="gap-8">
        <DiamondPattern className="inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)] opacity-70" />
        <div aria-hidden="true" className="bg-stripes absolute inset-x-0 top-0 h-1.5" />
        <ProjectCard.Header index="01" />
        <FlowDiagram />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <ProjectCard.Role />
          <ProjectCard.Tech />
        </div>
        <ProjectCard.Links />
      </ProjectCard>
    </Reveal>
  )
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const { ref, style } = useTilt<HTMLDivElement>(3)

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <motion.div ref={ref} style={style} className="h-full">
        <ProjectCard project={project} className="hover:border-saffron/40 h-full transition-colors">
          <ProjectCard.Header index={`0${index + 2}`} />
          <ProjectCard.Tech />
          <ProjectCard.Details>
            <ProjectCard.Role />
            <ProjectCard.Decisions />
          </ProjectCard.Details>
          <ProjectCard.Links>
            <ProjectCard.Toggle />
          </ProjectCard.Links>
        </ProjectCard>
      </motion.div>
    </Reveal>
  )
}

export default function Work() {
  const { t } = useTranslation()
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)

  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading id="work-title" index="02" eyebrow={t('work.eyebrow')} title={t('work.title')} />

      <div className="space-y-6">
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {others.map((project, index) => (
            <CaseStudy key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
