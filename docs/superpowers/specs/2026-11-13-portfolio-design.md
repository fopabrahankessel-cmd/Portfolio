# Portfolio website — design

Date: 2026-11-13
Owner: Brahan Kessel Fopa (FOPA TSEUTCHOUA Brahan Kessel)

## 1. Intent

A personal portfolio that makes recruiters and freelance clients contact Brahan
on WhatsApp or by email. He is a backend-focused software engineer in Yaoundé,
Cameroon, on his first job search, open to full-time roles and freelance work.
The site has to look as polished as the well-known tutorial portfolios, while
looking like nobody else's.

Success: a visitor understands within ten seconds who he is and what he builds,
can see real engineering proof, and reaches WhatsApp or email in one click from
anywhere on the page.

## 2. Goals, non-goals, anti-goals

Goals

- One scrolling page, highly interactive, fast, fully responsive (360px up).
- English and French, switchable.
- A downloadable one-page CV (PDF), written from the same content.
- Content editable without touching layout code.

Non-goals

- No backend, no contact form, no blog, no CMS, no analytics.
- No light theme. The site is dark only.
- Deployment and a domain name are not part of this work. The build output must
  be a plain static folder that any static host can serve.

Anti-goals

- Overstating experience. He has no prior salaried employment. Never write
  "two years of professional experience". The agreed line is
  "two years building real software, three systems delivered solo".
- Inventing facts, numbers, clients, testimonials or certifications.
- Leaking private details of Scolarys (the institution's data and code are
  private; describe only what is written in section 5).
- Animation that hurts reading, performance, or users who prefer reduced motion.

## 3. Visual direction: "Toghu Night" (chosen by the owner)

Dark, modern, with stitched motifs inspired by Cameroonian Toghu embroidery.
The approved sketch is `.superpowers/brainstorm/843-1794587132/content/themes.html`
(option C). Tokens from that sketch:

| Token   | Value                        | Use                          |
| ------- | ---------------------------- | ---------------------------- |
| ink     | `#0d0b0c`                    | page background              |
| surface | `#171314` (builder may tune) | cards                        |
| line    | `#3a302c`                    | borders                      |
| cloth   | `#f4ede4`                    | primary text, white stitches |
| muted   | `#bdb2a5`                    | body text                    |
| ember   | `#e8452c`                    | red accent                   |
| saffron | `#f2a33a`                    | orange accent                |
| live    | `#4ade80`                    | "available" dot only         |

- Signature gradient: ember → saffron, used for the key headline words and the
  primary button. Use it sparingly.
- Type: Syne (800/600) for display, Inter for body, JetBrains Mono for code,
  labels and diagram text. Self-host the fonts (e.g. `@fontsource`), no runtime
  call to Google Fonts.
- Motifs: stitched dashed lines, small embroidered dots and diamond/lozenge
  shapes drawn in SVG; the striped ember/cloth/saffron band used as the photo
  frame and as section dividers. Motifs are abstract geometry, not copies of a
  specific garment.
- Body text contrast must meet WCAG AA on the dark background.

## 4. Page structure

Sticky top navigation: monogram "bkf.", links Work / Stack / Path / Contact,
EN/FR switch, and a compact WhatsApp button. Collapses to a menu on mobile.
The active section is highlighted while scrolling.

1. **Hero.** Availability badge ("Open to full-time and freelance"), headline
   "Backend engineer. Built in Yaoundé.", one-sentence intro, primary button
   "WhatsApp me", secondary "View the work", portrait in the striped stitched
   frame, three stats: 3 systems delivered solo · 3,000+ students at the school
   Scolarys was built for · FR / EN.
2. **About.** Bio (section 5), Download CV button, location, languages.
3. **Work.** SchoolLink flagship, then Scolarys and AICS Report Hub.
   - SchoolLink has an interactive flow diagram: Teacher's phone (Flutter,
     offline-first) → REST API (Spring Boot) → PostgreSQL → Outbox → Dispatcher
     → Guardian (Firebase push / SMS digest). Clicking or focusing a node shows
     the engineering decision behind it. Animated dots travel along the path.
   - Each project card: summary, role, tech chips with icons, key decisions,
     link button (GitHub) or a "Private code" badge for Scolarys.
   - Scolarys and AICS expand in place to show the full case study.
4. **Stack.** Technologies grouped Backend / Data / Mobile / Web / Tooling, each
   with its brand icon. Java and Spring Boot are visually the centre and marked
   as the core.
5. **Path.** Vertical stitched timeline: internship, degree. Graduation photo
   beside the education entry.
