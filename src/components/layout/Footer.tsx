import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons/BrandIcons'
import { profile } from '@/content/profile'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

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
        <p className="text-faint text-center sm:text-left">
          <span className="text-cloth font-semibold">{profile.name}</span> · © 2026 ·{' '}
          {t('footer.built')}
        </p>
        <ul className="flex items-center gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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
