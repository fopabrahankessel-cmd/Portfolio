import '@fontsource/syne/600.css'
import '@fontsource/syne/800.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import './index.css'

import { MotionConfig } from 'motion/react'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import './i18n'
import { Page } from './Page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </MotionConfig>
  </StrictMode>,
)
