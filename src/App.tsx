import { lazy, Suspense } from 'react'

import { CookieBanner } from '@/components/layout/CookieBanner'
import { CursorGlow } from '@/components/layout/CursorGlow'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollThread } from '@/components/layout/ScrollThread'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { StitchDivider } from '@/components/motifs/StitchDivider'
import { sectionIds } from '@/content/sections'
import { About } from '@/features/about/About'
import { Hero } from '@/features/hero/Hero'
import { useActiveSection } from '@/hooks/useActiveSection'

// Everything below the first screen loads after it, in its own chunk.
const Work = lazy(() => import('@/features/work/Work'))
const Stack = lazy(() => import('@/features/stack/Stack'))
const Path = lazy(() => import('@/features/path/Path'))
const Contact = lazy(() => import('@/features/contact/Contact'))

/** Keeps the anchor target and page height in place while a section loads. */
function SectionFallback({ id }: { id: string }) {
  return <section id={id} aria-busy="true" className="min-h-screen" />
}

export default function App() {
  const activeId = useActiveSection(sectionIds)

  return (
    <SmoothScroll>
      <CursorGlow />
      <ScrollThread activeId={activeId} />
      <Navbar activeId={activeId} />
      <main id="main" className="relative z-10">
        <Hero />
        <StitchDivider />
        <About />
        <StitchDivider />
        <Suspense fallback={<SectionFallback id="work" />}>
          <Work />
        </Suspense>
        <StitchDivider />
        <Suspense fallback={<SectionFallback id="stack" />}>
          <Stack />
        </Suspense>
        <StitchDivider />
        <Suspense fallback={<SectionFallback id="path" />}>
          <Path />
        </Suspense>
        <Suspense fallback={<SectionFallback id="contact" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </SmoothScroll>
  )
}
