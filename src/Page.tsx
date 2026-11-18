import { lazy } from 'react'

import App from './App.tsx'

// Each HTML entry (index, privacy, terms, 404) names its page on <body>.
const LegalPage = lazy(() => import('@/features/legal/LegalPage'))
const NotFound = lazy(() => import('@/features/notfound/NotFound'))

export function Page() {
  switch (document.body.dataset.page) {
    case 'privacy':
      return <LegalPage kind="privacy" />
    case 'terms':
      return <LegalPage kind="terms" />
    case 'not-found':
      return <NotFound />
    default:
      return <App />
  }
}
