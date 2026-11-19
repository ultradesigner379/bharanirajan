# Ultra Designer (UD) — Portfolio Website

A modern, responsive, dark-themed personal portfolio for **S. Bharani Rajan**
(Ultra Designer / UD) — 3D Animator, Graphic Designer & AI Enthusiast.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui +
Framer Motion**, featuring interactive water-physics backgrounds, liquid-glass
"Water Cube" buttons, a 3D-flow hero, project filter tabs, a before/after
comparison slider, an "Ask UD" mini assistant, and a working contact form.

## Quick start

```bash
# 1. Install dependencies
bun install        # or: npm install / pnpm install

# 2. (Optional) sync the database
bun run db:push

# 3. Start the dev server
bun run dev        # → http://localhost:3000
```

> Requires Node 18+ and Bun (or npm/pnpm).

## What's inside

- `src/app/` — Next.js App Router (page, layout, API routes)
- `src/components/` — UI (shadcn) + portfolio components (navbar, hero, water
  ripple canvas, water-cube buttons, projects, before/after, services,
  ask-ud assistant, etc.)
- `src/data/portfolio.ts` — all portfolio content (edit your links/info here)
- `src/lib/` — sound (Web Audio droplet), db, utils
- `public/portfolio/` — generated 3D-flow images + before/after images
- `public/resume.pdf` — downloadable resume (replace with your real file)
- `public/resume.png` — resume image source
- `prisma/` — database schema (SQLite)
- `scripts/` — resume PDF generator

## Key features

- Water ripple canvas background (mouse/touch, 60fps, dark cyan)
- Liquid-glass "Water Cube" buttons (jelly wobble, squish tap, internal ripple)
- Optional water-droplet sound (Web Audio API, mute/unmute in navbar)
- 3D rotating wireframe cube hero with orbit rings
- Project category filter tabs + modal project details
- Before & After draggable comparison slider
- Services section with WhatsApp quote buttons
- "Ask UD" floating chat assistant (local JS Q&A)
- Contact form with server-side validation
- Light/dark theme, fully responsive, smooth scrolling

## Replace these with your real assets

- `public/resume.pdf` / `public/resume.png` — your resume
- `public/portfolio/*.png` — project & hero images
- `src/data/portfolio.ts` — GitHub / LinkedIn / Behance links, contact info

## Scripts

```bash
bun run dev        # dev server (port 3000)
bun run lint       # ESLint
bun run db:push    # sync prisma schema to SQLite
bun run build      # production build
```