6. **Contact.** Large WhatsApp button (opens `https://wa.me/237640154719` with
   a pre-written message in the current language), email (`mailto:`), GitHub,
   LinkedIn, Download CV. Footer with name and year.

## 5. Content (source of truth)

Identity

- Display name: Brahan Kessel Fopa. Full legal name for the CV:
  FOPA TSEUTCHOUA Brahan Kessel.
- Title: Backend-focused Software Engineer. Location: Yaoundé, Cameroon.
- WhatsApp / phone: +237 640 154 719. Email: fopabrahankessel@gmail.com.
- GitHub: https://github.com/fopabrahankessel-cmd
- LinkedIn: https://www.linkedin.com/in/fopa-tseutchoua-657b10318
- Languages: French, English. Do not add a proficiency level.
- Seeking: full-time role or freelance clients.

Bio (English, builder may polish but not add facts)

> I'm a software engineer who has spent two years building real software, with
> three systems delivered solo. Java is my home language: I design and ship
> backend services with Spring Boot, backed by PostgreSQL and MS SQL Server.
> I also build mobile apps with Flutter and React Native, so I understand a
> product from the database to the phone in a user's hand.

Project 1 — SchoolLink (flagship)

- School attendance and parent-notification platform for secondary schools in
  Cameroon. Teachers record attendance per period on a phone, assistant
  discipline masters record lateness at the gate, and every absence reaches the
  guardian the same day by Firebase push or a single daily SMS digest. Repeated
  patterns raise risk alerts that a Discipline Master decides on (dismiss,
  summon, disciplinary issue, refer to counsellor); the rules never auto-decide.
- Role: sole developer — spec, architecture, backend, web dashboard, Android
  app, deployment.
- Tech: Java 21, Spring Boot 4 modular monolith (12 modules, one REST API),
  PostgreSQL 16 + Flyway, Spring Security + JWT, Firebase Admin SDK; React +
  Vite + TypeScript + MUI + Recharts; Flutter with Riverpod and drift (SQLite);
  Docker Compose + Caddy; JUnit 5 + Testcontainers; i18n FR/EN.
- Decisions: (1) every query filtered by school and user scope server-side
  from the JWT, never from the request; (2) notifications go through a
  transactional outbox with a separate dispatcher and retries, so none are lost
  on restart; (3) offline-first teacher screens with device-generated UUIDs and
  idempotent PUT endpoints, so retries never duplicate; (4) append-only audit
  log on every create, edit, cancel and export; (5) privacy by design: birth
  year only, no photos, phone numbers never in URLs or logs.
- Link: https://github.com/fopabrahankessel-cmd/schoollink

Project 2 — Scolarys (private code, describe only)

- School management system built during the academic internship at Collège
  Adventiste d'Odza (Yaoundé, 3,000+ students), replacing a legacy .NET desktop
  application. Covers enrolment, academic structure across francophone and
  anglophone sections plus a technical branch, timetabling, mark entry,
  sequential/termly/annual averages with class and level ranking, discipline
  records, report cards matching the school's bilingual format, tuition in four
  instalments, and a parent portal.
- Role: sole developer plus requirements — ran interviews with six Directeurs
  des Études and the Surveillant Général, wrote the functional specification,
  designed the domain model (8 packages, ~107 classes).
- Tech: Spring Boot, Next.js, Microsoft SQL Server, React Native (Expo) teacher
  app, Campay (MTN/Orange Mobile Money) and SMS integrations, bilingual FR/EN.
- Shaping constraint: over 200 teachers share at most 5 desktop computers in
  mark-entry season, so mark entry moved to a mobile app that works offline
  once it has confirmed the entry session is open.
- Status: delivered and defended on 1 October 2026.

Project 3 — AICS Report Hub

- Django platform for final-year report submissions across multiple campuses.
  Campus admins register students and supervisors and bulk-assign students;
  supervisors issue one-time upload codes; students upload a PDF, which gets an
  automatic first-page preview; reports are publicly browsable and searchable;
  supervisors grade with feedback.
- Role: sole developer.
- Tech: Python 3.13, Django 6, PostgreSQL/SQLite, PyMuPDF, Pipenv. Four-role
  RBAC on a custom user model with campus-scoped access, one-time codes
  validated live over AJAX, PDFs streamed through the app.
- Link: https://github.com/fopabrahankessel-cmd/IAI-Defense-report-management-

Path

- Software engineering intern — Collège Adventiste d'Odza, Yaoundé.
  July 2026 – December 2026. Supervisor: M. NGANGUE Samuel (computer engineer).
  Gathered requirements and produced the functional specification; built and
  delivered Scolarys, defended 1 October 2026.
