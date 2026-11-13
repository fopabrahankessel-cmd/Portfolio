import { useTranslation } from 'react-i18next'

import { languages } from '@/i18n/detectLanguage'
import { cn } from '@/lib/cn'

/** EN / FR toggle. The choice is remembered by the i18n setup. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={cn(
        'border-line bg-surface/70 inline-flex rounded-full border p-0.5 font-mono text-xs',
        className,
      )}
    >
      {languages.map((lang) => {
        const active = current === lang
        return (
          <button
            key={lang}
            type="button"
            lang={lang}
            aria-pressed={active}
            onClick={() => void i18n.changeLanguage(lang)}
            className={cn(
              'rounded-full px-2.5 py-1 font-semibold uppercase transition-colors',
              active ? 'bg-cloth text-ink' : 'text-muted hover:text-cloth',
            )}
          >
            {lang.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
