# Brahan Kessel Fopa — Portfolio

Single-page portfolio in the "Toghu Night" theme. React, Vite, TypeScript and
Tailwind CSS, in English and French.

## Run it

```bash
npm install
npm run dev        # development server on http://localhost:5173
npm run build      # production build in dist/ (any static host can serve it)
npm run preview    # serve the production build locally
```

## Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run format     # Prettier
```

## Where to edit things

| What                           | Where                               |
| ------------------------------ | ----------------------------------- |
| All visible text (English)     | `src/locales/en/translation.json`   |
| All visible text (French)      | `src/locales/fr/translation.json`   |
| Contact details and links      | `src/content/profile.ts` (encoded)  |
| Projects (links, technologies) | `src/content/projects.ts`           |
| SchoolLink diagram steps       | `src/content/flow.ts`               |
| Stack groups                   | `src/content/stack.ts`              |
| Timeline entries               | `src/content/timeline.ts`           |
| Technology icons and colours   | `src/components/icons/techIcons.ts` |
| Colours and fonts              | `src/index.css` (`@theme` block)    |

A test fails if the English and French files do not have exactly the same keys.

## Deployment (Vercel)

`vercel.json` sets clean URLs, forces HTTPS (HSTS) and adds security headers
(Content-Security-Policy, X-Frame-Options and others). Pages:

| URL        | Source               |
| ---------- | -------------------- |
| `/`        | `index.html`         |
| `/privacy` | `privacy/index.html` |
| `/terms`   | `terms/index.html`   |
| any other  | `404.html`           |

`sitemap.xml` and `robots.txt` are generated at build time. Canonical links,
the sitemap and the social preview use `SITE_URL` (for example
`https://brahan.dev`); on Vercel it defaults to the production `.vercel.app`
address. Set it in the Vercel project settings once you add a custom domain.

Audience measurement is Vercel Web Analytics and Speed Insights, loaded only
after the visitor accepts the cookie banner. Enable both in the Vercel
dashboard (project, Analytics and Speed Insights tabs).

E-mail and phone number are stored encoded in `src/content/profile.ts` so
harvesting bots do not find them in the code. The comment in
`src/lib/obfuscate.ts` shows how to encode a new value.

## Brand images

```bash
npm run brand      # favicons + public/og-image.png (needs Chrome or Edge)
```

The social preview template is `scripts/og-image.html`.

## Photos

Originals live in `source-assets/`. After replacing one, run:

```bash
npm run images
```

## CV

The CV source is `cv/cv.html`. After editing it, regenerate the PDF (needs
Chrome or Edge installed):

```bash
npm run cv
```

The PDF is written to `public/cv/Brahan-Kessel-Fopa-CV.pdf`, which the
"Download CV" buttons link to.

## Structure

```
src/
  content/      typed data: profile, projects, stack, timeline
  locales/      en and fr text
  i18n/         language detection and setup
  hooks/        useTilt, useMagnetic, useActiveSection, useMediaQuery
  components/   ui primitives, icons, Toghu motifs, layout shell
  features/     one folder per page section
```