- Software Engineering degree (BAC+3), Institut Africain d'Informatique (African
  Institute of Computer Science) — Centre d'Excellence Technologique Paul Biya,
  Yaoundé. Graduated November 2026.
- No certifications section.

Stack groups

- Backend (core): Java, Spring Boot, Spring Security/JWT. Also: Python/Django.
- Data: PostgreSQL, Microsoft SQL Server, Flyway, SQLite.
- Mobile: Flutter, React Native (Expo).
- Web: React, Next.js, TypeScript.
- Tooling: Git, GitHub, GitLab, Docker, JUnit 5, Testcontainers, Firebase.

Photos (already saved in the repo)

- `source-assets/portrait.jpg` — hero and about.
- `source-assets/graduation.jpg` — Path, beside education.
- Builder converts them to optimised WebP/AVIF at suitable sizes.

## 6. Interactivity

- A stitched thread (SVG path) that draws itself down the page with scroll.
- Smooth scrolling; sections and items reveal on entering the viewport.
- Cards tilt towards the pointer; primary buttons are slightly magnetic.
- A soft ember glow follows the pointer on desktop only.
- SchoolLink flow diagram as described in section 4, keyboard operable.
- Animated number count-up for the hero stats.
- Language switch without reload; choice remembered in `localStorage`, first
  visit follows the browser language (French if `fr*`, otherwise English).
- With `prefers-reduced-motion: reduce`: no smooth scroll, no tilt, no magnet,
  no glow, no travelling dots; content simply appears.
- Touch devices: no pointer effects; everything usable by tap.

## 7. Icons (owner's explicit request)

- Every technology shown anywhere (stack section, project chips, diagram) has
  its real brand icon.
- WhatsApp, GitHub, GitLab, LinkedIn and email have icons wherever they appear.
- General interface icons (arrows, download, menu, external link, location).
- Builder's call on libraries; suggested `lucide-react` for interface icons and
  `react-icons` (Simple Icons / Devicon sets) for brands. Where a brand icon is
  missing from the library (Microsoft SQL Server and Java are known gaps in
  some sets), use another set or a hand-made SVG. No technology may be left
  with a generic placeholder icon.

## 8. How it gets made (assistant's calls, approved by the owner)

- React + Vite + TypeScript, generated with the official Vite scaffold before
  any file is edited. Package manager: npm (Node 24 is installed).
- Tailwind CSS v4 with the tokens above defined once as theme variables.
- `motion` for animation, `lenis` for smooth scroll, `react-i18next` for EN/FR.
- ESLint + Prettier (with the Tailwind class-sorting plugin). TypeScript strict.
- Structure and patterns:
  - feature folders per section (`src/features/hero`, `work`, `stack`, ...),
    shared primitives in `src/components/ui`, hooks in `src/hooks`;
  - all content in typed data files under `src/content`, text in
    `src/locales/en` and `fr`; components contain no hard-coded copy;
  - presentational components fed by data, behaviour in custom hooks
    (`useReducedMotion`, `useTilt`, `useMagnetic`, `useActiveSection`);
  - compound components where a widget has parts (project card, flow diagram);
  - sections below the hero lazy-loaded.
- Checks: lint, typecheck and production build must pass; one automated test
  that the English and French locale files have identical keys.
- SEO basics: title, description, Open Graph tags, favicon (bkf monogram),
  `lang` attribute following the selected language.

## 9. CV

- One A4 page, English, content from section 5, in the legal name with
  "Brahan Kessel Fopa" readable as the usual name.
- Print-friendly: white background, dark text, the ember/saffron striped band
  and Syne headings as the only decoration. Real selectable text so recruiter
  software can parse it. Links clickable.
- Sections: header with contacts and links, profile, skills, projects (three),
  experience (internship), education, languages.
- Authored as an HTML file in the repo (`cv/`), rendered to
  `public/cv/Brahan-Kessel-Fopa-CV.pdf` with a headless browser via an npm
  script, so it can be regenerated after edits.
- Download buttons on the site point to that PDF.

## 10. Left to the builder

- Exact layout, spacing, motion timing and the wording of small interface text.
- French translation of all copy (the owner will review it).
- The pre-written WhatsApp message.
- Surface colours between the given tokens.

## 11. Open items for the owner (do not block the build)

- French copy review after the build.
- Hosting and domain, if wanted, as a follow-up.
- `.superpowers/` should be listed in `.gitignore`.
