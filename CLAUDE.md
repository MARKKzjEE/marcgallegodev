# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio for Marc Gallego (Software Engineer / Full Stack Developer). Single-page static site built with Astro 5, Tailwind CSS v4, and vanilla TypeScript. All content is in Spanish (`lang="es"`).

Target domain: `marcgallegodev.com`

## Commands

```bash
pnpm dev        # Dev server at localhost:4321
pnpm build      # Production build to ./dist/
pnpm preview    # Preview production build locally
```

Package manager is **pnpm** — do not use npm or yarn.

## Architecture

### Page structure

Single-page app with anchor navigation. `src/pages/index.astro` composes the layout with section components:

- `src/layouts/Layout.astro` — HTML shell with meta tags, dark mode init script, and theme toggle logic
- `src/sections/` — Full-width page sections (Header, Hero). Planned sections: `#experience`, `#projects`, `#contact`
- `src/components/` — Reserved for reusable sub-components (currently empty)

### Styling

**Tailwind CSS v4** configured entirely via CSS (no `tailwind.config.js`). All design tokens live in `src/styles/tailwind.css` using `@theme`:

- Three custom self-hosted fonts: **Vogun** (headings), **Just Sans** (body), **NORD** (nav/buttons)
- Custom color palette: `dark-primary`, `dark-secondary`, `light-primary`, `light-secondary`
- Dark mode: class-based (`.dark` on `<html>`), using `@custom-variant dark (&:where(.dark, .dark *))`
- Animation plugin: `@midudev/tailwind-animations`

Component-specific styles use scoped `<style>` blocks in `.astro` files. Use `:global()` only when targeting elements across component boundaries.

### Interactivity patterns

- **No UI framework** — all JS is vanilla TypeScript in `src/scripts/`
- **Data-attribute selectors** (`data-about-card`, `data-site-header`, etc.) for JS hooks — keep JS decoupled from CSS class names
- **Init guards** via `dataset` flags to prevent double-initialization
- **FLIP animations** with Web Animations API for expand/collapse transitions
- **Accessibility**: focus traps, `aria-expanded`, `aria-modal`, `role="dialog"`, Escape key handling, `prefers-reduced-motion` support

### Dark mode

Implemented with class toggle on `<html>`. An inline script in Layout.astro runs before paint to prevent flash (reads `localStorage`, falls back to `prefers-color-scheme`, defaults to dark). Theme toggle in Header syncs state to `localStorage`.

### Assets

`public/assets/` is tracked with **Git LFS** (configured in `.gitattributes`). Contains:
- Background video (MP4 with WebP poster)
- Profile images (separate light/dark variants, swapped via `dark:hidden`/`dark:block`)

## Conventions

- Section components go in `src/sections/`, reusable components in `src/components/`
- Use `data-*` attributes as JS selectors, not CSS classes
- Glassmorphism pattern: `color-mix(in srgb, var(--color-*) %, transparent)` + `backdrop-filter: blur()`
- TypeScript strict mode (extends `astro/tsconfigs/strict`)
- All interactive behavior must respect `prefers-reduced-motion`
