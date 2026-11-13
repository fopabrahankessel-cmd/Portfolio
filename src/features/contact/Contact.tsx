import { Download, Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons/BrandIcons'
import { DiamondPattern } from '@/components/motifs/DiamondPattern'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { profile } from '@/content/profile'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function Contact() {
  const { t } = useTranslation()
  const whatsappUrl = buildWhatsAppUrl(profile.whatsappNumber, t('contact.whatsappMessage'))
  const mailUrl = `mailto:${profile.email}?subject=${encodeURIComponent(t('contact.emailSubject'))}`

  const secondary = [
    {
      label: 'GitHub',
      href: profile.github,
      icon: <GitHubIcon aria-hidden="true" />,
      external: true,
    },
    {
      label: 'LinkedIn',
      href: profile.linkedin,
      icon: <LinkedInIcon aria-hidden="true" />,
      external: true,
    },
    {
      label: t('contact.downloadCv'),
      href: profile.cvPath,
      icon: <Download size={16} aria-hidden="true" />,
      download: profile.cvFileName,
    },
  ]

  return (
    <Section id="contact" labelledBy="contact-title" className="lg:pb-32">
      <Reveal>
        <div className="border-line bg-surface/80 relative isolate overflow-hidden rounded-[2rem] border px-6 py-14 text-center sm:px-12 sm:py-20">
          <DiamondPattern className="inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] opacity-80" />
          <div aria-hidden="true" className="bg-stripes absolute inset-x-0 top-0 h-1.5" />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,69,44,0.25),transparent_65%)]"
          />

          <p className="text-saffron mb-5 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.22em] uppercase">
            <span aria-hidden="true" className="bg-ember size-2 rotate-45" />
            <span className="text-faint">05</span>
            {t('contact.eyebrow')}
          </p>
          <h2
            id="contact-title"
            className="font-display text-cloth mx-auto max-w-3xl text-3xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t('contact.title1')} <span className="text-gradient">{t('contact.title2')}</span>
          </h2>
          <p className="text-muted mx-auto mt-5 max-w-xl text-base sm:text-lg">
            {t('contact.intro')}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={whatsappUrl}
              external
              magnetic
              size="lg"
              icon={<WhatsAppIcon aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              {t('contact.whatsapp')}
            </Button>
            <Button
              href={mailUrl}
              variant="ghost"
              size="lg"
              icon={<Mail size={20} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              {t('contact.email')}
            </Button>
          </div>

          <dl className="text-muted mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm sm:flex-row">
            <div className="flex items-center gap-2">
              <Phone size={14} aria-hidden="true" className="text-saffron" />
              <dt className="sr-only">{t('contact.phoneLabel')}</dt>
              <dd className="font-mono">{profile.phoneDisplay}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} aria-hidden="true" className="text-saffron" />
              <dt className="sr-only">{t('contact.emailLabel')}</dt>
              <dd className="font-mono break-all">{profile.email}</dd>
            </div>
          </dl>

          <ul className="border-line mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-dashed pt-8">
            {secondary.map((link) => (
              <li key={link.label}>
                <Button
                  href={link.href}
                  external={link.external}
                  download={link.download}
                  variant="ghost"
                  size="sm"
                  icon={link.icon}
                >
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
