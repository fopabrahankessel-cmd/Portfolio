import { MotionConfig } from 'motion/react'

import { CursorGlow } from '@/components/layout/CursorGlow'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollThread } from '@/components/layout/ScrollThread'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { sectionIds } from '@/content/sections'
import { About } from '@/features/about/About'
import { Hero } from '@/features/hero/Hero'
import { useActiveSection } from '@/hooks/useActiveSection'

export default function App() {
  const activeId = useActiveSection(sectionIds)

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <CursorGlow />
        <ScrollThread activeId={activeId} />
        <Navbar activeId={activeId} />
        <main id="main" className="relative z-10">
          <Hero />
          <About />
          {sectionIds.slice(2).map((id) => (
            <section key={id} id={id} className="grid min-h-screen place-items-center">
              <h2 className="font-display text-gradient text-5xl font-extrabold">{id}</h2>
            </section>
          ))}
        </main>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  )
}
