import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons/BrandIcons'
import { profile } from '@/content/profile'
import { openConsentBanner } from '@/lib/consent'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

/** Read once at load: rendering must stay pure. */
const YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useTranslation()

  const links = [
    {
      label: 'WhatsApp',
      href: buildWhatsAppUrl(profile.whatsappNumber, t('contact.whatsappMessage')),
      icon: <WhatsAppIcon aria-hidden="true" />,
    },
    {
      label: t('contact.emailLabel'),
      href: `mailto:${profile.email}`,
      icon: <Mail size={16} aria-hidden="true" />,
    },
    { label: 'GitHub', href: profile.github, icon: <GitHubIcon aria-hidden="true" /> },
    { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedInIcon aria-hidden="true" /> },
  ]

  return (
    <footer className="relative">
      <div aria-hidden="true" className="bg-stripes h-1.5 w-full opacity-90" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 text-sm sm:flex-row sm:px-8">
        <div className="text-faint text-center sm:text-left">
          <p>
            <span className="text-cloth font-semibold">{profile.name}</span> · © {YEAR} ·{' '}
            {t('footer.built')}
          </p>
          <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:justify-start">
            <li>
              <a href="/privacy" className="hover:text-cloth underline-offset-4 hover:underline">
                {t('footer.privacy')}
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-cloth underline-offset-4 hover:underline">
                {t('footer.terms')}
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={openConsentBanner}
                className="hover:text-cloth underline-offset-4 hover:underline"
              >
                {t('footer.cookies')}
              </button>
            </li>
          </ul>
        </div>
        <ul className="flex items-center gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
                className="border-line text-muted hover:border-saffron/70 hover:text-cloth grid size-10 place-items-center rounded-xl border transition-colors"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
