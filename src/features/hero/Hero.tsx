import { ArrowDown, ArrowRight } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'

import portrait from '@/assets/portrait.webp'
import { WhatsAppIcon } from '@/components/icons/BrandIcons'
import { DiamondPattern } from '@/components/motifs/DiamondPattern'
import { StripeFrame } from '@/components/motifs/StripeFrame'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { profile } from '@/content/profile'
import { useTilt } from '@/hooks/useTilt'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

import { HeroStats } from './HeroStats'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.6, 0.35, 1] } },
}

export function Hero() {
  const { t } = useTranslation()
  const { ref: tiltRef, style: tiltStyle } = useTilt<HTMLDivElement>(7)

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-16"
    >
      {/* Embroidered backdrop, fading in from the right */}
      <DiamondPattern className="inset-0 -z-10 size-full [mask-image:linear-gradient(100deg,transparent_25%,black_95%)] opacity-90" />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(232,69,44,0.22),transparent_65%)] blur-2xl"
      />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:py-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Badge tone="live">{t('hero.badge')}</Badge>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={item}
            className="font-display text-cloth mt-6 text-[2.5rem] leading-[1] font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            {t('hero.title1')}
            <br />
            <span className="text-gradient">{t('hero.title2')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {t('hero.intro')}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
            <Button
              href={buildWhatsAppUrl(profile.whatsappNumber, t('contact.whatsappMessage'))}
              external
              magnetic
              icon={<WhatsAppIcon aria-hidden="true" />}
            >
              {t('hero.ctaWhatsapp')}
            </Button>
            <Button href="#work" variant="ghost">
              {t('hero.ctaWork')}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="ml-2 inline transition-transform group-hover:translate-x-1"
              />
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-12">
            <HeroStats />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none"
        >
          <motion.div ref={tiltRef} style={tiltStyle}>
            <StripeFrame>
              <img
                src={portrait}
                alt={t('hero.portraitAlt')}
                width={900}
                height={1100}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </StripeFrame>
          </motion.div>

          {/* Floating identity tag */}
          <div className="border-line bg-ink/85 absolute -bottom-5 -left-3 rounded-xl border px-4 py-3 font-mono text-[11px] leading-relaxed shadow-xl backdrop-blur sm:-left-8">
            <span className="text-faint">role:</span> <span className="text-cloth">backend</span>
            <br />
            <span className="text-faint">core:</span>{' '}
            <span className="text-saffron">Java · Spring Boot</span>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="text-faint hover:text-cloth absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors lg:flex"
      >
        {t('hero.scroll')}
        <ArrowDown size={13} aria-hidden="true" className="motion-safe:animate-bounce" />
      </a>
    </section>
  )
}
