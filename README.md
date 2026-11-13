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
| Contact details and links      | `src/content/profile.ts`            |
| Projects (links, technologies) | `src/content/projects.ts`           |
| SchoolLink diagram steps       | `src/content/flow.ts`               |
| Stack groups                   | `src/content/stack.ts`              |
| Timeline entries               | `src/content/timeline.ts`           |
| Technology icons and colours   | `src/components/icons/techIcons.ts` |
| Colours and fonts              | `src/index.css` (`@theme` block)    |

A test fails if the English and French files do not have exactly the same keys.

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
