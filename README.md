# Personal Landing Page

A performant, fully internationalized personal landing page built with the latest Next.js App Router, React 19, and Tailwind CSS v4. Designed to showcase skills, projects, and contact options — with a clean developer experience at its core.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 (PostCSS plugin) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| i18n | next-intl 4 |

---

## Architecture

### Internationalization

The app uses **next-intl** with locale-based routing via the App Router's `[locale]` dynamic segment. A Next.js middleware handles locale detection and redirect logic.

```
src/
├── middleware.ts              # Locale detection & redirect
├── i18n/
│   ├── routing.ts            # Locale config (de | en, default: de)
│   ├── request.ts            # Per-request i18n setup
│   └── navigation.ts         # Typed navigation helpers
└── app/
    ├── layout.tsx            # Root layout (no locale)
    └── [locale]/
        ├── layout.tsx        # Locale layout (font, metadata, providers)
        ├── page.tsx          # Home page
        ├── impressum/
        └── datenschutz/
```

Translation files live in `messages/de.json` and `messages/en.json`.

### Component Structure

All UI is composed from self-contained components in `src/components/`. Heavy visual sections (skill diagrams) are isolated under `skill-diagrams/` to keep the main tree readable.

```
src/components/
├── HeroSection.tsx
├── AboutMeSection.tsx
├── ProblemSection.tsx
├── SkillsGrid.tsx
├── SkillCard.tsx
├── SkillModal.tsx
├── ContactTerminal.tsx
├── Navbar.tsx
├── Footer.tsx
├── SectionDivider.tsx
├── Hint.tsx
├── parseWithHints.tsx
└── skill-diagrams/           # SVG/canvas diagrams per skill
    ├── ApiMatrixDiagram.tsx
    ├── C4ContextDiagram.tsx
    ├── CloudEvolutionDiagram.tsx
    ├── FrontendLayersDiagram.tsx
    └── ...
```

### Styling

Tailwind CSS v4 is used via the `@tailwindcss/postcss` plugin — no `tailwind.config.js` required. Theme tokens (colors, spacing, typography) are defined in `src/lib/theme.ts` and referenced consistently across components.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/de` by default.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |

---

## Project Structure

```
.
├── messages/          # i18n translation files (de, en)
├── src/
│   ├── app/           # Next.js App Router pages & layouts
│   ├── components/    # React UI components
│   ├── i18n/          # next-intl config & routing
│   └── lib/           # Shared utilities & theme tokens
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```
