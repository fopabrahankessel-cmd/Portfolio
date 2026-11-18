import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const root = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/**
 * Public address of the site, used for canonical links, the social preview
 * image, the sitemap and robots.txt. Set SITE_URL once you have a custom
 * domain; on Vercel it otherwise falls back to the project's production URL.
 */
const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4173')
).replace(/\/+$/, '')

/** Pages listed in the sitemap (the 404 page is deliberately left out). */
const indexedPaths = ['/', '/privacy', '/terms']

function seo(): Plugin {
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs })
  const link = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'link', attrs })

  const sharedTags: HtmlTagDescriptor[] = [
    meta({ name: 'author', content: 'Brahan Kessel Fopa' }),
    meta({ name: 'theme-color', content: '#0d0b0c' }),
    meta({ name: 'color-scheme', content: 'dark' }),
    link({ rel: 'icon', href: '/favicon.ico', sizes: '32x32' }),
    link({ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }),
    link({ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }),
    link({ rel: 'manifest', href: '/site.webmanifest' }),
    meta({ property: 'og:site_name', content: 'Brahan Kessel Fopa' }),
    meta({ property: 'og:locale', content: 'en_US' }),
    meta({ property: 'og:locale:alternate', content: 'fr_FR' }),
    meta({ property: 'og:image', content: `${siteUrl}/og-image.png` }),
    meta({ property: 'og:image:type', content: 'image/png' }),
    meta({ property: 'og:image:width', content: '1200' }),
    meta({ property: 'og:image:height', content: '630' }),
    meta({
      property: 'og:image:alt',
      content: 'Brahan Kessel Fopa, backend software engineer, Java and Spring Boot',
    }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:image', content: `${siteUrl}/og-image.png` }),
  ]

  /**
   * Gives `vite dev` and `vite preview` the same URLs as Vercel's cleanUrls:
   * /privacy and /terms serve their pages, unknown pages serve 404.html.
   * Without it, Vite's single-page fallback answers every URL with the home page.
   */
  const pageRoutes = (
    req: { url?: string; method?: string; headers: Record<string, unknown> },
    _res: unknown,
    next: () => void,
  ) => {
    const accept = String(req.headers.accept ?? '')
    if (req.method !== 'GET' || !req.url || !accept.includes('text/html')) return next()
    const [path, query = ''] = req.url.split('?')
    const clean = path.replace(/\/+$/, '') || '/'
    const suffix = query ? `?${query}` : ''
    if (clean === '/' || clean === '/index.html') return next()
    if (clean === '/privacy' || clean === '/terms') req.url = `${clean}/index.html${suffix}`
    else if (!clean.startsWith('/@') && !clean.includes('.')) req.url = `/404.html${suffix}`
    next()
  }

  return {
    name: 'portfolio-seo',
    configureServer(server) {
      server.middlewares.use(pageRoutes)
    },
    configurePreviewServer(server) {
      server.middlewares.use(pageRoutes)
    },
    transformIndexHtml(html) {
      return {
        html: html.replaceAll('__SITE_URL__', siteUrl),
        tags: sharedTags.map((tag) => ({ ...tag, injectTo: 'head' as const })),
      }
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = indexedPaths
        .map(
          (path) =>
            `  <url>\n    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  resolve: {
    alias: { '@': root('./src') },
  },
  build: {
    rollupOptions: {
      input: {
        main: root('./index.html'),
        privacy: root('./privacy/index.html'),
        terms: root('./terms/index.html'),
        notFound: root('./404.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
