# Projekt-Status: Alessandro Orlandi — Initiativbewerbung Zwetschke

## Ziel
Hochprofessionelle, interaktive Landingpage als Initiativbewerbung bei der Agentur Zwetschke für die Rolle **Technical Product Owner / Solution Architect**.

---

## Fortschritt

### Phase 1: Setup & Infrastruktur ✅
- [x] Next.js 16 (App Router) — bereits initialisiert
- [x] Dependencies installiert: `framer-motion`, `next-intl`, `lucide-react`, Tailwind CSS v4
- [x] Ordnerstruktur: `/src/app`, `/src/components`, `/src/i18n`, `/messages`
- [x] `next-intl` v4 konfiguriert (routing, middleware, request config, plugin)
- [x] `[locale]`-Segment im App Router (`/src/app/[locale]/`)
- [x] Root-Redirect: `/` → `/de`
- [x] Globales Dark-Mode CSS-Theme (Neon-Cyan `#00e5ff` Akzente)
- [x] CSS-Variablen für alle Brand-Farben
- [x] Tailwind v4 `@theme inline` mit Custom-Tokens konfiguriert
- [x] Typografie: Inter (Sans) + JetBrains Mono (Code/Terminal)
- [x] i18n-Nachrichten: `messages/de.json` und `messages/en.json`
- [x] Alle 4 Sektions-Namespaces befüllt: `hero`, `problems`, `skills`, `contact`

### Phase 2: Komponenten ✅
- [x] `Navbar` — Sprachswitch (DE/EN), Anker-Navigation, sticky mit Blur
- [x] `HeroSection` — Animated Headline, Typewriter-Effekt, CTA-Buttons
- [x] `ProblemSlider` — Horizontaler Karussell-Slider mit 4 Problem-Karten
- [x] `SkillsGrid` — Kategorisiertes Grid mit Skill-Level-Indikatoren
- [x] `ContactTerminal` — Terminal-UI Kontaktformular mit Cursor-Effekt
- [x] `Footer` — Minimalfooter mit Social Links

### Phase 3: Polish & Deployment ✅ (teilweise)
- [x] Framer Motion Animationen (Scroll-Trigger mit `whileInView` + Stagger auf SkillsGrid, ProblemSlider, ContactTerminal)
- [x] SEO Metadata (Open Graph, Twitter Card, robots)
- [x] Performance: Google Fonts auf `next/font` migriert (kein render-blocking @import mehr)
- [x] Accessibility: `aria-label` auf alle Icon-Buttons, `role="tablist"` auf Dots-Navigation
- [ ] `middleware.ts` → `proxy.ts` Rename (next-intl v4 hat noch Abhängigkeit auf middleware.ts, vorerst übersprungen)
- [ ] Vercel-Deployment

---

## Tech Stack

| Layer | Technologie |
|-------|-------------|
| Framework | Next.js 16 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS v4 |
| Animationen | Framer Motion 12 |
| i18n | next-intl v4 |
| Icons | lucide-react |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Deployment | Vercel (geplant) |

---

## Design-Tokens

```
Background:     #080c10
Surface:        #0d1117
Surface Raised: #161b22
Accent (Cyan):  #00e5ff
Foreground:     #e8edf2
Muted:          #8b949e
Border:         rgba(0, 229, 255, 0.12)
```
