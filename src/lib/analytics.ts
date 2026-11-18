let started = false

/**
 * Loads Vercel Web Analytics and Speed Insights. Called only after the visitor
 * accepts. Both are cookieless and served from this site's own domain.
 * Withdrawing consent takes effect on the next page load.
 */
export async function startAnalytics(): Promise<void> {
  if (started || import.meta.env.MODE === 'test') return
  started = true
  const [{ inject }, { injectSpeedInsights }] = await Promise.all([
    import('@vercel/analytics'),
    import('@vercel/speed-insights'),
  ])
  inject({ mode: import.meta.env.PROD ? 'production' : 'development' })
  injectSpeedInsights()
}
