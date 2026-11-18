import { Cookie } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { startAnalytics } from '@/lib/analytics'
import { type Consent, onConsentBannerOpen, readConsent, storeConsent } from '@/lib/consent'

/** Asks before loading audience measurement. Refusing is as easy as accepting. */
export function CookieBanner() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(() => readConsent() === null)

  useEffect(() => {
    if (readConsent() === 'granted') void startAnalytics()
    return onConsentBannerOpen(() => setOpen(true))
  }, [])

  const choose = (value: Consent) => {
    storeConsent(value)
    setOpen(false)
    if (value === 'granted') void startAnalytics()
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.section
          role="region"
          aria-labelledby="consent-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="border-line bg-surface/95 fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
        >
          <div
            aria-hidden="true"
            className="bg-stripes absolute inset-x-0 top-0 h-1 rounded-t-2xl"
          />
          <h2
            id="consent-title"
            className="font-display text-cloth flex items-center gap-2 text-base font-semibold"
          >
            <Cookie size={18} aria-hidden="true" className="text-saffron" />
            {t('consent.title')}
          </h2>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            {t('consent.body')}{' '}
            <a href="/privacy" className="text-saffron underline underline-offset-4">
              {t('consent.learnMore')}
            </a>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="border-line text-cloth hover:border-saffron/70 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              {t('consent.refuse')}
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className="bg-gradient-brand text-ink rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              {t('consent.accept')}
            </button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  )
}
