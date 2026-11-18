import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PageShell } from '@/components/layout/PageShell'
import { DiamondPattern } from '@/components/motifs/DiamondPattern'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <PageShell titleKey="notFound.title">
      <section className="relative isolate mx-auto flex min-h-[70dvh] w-full max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <DiamondPattern className="inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-60" />
        <p className="text-saffron font-mono text-xs tracking-[0.22em] uppercase">
          {t('notFound.eyebrow')}
        </p>
        <p
          aria-hidden="true"
          className="font-display text-gradient mt-4 text-8xl leading-none font-extrabold sm:text-9xl"
        >
          404
        </p>
        <h1 className="font-display text-cloth mt-6 text-2xl font-extrabold tracking-tight text-balance sm:text-4xl">
          {t('notFound.title')}
        </h1>
        <p className="text-muted mt-4 max-w-md text-base">{t('notFound.body')}</p>
        <Button
          href="/"
          size="lg"
          className="mt-10"
          icon={<ArrowLeft size={18} aria-hidden="true" />}
        >
          {t('notFound.cta')}
        </Button>
      </section>
    </PageShell>
  )
}
