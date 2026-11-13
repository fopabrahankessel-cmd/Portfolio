# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Brahan Kessel Fopa's single-page, bilingual, highly interactive "Toghu Night" portfolio plus a generated one-page CV PDF.

**Architecture:** A static React single-page app. All content lives in typed data files and locale JSON; feature folders per section render it through shared UI primitives; behaviour (tilt, magnet, active section, language detection) lives in hooks and small pure functions. The CV is a standalone HTML file rendered to PDF by a script.

**Tech Stack:** React 19 + Vite + TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/vite`), `motion`, `lenis`, `i18next` + `react-i18next`, `lucide-react`, `react-icons`, `@fontsource` fonts, ESLint + Prettier (+ `prettier-plugin-tailwindcss`), Vitest + Testing Library, `sharp` (image conversion script), headless Edge/Chrome (CV PDF).

**Spec:** `docs/superpowers/specs/2026-11-13-portfolio-design.md` — read it first; all copy, colours and facts come from there.

## Global Constraints

- Never write "two years of professional experience". Use "two years building real software, three systems delivered solo".
- No invented facts, numbers, clients, testimonials or certifications. Scolarys: only what spec section 5 says; show a "Private code" badge, no repo link.
- Languages listed as "French, English" with no proficiency level.
- Dark theme only. Colour tokens exactly as in spec section 3.
- Fonts self-hosted: Syne (600/800), Inter (400/500/600), JetBrains Mono (400/600). No runtime request to Google Fonts.
- No hard-coded user-facing copy in components: text comes from `src/locales/{en,fr}/translation.json`, facts from `src/content`.
- Every technology shown has a real brand icon; no generic placeholder.
- `prefers-reduced-motion: reduce` disables smooth scroll, tilt, magnet, glow and travelling dots.
- Responsive from 360px wide with no horizontal page scroll. Body text contrast WCAG AA.
- No backend, no contact form, no analytics, no light theme.
- Package manager npm. `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` must pass at the end of every task.
- Commit at the end of each task (git is initialised in Task 1).

## Review Focus

1. A locale key present in English but missing in French shows a raw key on screen → key-parity test (Task 2).
2. `localStorage` blocked (private mode) must not crash the app or the language switch → `detectLanguage` / `readStoredLanguage` tests (Task 2).
3. WhatsApp message with accents, spaces and line breaks must open correctly → `buildWhatsAppUrl` test (Task 2).
4. Keyboard-only visitor must be able to operate the flow diagram and the mobile menu → FlowDiagram test (Task 6), manual check (Task 9).
5. Reduced-motion and touch visitors must get a fully usable static page → `useTilt` test returns no transform when reduced (Task 3), manual check (Task 9).

## File Structure

```
index.html                         SEO tags, favicon link
public/favicon.svg                 bkf monogram
public/cv/Brahan-Kessel-Fopa-CV.pdf   generated
cv/cv.html                         CV source (print CSS inline)
scripts/build-cv.mjs               cv.html -> PDF
scripts/optimize-images.mjs        source-assets/*.jpg -> src/assets/*.webp
src/main.tsx, src/App.tsx          entry, section composition, lazy loading
src/index.css                      Tailwind import, @theme tokens, base styles
src/i18n/index.ts                  i18next init
src/i18n/detectLanguage.ts         pure language detection + safe storage
src/locales/en/translation.json, src/locales/fr/translation.json
src/content/types.ts               TechId, Project, FlowNode, TimelineEntry, StackGroup
src/content/profile.ts             contacts, links, cvPath
src/content/projects.ts            three projects (facts, tech ids, links, decision keys)
src/content/flow.ts                SchoolLink diagram nodes
src/content/stack.ts               stack groups
src/content/timeline.ts            path entries
src/lib/whatsapp.ts                buildWhatsAppUrl
src/lib/cn.ts                      class name joiner
src/hooks/useTilt.ts, useMagnetic.ts, useActiveSection.ts, usePointerFine.ts
src/components/ui/                 Button, Section, SectionHeading, Chip, Reveal, Badge
src/components/icons/techIcons.ts  Record<TechId, TechIconDef>
src/components/icons/TechIcon.tsx, BrandIcons.tsx
src/components/motifs/             StitchDivider, StripeFrame, DiamondPattern
src/components/layout/             Navbar, LanguageSwitch, MobileMenu, Footer,
                                   SmoothScroll, ScrollThread, CursorGlow
src/features/hero/, about/, work/, stack/, path/, contact/
```

---

### Task 1: Scaffold and tooling

**Files:** whole project root; `vite.config.ts`, `eslint.config.js`, `.prettierrc`, `.gitignore`, `src/index.css`, `package.json`.

**Produces:** npm scripts `dev`, `build`, `preview`, `lint`, `typecheck` (`tsc -b --noEmit`), `test` (`vitest run`), `format`, `images`, `cv`. Tailwind theme colours usable as `bg-ink`, `bg-surface`, `border-line`, `text-cloth`, `text-muted`, `text-ember`, `text-saffron`, `bg-live`; font utilities `font-display`, `font-sans`, `font-mono`; utility class `text-gradient` and `bg-gradient-brand` (ember → saffron). Path alias `@/` → `src/`.

- [ ] Step 1: The folder is not empty, so run `npm create vite@latest _scaffold -- --template react-ts`, move every scaffold file into the project root, delete `_scaffold`. Do not touch `docs/`, `source-assets/`, `.superpowers/`.
- [ ] Step 2: `git init`; `.gitignore` must include `node_modules`, `dist`, `.superpowers/`.
- [ ] Step 3: Install runtime deps: `motion lenis i18next react-i18next lucide-react react-icons @fontsource/syne @fontsource/inter @fontsource/jetbrains-mono`. Dev deps: `tailwindcss @tailwindcss/vite prettier prettier-plugin-tailwindcss eslint-config-prettier vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event sharp`.
- [ ] Step 4: Configure Tailwind v4 plugin in `vite.config.ts`, `@/` alias (also in `tsconfig.app.json`), Vitest (`environment: 'jsdom'`, setup file importing `@testing-library/jest-dom`).
- [ ] Step 5: `src/index.css`: `@import "tailwindcss"`, `@theme` block with spec tokens (`--color-ink: #0d0b0c`, `--color-surface: #171314`, `--color-line: #3a302c`, `--color-cloth: #f4ede4`, `--color-muted: #bdb2a5`, `--color-ember: #e8452c`, `--color-saffron: #f2a33a`, `--color-live: #4ade80`), font families, base body styles, focus-visible ring in saffron, `scroll-margin-top` for sections.
- [ ] Step 6: Remove scaffold demo content; `App.tsx` renders a placeholder heading using `font-display text-gradient`.
- [ ] Step 7: Run `npm run lint && npm run typecheck && npm run test -- --passWithNoTests && npm run build`. Expected: all exit 0.
- [ ] Step 8: Commit `chore: scaffold vite react-ts project with tooling`.

### Task 2: Content, i18n and pure helpers

**Files:** `src/content/*`, `src/locales/*`, `src/i18n/*`, `src/lib/whatsapp.ts`, tests beside each (`*.test.ts`), `src/locales/locales.test.ts`.

**Produces:**
```ts
// content/types.ts
export type TechId = 'java'|'springBoot'|'springSecurity'|'python'|'django'|'postgresql'|'mssql'|'flyway'|'sqlite'|'flutter'|'reactNative'|'react'|'nextjs'|'typescript'|'git'|'github'|'gitlab'|'docker'|'junit'|'testcontainers'|'firebase';
export interface Project { id: 'schoollink'|'scolarys'|'aics'; featured: boolean; isPrivate: boolean; repoUrl?: string; techIds: TechId[]; decisionCount: number }
export interface FlowNode { id: string; techId?: TechId }          // order in array = flow order
export interface StackGroup { id: 'backend'|'data'|'mobile'|'web'|'tooling'; items: { techId: TechId; core?: boolean }[] }
export interface TimelineEntry { id: 'internship'|'degree'; photo?: 'graduation' }
// content/profile.ts
export const profile: { whatsappNumber: '237640154719'; phoneDisplay: '+237 640 154 719'; email: string; github: string; linkedin: string; cvPath: '/cv/Brahan-Kessel-Fopa-CV.pdf' }
// lib/whatsapp.ts
export function buildWhatsAppUrl(number: string, message: string): string
// i18n/detectLanguage.ts
export type Lang = 'en' | 'fr'
export function detectLanguage(stored: string | null, navigatorLang: string | undefined): Lang
export function readStoredLanguage(): string | null      // never throws
export function storeLanguage(lang: Lang): void          // never throws
```
Locale key scheme: `nav.*`, `hero.*`, `about.*`, `work.title`, `projects.<id>.{name,summary,role,status,decisions.<n>.{title,body}}`, `flow.<nodeId>.{label,decision}`, `stack.groups.<id>`, `path.<id>.{title,place,period,points}`, `contact.*`, `common.*`. Text for each key comes from spec section 5; French is a faithful translation.

- [ ] Step 1: Write failing tests:
  - `locales.test.ts`: flattened key sets of `en` and `fr` are equal; no value is an empty string; no value in either file matches `/professional experience|expérience professionnelle/i`.
  - `whatsapp.test.ts`: `buildWhatsAppUrl('237640154719', 'Bonjour Brahan,\nj\'ai vu ton portfolio é')` equals `'https://wa.me/237640154719?text=' + encodeURIComponent(msg)`; a number passed as `'+237 640 154 719'` yields the same URL.
  - `detectLanguage.test.ts`: `('fr','en-US')→'fr'`; `(null,'fr-CM')→'fr'`; `(null,'en-GB')→'en'`; `(null,undefined)→'en'`; `('de','fr')→'fr'`; `readStoredLanguage()` returns `null` when `localStorage.getItem` throws.
  - `content.test.ts`: exactly one project has `featured: true` and it is `schoollink`; `scolarys` has `isPrivate: true` and no `repoUrl`; every project `decisionCount` matches the number of `projects.<id>.decisions.*` entries in `en`.
- [ ] Step 2: Run `npm run test`. Expected: FAIL (modules missing).
- [ ] Step 3: Implement the types, data files, both locale files, helpers, and `i18n/index.ts` (initial language from `detectLanguage(readStoredLanguage(), navigator.language)`; on `languageChanged` call `storeLanguage` and set `document.documentElement.lang`). Import it in `main.tsx`.
- [ ] Step 4: Run `npm run test`. Expected: PASS.
- [ ] Step 5: Commit `feat: add typed content, locales and helpers`.

### Task 3: UI primitives, icons, motifs and hooks

**Files:** `src/components/ui/*`, `src/components/icons/*`, `src/components/motifs/*`, `src/hooks/*`, `src/lib/cn.ts`, `src/hooks/useTilt.test.tsx`.

**Consumes:** `TechId`, theme utilities.

**Produces:**
```ts
// icons/techIcons.ts
export interface TechIconDef { label: string; Icon: IconType; color: string }
export const techIcons: Record<TechId, TechIconDef>     // exhaustive by type
// icons/TechIcon.tsx
export function TechIcon(p: { id: TechId; size?: number; className?: string }): JSX.Element
// icons/BrandIcons.tsx
export { WhatsAppIcon, GitHubIcon, GitLabIcon, LinkedInIcon }
// ui
Button      props: { as?: 'a'|'button'; href?; variant: 'primary'|'ghost'; magnetic?: boolean; icon?: ReactNode } & native props
Section     props: { id: string; children }            // <section id> with max width + padding
SectionHeading props: { eyebrow: string; title: string }
Chip        props: { techId: TechId }                   // icon + label
Badge       props: { tone: 'live'|'private'|'neutral'; children }
Reveal      props: { children; delay?: number }         // fade/slide in on view, plain render when reduced motion
// motifs
StitchDivider, StripeFrame ({ children }), DiamondPattern ({ className })
// hooks
useTilt<T extends HTMLElement>(maxDeg = 8): { ref: RefObject<T>; style: MotionStyle }   // identity style when reduced motion or coarse pointer
useMagnetic<T extends HTMLElement>(strength = 0.25): { ref: RefObject<T>; style: MotionStyle }
useActiveSection(ids: string[]): string
usePointerFine(): boolean                               // matchMedia('(pointer: fine)')
```
Use `useReducedMotion` from `motion/react` for the reduced-motion signal. For Java and Microsoft SQL Server pick an icon that exists in the installed `react-icons` (check `fa`, `di`, `si`, `tb`, `devicons`); if none is recognisable, add a small inline SVG component.

- [ ] Step 1: Write failing test `useTilt.test.tsx`: with `matchMedia` mocked so `(prefers-reduced-motion: reduce)` matches, a component using `useTilt` renders with no `transform` after a `pointermove` event.
- [ ] Step 2: Run it. Expected: FAIL.
- [ ] Step 3: Implement everything in the Produces block.
- [ ] Step 4: Temporarily render every `TechId` through `Chip` in `App.tsx`, run `npm run dev`, and confirm in the browser that all 21 icons render and are recognisable. Remove the temporary render.
- [ ] Step 5: Run lint, typecheck, test, build. Expected: all pass.
- [ ] Step 6: Commit `feat: add ui primitives, icons, motifs and interaction hooks`.

### Task 4: Layout shell

**Files:** `src/components/layout/*`, `src/App.tsx`, `src/components/layout/LanguageSwitch.test.tsx`.

**Consumes:** Task 2 i18n, Task 3 primitives and hooks.

**Produces:** `App` renders `<SmoothScroll><CursorGlow/><ScrollThread/><Navbar/><main>…sections…</main><Footer/></SmoothScroll>`. Section ids: `hero`, `about`, `work`, `stack`, `path`, `contact`.

- [ ] Step 1: Write failing test: clicking the `FR` control in `LanguageSwitch` changes `i18n.language` to `fr` and sets `document.documentElement.lang` to `fr`.
- [ ] Step 2: Run it. Expected: FAIL.
- [ ] Step 3: Implement:
  - `SmoothScroll`: Lenis instance, skipped when reduced motion; anchor links scroll through Lenis.
  - `Navbar`: sticky, blurred `ink` background after scrolling, links from `nav.*`, active link from `useActiveSection`, `LanguageSwitch`, compact WhatsApp button; below `md` a `MobileMenu` (button with `aria-expanded`, closes on Escape and on link click).
  - `ScrollThread`: fixed SVG at the left margin (hidden below `lg`), dashed path whose `pathLength` follows `useScroll().scrollYProgress`, with small diamonds marking each section; static full path when reduced motion.
  - `CursorGlow`: radial ember glow following the pointer, rendered only when `usePointerFine()` and not reduced motion.
  - `Footer`: name, year, icon links.
- [ ] Step 4: Run all checks. Expected: pass.
- [ ] Step 5: Commit `feat: add layout shell with navigation, language switch and scroll effects`.

### Task 5: Hero and About

**Files:** `src/features/hero/Hero.tsx`, `HeroStats.tsx`, `src/features/about/About.tsx`, `scripts/optimize-images.mjs`, `src/assets/portrait.webp`, `src/assets/graduation.webp`.

- [ ] Step 1: `scripts/optimize-images.mjs` converts `source-assets/portrait.jpg` → `src/assets/portrait.webp` (width 900) and `graduation.jpg` → `graduation.webp` (width 900), quality 80. Run `npm run images`; expected: both files exist and are smaller than the sources.
- [ ] Step 2: `Hero`: availability `Badge` (live dot), headline from `hero.title1` + gradient `hero.title2`, intro, primary magnetic `Button` to `buildWhatsAppUrl(profile.whatsappNumber, t('contact.whatsappMessage'))` with `WhatsAppIcon`, ghost button to `#work`, portrait inside `StripeFrame` with `useTilt`, `DiamondPattern` background fading from the right, staggered entrance animation.
- [ ] Step 3: `HeroStats`: three stats (`3`, `3,000+`, `FR / EN`) with labels from `hero.stats.*`; numeric ones count up once when in view, shown final immediately when reduced motion.
- [ ] Step 4: `About`: bio, location and languages rows with icons, Download CV `Button` (`href={profile.cvPath}`, `download`).
- [ ] Step 5: Check in the browser at 1280px and 375px in both languages: no overflow, portrait not cropped at the face.
- [ ] Step 6: Run all checks; commit `feat: add hero and about sections`.

### Task 6: Work section

**Files:** `src/features/work/Work.tsx`, `ProjectCard.tsx`, `FlowDiagram.tsx`, `FlowDiagram.test.tsx`.

**Produces:** compound `ProjectCard` with parts `ProjectCard.Header`, `.Tech`, `.Decisions`, `.Links`; `FlowDiagram` (no props; reads `content/flow.ts`).

- [ ] Step 1: Write failing test `FlowDiagram.test.tsx`: nodes render as buttons in flow order; the first node is selected by default and its decision text is visible; pressing Enter on the `outbox` node shows `flow.outbox.decision` and sets `aria-pressed="true"` on it only.
- [ ] Step 2: Run it. Expected: FAIL.
- [ ] Step 3: Implement `FlowDiagram`: horizontal chain on `lg+`, vertical on mobile; stitched connectors with dots travelling along them (none when reduced motion); detail panel with `aria-live="polite"` animating between decisions.
- [ ] Step 4: Implement `ProjectCard` and `Work`: SchoolLink full width with `FlowDiagram` and its five decisions; Scolarys and AICS as tilt cards that expand in place (`aria-expanded`, animated height) to show role, constraint/status and decisions; GitHub button when `repoUrl`, `Badge tone="private"` when `isPrivate`.
- [ ] Step 5: Run all checks; check both languages in the browser; commit `feat: add work section with interactive flow diagram`.

### Task 7: Stack, Path and Contact

**Files:** `src/features/stack/Stack.tsx`, `src/features/path/Path.tsx`, `src/features/contact/Contact.tsx`.

- [ ] Step 1: `Stack`: five group cards from `content/stack.ts`; items with `core: true` (Java, Spring Boot) rendered larger with a gradient ring and a "Core" label; icons take their brand colour on hover; staggered reveal.
- [ ] Step 2: `Path`: vertical stitched timeline from `content/timeline.ts`, diamonds as markers, internship then degree; graduation photo in a `StripeFrame` beside the degree entry.
- [ ] Step 3: `Contact`: large headline, magnetic WhatsApp button (same URL builder), email button (`mailto:`), GitHub, LinkedIn, Download CV; phone number and email shown as text too.
- [ ] Step 4: Lazy-load `Work`, `Stack`, `Path`, `Contact` in `App.tsx` with `React.lazy` + `Suspense`.
- [ ] Step 5: Run all checks; commit `feat: add stack, path and contact sections`.

### Task 8: CV

**Files:** `cv/cv.html`, `scripts/build-cv.mjs`, `public/cv/Brahan-Kessel-Fopa-CV.pdf`.

- [ ] Step 1: Write `cv/cv.html`: A4, `@page { margin: 0 }`, white background, dark text, striped ember/cloth/saffron band at the top, Syne headings and Inter body embedded from the `@fontsource` files. Header: "FOPA TSEUTCHOUA Brahan Kessel", title, Yaoundé, phone, email, GitHub, LinkedIn (real links). Sections in spec section 9 order with spec section 5 content. Must fit one page.
- [ ] Step 2: `scripts/build-cv.mjs`: find Edge or Chrome (`msedge`/`chrome` standard install paths on Windows, `google-chrome`/`chromium` elsewhere), run `--headless --disable-gpu --no-pdf-header-footer --print-to-pdf=<out> <file url>`; exit non-zero with a clear message if no browser is found.
- [ ] Step 3: Run `npm run cv`. Expected: PDF exists. Open it and confirm: one page, text selectable, links clickable, nothing cut off.
- [ ] Step 4: Commit `feat: add generated CV`.

### Task 9: SEO, polish and final verification

**Files:** `index.html`, `public/favicon.svg`, `README.md`, any file needing fixes.

- [ ] Step 1: `index.html`: title "Brahan Kessel Fopa — Backend Software Engineer", meta description, Open Graph title/description/type, `theme-color` `#0d0b0c`; `favicon.svg` with the "bkf." monogram on ink with a gradient dot.
- [ ] Step 2: `README.md`: how to run, where to edit content (`src/content`, `src/locales`), how to regenerate images and the CV.
- [ ] Step 3: `npm run build && npm run preview`; in the browser verify, in English and French:
  - 1280px, 768px and 360px: no horizontal scroll, nothing overlapping;
  - every nav link scrolls to its section and highlights;
  - keyboard only: Tab reaches every control with a visible focus ring, flow diagram and mobile menu operable, Escape closes the menu;
  - reduced motion emulated: no tilt, magnet, glow, travelling dots or smooth scroll; all content visible;
  - WhatsApp, email, GitHub, LinkedIn and CV links point to the right targets;
  - console has no errors.
- [ ] Step 4: Run lint, typecheck, test, build. Expected: all pass.
- [ ] Step 5: Commit `feat: add seo, favicon and readme`.
