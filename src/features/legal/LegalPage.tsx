import { useTranslation } from 'react-i18next'

import { PageShell } from '@/components/layout/PageShell'
import { profile } from '@/content/profile'

interface LegalCopy {
  title: string
  updated: string
  intro: string
  sections: Record<string, { title: string; body: string[] }>
}

/** Fills placeholders that must not live in the translation files. */
function fill(text: string): string {
  return text.replaceAll('{{email}}', profile.email).replaceAll('{{name}}', profile.name)
}

export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useTranslation()
  const copy = t(`legal.${kind}`, {
    returnObjects: true,
    name: profile.name,
    email: profile.email,
  }) as LegalCopy

  return (
    <PageShell titleKey={`legal.${kind}.title`}>
      <article className="mx-auto w-full max-w-3xl px-5 pt-14 pb-24 sm:px-8 sm:pt-20">
        <p className="text-saffron mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.22em] uppercase">
          <span aria-hidden="true" className="bg-ember size-2 rotate-45" />
          {t('legal.eyebrow')}
        </p>
        <h1 className="font-display text-cloth text-3xl leading-tight font-extrabold tracking-tight text-balance break-words hyphens-auto sm:text-5xl">
          {copy.title}
        </h1>
        <p className="text-faint mt-4 font-mono text-xs">{copy.updated}</p>
        <p className="text-muted mt-8 text-base leading-relaxed sm:text-lg">{fill(copy.intro)}</p>

        {Object.entries(copy.sections).map(([key, section]) => (
          <section key={key} aria-labelledby={`${kind}-${key}`} className="mt-10">
            <h2
              id={`${kind}-${key}`}
              className="font-display text-cloth text-xl font-semibold sm:text-2xl"
            >
              {section.title}
            </h2>
            {section.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted mt-3 text-[15px] leading-relaxed break-words sm:text-base"
              >
                {fill(paragraph)}
              </p>
            ))}
          </section>
        ))}
      </article>
    </PageShell>
  )
}
