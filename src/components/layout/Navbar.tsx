import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { WhatsAppIcon } from '@/components/icons/BrandIcons'
import { Button } from '@/components/ui/Button'
import { profile } from '@/content/profile'
import { navSections } from '@/content/sections'
import { cn } from '@/lib/cn'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

import { LanguageSwitch } from './LanguageSwitch'

interface NavbarProps {
  activeId: string
}

export function Navbar({ activeId }: NavbarProps) {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const whatsappUrl = buildWhatsAppUrl(profile.whatsappNumber, t('contact.whatsappMessage'))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-line/70 bg-ink/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="bg-cloth text-ink sr-only rounded-md px-3 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        {t('nav.skip')}
      </a>

      <nav
        aria-label={t('nav.main')}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#hero"
          aria-label={t('nav.home')}
          className="font-display text-cloth text-xl font-extrabold tracking-tight"
        >
          {profile.monogram.slice(0, -1)}
          <span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map((id) => {
            const active = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active ? 'location' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    active ? 'text-cloth' : 'text-muted hover:text-cloth',
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="border-line bg-surface-2 absolute inset-0 rounded-full border"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{t(`nav.${id}`)}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <LanguageSwitch />
          <Button
            href={whatsappUrl}
            external
            size="sm"
            icon={<WhatsAppIcon aria-hidden="true" />}
            className="hidden sm:inline-flex"
          >
            {t('nav.whatsapp')}
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
            onClick={() => setOpen((value) => !value)}
            className="border-line text-cloth grid size-10 place-items-center rounded-xl border md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="border-line/70 overflow-hidden border-t md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
              {navSections.map((id, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={activeId === id ? 'location' : undefined}
                    className={cn(
                      'font-display flex items-baseline gap-3 rounded-xl px-3 py-3 text-2xl font-semibold',
                      activeId === id ? 'text-cloth bg-surface-2' : 'text-muted',
                    )}
                  >
                    <span className="text-saffron font-mono text-xs">0{index + 1}</span>
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
              <li className="pt-3 sm:hidden">
                <Button
                  href={whatsappUrl}
                  external
                  icon={<WhatsAppIcon aria-hidden="true" />}
                  className="w-full"
                >
                  {t('hero.ctaWhatsapp')}
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
