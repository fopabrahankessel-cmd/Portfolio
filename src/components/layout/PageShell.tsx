import { ArrowLeft } from 'lucide-react'
import { type ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { profile } from '@/content/profile'

import { CookieBanner } from './CookieBanner'
import { Footer } from './Footer'
import { LanguageSwitch } from './LanguageSwitch'

interface PageShellProps {
  /** Translation key of the page title, also used for the browser tab. */
  titleKey: string
  children: ReactNode
}

/** Frame for the pages that are not the one-page portfolio. */
export function PageShell({ titleKey, children }: PageShellProps) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = `${t(titleKey)} · ${profile.name}`
  }, [t, titleKey, i18n.language])

  return (
    <>
      <header className="border-line/70 bg-ink/80 sticky top-0 z-40 border-b backdrop-blur-xl">
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
            href="/"
            aria-label={`bkf. ${t('page.home')}`}
            className="font-display text-cloth text-xl font-extrabold tracking-tight"
          >
            {profile.monogram.slice(0, -1)}
            <span className="text-gradient">.</span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-muted hover:text-cloth hidden items-center gap-1.5 text-sm font-medium transition-colors sm:inline-flex"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t('page.back')}
            </a>
            <LanguageSwitch />
          </div>
        </nav>
      </header>
      <main id="main" className="relative z-10">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
