import { Briefcase, Download, Languages, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/content/profile'

export function About() {
  const { t } = useTranslation()

  const facts = [
    { icon: MapPin, label: t('about.locationLabel'), value: t('about.location') },
    { icon: Languages, label: t('about.languagesLabel'), value: t('about.languages') },
    { icon: Briefcase, label: t('about.seekingLabel'), value: t('about.seeking') },
  ]

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
      />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal className="space-y-5">
          <p className="text-cloth text-lg leading-relaxed sm:text-xl">{t('about.bio1')}</p>
          <p className="text-muted text-base leading-relaxed sm:text-lg">{t('about.bio2')}</p>
          <div className="pt-4">
            <Button
              href={profile.cvPath}
              download={profile.cvFileName}
              variant="ghost"
              icon={<Download size={17} aria-hidden="true" />}
            >
              {t('about.downloadCv')}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="border-line bg-surface/70 divide-line divide-y divide-dashed rounded-2xl border backdrop-blur">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-5">
                <span className="border-line text-saffron grid size-10 shrink-0 place-items-center rounded-xl border">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-faint font-mono text-[11px] tracking-[0.18em] uppercase">
                    {label}
                  </dt>
                  <dd className="text-cloth mt-1 font-medium">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
