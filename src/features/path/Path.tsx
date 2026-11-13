import { Briefcase, GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import graduation from '@/assets/graduation.webp'
import { StripeFrame } from '@/components/motifs/StripeFrame'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { timeline } from '@/content/timeline'

const icons = { internship: Briefcase, degree: GraduationCap }

export default function Path() {
  const { t } = useTranslation()

  return (
    <Section id="path" labelledBy="path-title">
      <SectionHeading
        id="path-title"
        index="04"
        eyebrow={t('path.eyebrow')}
        title={t('path.title')}
      />

      <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <ol className="relative space-y-10">
          {/* The stitched spine of the timeline */}
          <span
            aria-hidden="true"
            className="border-line absolute top-3 bottom-3 left-[1.2rem] border-l border-dashed"
          />
          {timeline.map((entry, index) => {
            const Icon = icons[entry.id]
            const points = t(`path.${entry.id}.points`, { returnObjects: true }) as string[]
            return (
              <li key={entry.id} className="relative pl-16">
                <Reveal delay={index * 0.1}>
                  <span className="border-saffron/60 bg-ink text-saffron absolute top-0 left-0 grid size-10 place-items-center rounded-xl border">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="text-saffron font-mono text-xs tracking-[0.16em] uppercase">
                    {t(`path.${entry.id}.period`)}
                  </p>
                  <h3 className="font-display text-cloth mt-2 text-xl font-semibold sm:text-2xl">
                    {t(`path.${entry.id}.title`)}
                  </h3>
                  <p className="text-muted mt-1 text-sm sm:text-base">
                    {t(`path.${entry.id}.place`)}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {points.map((point) => (
                      <li key={point} className="text-muted flex gap-3 text-sm leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="bg-ember mt-[0.55em] size-1.5 shrink-0 rotate-45"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            )
          })}
        </ol>

        <Reveal delay={0.15} className="mx-auto w-full max-w-xs lg:max-w-none">
          <StripeFrame className="-rotate-2 transition-transform duration-500 hover:rotate-0">
            <img
              src={graduation}
              alt={t('path.graduationAlt')}
              width={810}
              height={1080}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover object-[50%_35%]"
            />
          </StripeFrame>
        </Reveal>
      </div>
    </Section>
  )
}
