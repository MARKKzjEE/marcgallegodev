# CLAUDE.md

## Project Overview

Portfolio personal de Marc Gallego (Ingeniero del Software / Full Stack Developer). Multi-page static site con Astro 5, Tailwind CSS v4 y vanilla TypeScript. Bilingüe: español por defecto (sin prefijo) e inglés bajo `/en/`. Deploy en Vercel.

**Visión de diseño:** Estilo moderno y minimalista mezclado con estética de revista/magazine vanguardista. El portfolio debe tener carácter y personalidad propia — nunca debe parecer un template genérico ni generado por IA. Cada sección debe sentirse intencionada y con criterio.

Dominio: `marcgallego.com` (configurado como `site` en `astro.config.mjs`)

## Commands

```bash
pnpm dev        # Dev server localhost:4321
pnpm check      # Chequeo de tipos (astro check)
pnpm build      # astro check + build a ./dist/ (falla si hay errores de tipos)
pnpm preview    # Preview del build
```

Package manager: **pnpm** — no usar npm ni yarn.

## Architecture

### Estructura de página

Multi-page con file-based routing de Astro. Cada página pasa `title`/`description` (de `src/i18n`) al Layout:

- `/` ↔ `/en/` — Home: Hero, WhatIDo, HomeProjects, AboutCover, TechStack, Partners, FAQNote
- `/experiencia/` ↔ `/en/experience/` — CV completo con descarga de PDF
- `/proyectos/` ↔ `/en/projects/` — Catálogo de proyectos
- `/contacto/` ↔ `/en/contact/` — Formulario (Formspree) + gradient
- `/404` — `noindex`

Estructura compartida:
- `src/layouts/Layout.astro` — `<head>` completo: canonical, hreflang, OG/Twitter, JSON-LD (WebSite + Person con `@id`), dark mode pre-paint, splash (solo home)
- `src/sections/` — Secciones full-width
- `src/scripts/` — Scripts compartidos: `circle-reveal.ts`, `unicorn-scene.ts`
- `src/i18n/` — `es.ts`/`en.ts` (mismas claves, `en` tipado como `Translations`) + helpers `getLang`, `useTranslations`, `getLocalePath`, `getAlternatePath`, `withSlash`
- `src/utils/` — Helpers pequeños (ej. `age.ts`)

### SEO y URLs

- Todas las URLs internas, canonical, hreflang y sitemap acaban en `/`. Generar links siempre con `getLocalePath`/`getAlternatePath`, nunca a mano. `vercel.json` (`trailingSlash: true`) redirige las versiones sin barra.
- JSON-LD extra de una página que hable de Marc → usar el mismo `@id` de Person (`https://marcgallego.com/#person`), no crear otra entidad.
- Nada de email/teléfono en claro en el HTML: el Footer los monta en cliente.

### Estado actual

**Hero:** Gradient interactivo de UnicornStudio (escenas light/dark en `public/unicorn/`) + banda inferior con nombre "Marc Gallego" (typewriter) y bandas de rol/stats con separadores `/` con glitch binario.

**Header:** Fixed. Desktop = toolbar grid 2 filas (logo, nav, ES/EN, tema, LinkedIn, disponible). Móvil = barra + hamburguesa + overlay con clip-path (`inert` cuando está cerrado, focus trap al abrir).

### Styling

**Tailwind CSS v4** configurado enteramente por CSS (sin `tailwind.config.js`). Tokens en `src/styles/tailwind.css` con `@theme`:

- **Fuentes** (self-hosted en `public/fonts/`, solo se suben los pesos que se usan):
  - **NORD** — Headings grandes, UI (`font-nord`)
  - **CottorwayPro** — Body text (`font-cottor`)
  - **Monoblock** — Labels mono, header (`font-monoblock`)
  - **Corinthia** / **Reenie Beanie** — Acentos caligráficos (Partners, FAQ)

- **Paleta de colores (tokens semánticos):**
  - `--primary`: fondo de la web — `#ffffff` light / `#000000` dark
  - `--secondary`: headers, textos — `#1D1D1F` light / `#FFFFFF` dark
  - `--terciary` / `--quaternary`: fondos de tarjetas, `--secondary` al 5%/8% (light) y 8%/13% (dark)
  - `--secondary-soft`: `--secondary` al 80%
  - Clases Tailwind: `bg-primary`, `text-secondary`, etc. `--terciary`/`--quaternary` se usan como `var()` en CSS

- **Dark mode:** Class-based (`.dark` en `<html>`), variant `@custom-variant dark (&:where(.dark, .dark *))`
- **Animations:** Plugin `tailwind-animations`
- **SCSS:** Estilos de componente en `<style lang="scss">` dentro de cada `.astro`

### Interactividad

- Vanilla TypeScript en `src/scripts/`, sin framework UI
- Selectores `data-*` para hooks JS (desacoplados de CSS)
- Init guards con `dataset` flags para evitar doble inicialización
- **FLIP animations** con Web Animations API (spring easing `cubic-bezier(0.22, 1, 0.36, 1)`, 500ms)
- State classes (`is-expanded`, `is-compact-hidden`, etc.) — CSS define el visual, JS solo togglea
- Accesibilidad: focus traps, `aria-expanded`, `aria-modal`, Escape, `prefers-reduced-motion`

### Assets

- `public/assets/og-image.jpg` — Imagen OG (1200×630, JPEG por compatibilidad con LinkedIn y otros)
- `public/cv/` — CVs en PDF; sus fuentes LaTeX están en `cv/` (fuera de `public/` para no publicarlas)
- `src/assets/` — Imágenes de perfil (light/dark), proyectos y clientes, optimizadas con `<Image>` de Astro
- `public/projects/` — Miniaturas animadas de cada proyecto (vídeo en bucle 960×720, `.mp4` H.264 + `.av1.mp4`), encima de su imagen en el catálogo y la home (`ProjectVideo.astro`, `scripts/project-video.ts`: en el catálogo arrancan al verse; en la home, al pasar el ratón). Se generan en `marcgallego-motion` con `bash miniaturas/preparar.sh`. Las imágenes de RTTH y Trama World son el fotograma 0 de su vídeo (sin salto al arrancar); si cambia el vídeo, se regeneran (comando en `preparar.sh`)
- Webs de los proyectos: `projectUrls` en `src/data/projects.ts` (`null` = archivado). Enlace con ↗ + circle-reveal en `components/ProjectLink.astro` (catálogo, lista móvil de la home y Doko); el índice de la home usa un solo reveal para toda la lista

## Conventions

- Secciones en `src/sections/`, componentes en `src/components/`
- Selectores JS con `data-*`, nunca con clases CSS
- Glassmorphism: `color-mix(in srgb, var(--terciary) %, transparent)` + `backdrop-filter: blur()`
- TypeScript strict mode
- Toda interacción debe respetar `prefers-reduced-motion`
- Contenido en español e inglés, tono personal y cercano. Ningún texto visible ni aria-label hardcodeado: todo pasa por `src/i18n`
