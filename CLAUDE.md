# CLAUDE.md

## Project Overview

Portfolio personal de Marc Gallego (Ingeniero del Software / Full Stack Developer). Multi-page static site con Astro 5, Tailwind CSS v4 y vanilla TypeScript. Todo el contenido está en español (`lang="es"`).

**Visión de diseño:** Estilo moderno y minimalista mezclado con estética de revista/magazine vanguardista. El portfolio debe tener carácter y personalidad propia — nunca debe parecer un template genérico ni generado por IA. Cada sección debe sentirse intencionada y con criterio.

Dominio: `marcgallegodev.com`

## Commands

```bash
pnpm dev        # Dev server localhost:4321
pnpm build      # Build a ./dist/
pnpm preview    # Preview del build
```

Package manager: **pnpm** — no usar npm ni yarn.

## Architecture

### Estructura de página

Multi-page con file-based routing de Astro. Cada página tiene sus propios meta tags para SEO:

- `/` → `src/pages/index.astro` — Home (Hero + AboutCard)
- `/experiencia` → `src/pages/experiencia.astro` — Trayectoria profesional
- `/proyectos` → `src/pages/proyectos.astro` — Portfolio de proyectos
- Contacto se mantiene como ancla `#contact` dentro de cada página

Estructura compartida:
- `src/layouts/Layout.astro` — Shell HTML con props dinámicos (`title`, `description`), meta tags, dark mode pre-paint
- `src/sections/` — Secciones full-width: Header, Hero
- `src/components/` — Subcomponentes reutilizables (ej. `AboutCard.astro` dentro de Hero)

### Estado actual

**Hero:** Fondo de vídeo del mar (MP4 + poster WebP) con overlay adaptado al tema. Grid de 2 columnas: foto de perfil a la izquierda (variantes light/dark) + AboutCard a la derecha con glassmorphism.

**AboutCard:** Tarjeta interactiva con dos estados:
- *Compacto:* Título "INGENIERO DEL SOFTWARE", nombre, texto de bienvenida, botón "SOBRE MI"
- *Expandido:* Modal full-screen con biografía en columnas, foto en blanco y negro, tagline vertical "DISEÑO CREATIVO & DESARROLLO DIGITAL DESDE 2018", heading grande "SOBRE MI"

**Header:** Navegación sticky con links a páginas (/experiencia, /proyectos) y ancla (#contact), selector de idioma ES/EN y toggle de tema.

### Styling

**Tailwind CSS v4** configurado enteramente por CSS (sin `tailwind.config.js`). Tokens en `src/styles/tailwind.css` con `@theme`:

- **Fuentes** (self-hosted en `public/fonts/`):
  - **Vogun** — Headings (serif, elegante)
  - **CottorwayPro** — Body text (300-600 weights)
  - **NORD** — Nav, botones, UI elements (100-900 weights)

- **Paleta de colores:**
  - Light: deep-blue `#011633` (headings), dark-blue `#0C111D` (texto), cream `#F0EEE9` (fondo), orange `#F2542D` (acento), charcoal `#364156` (detalles)
  - Dark: carbon `#171717` (fondo), white `#FFFFFF` (headings/texto), grey-light `#D5D5D5`, grey-dark `#868686`
  - Tokens semánticos: `--th-bg`, `--th-text`, `--th-heading`, `--th-header-text`, `--th-card-glass-bg`

- **Dark mode:** Class-based (`.dark` en `<html>`), variant `@custom-variant dark (&:where(.dark, .dark *))`
- **Animations:** Plugin `tailwind-animations`
- **SCSS:** Estilos específicos de componente en archivos `.scss` separados (ej. `about-card.scss`)

### Interactividad

- Vanilla TypeScript en `src/scripts/`, sin framework UI
- Selectores `data-*` para hooks JS (desacoplados de CSS)
- Init guards con `dataset` flags para evitar doble inicialización
- **FLIP animations** con Web Animations API (spring easing `cubic-bezier(0.22, 1, 0.36, 1)`, 500ms)
- State classes (`is-expanded`, `is-compact-hidden`, etc.) — CSS define el visual, JS solo togglea
- Accesibilidad: focus traps, `aria-expanded`, `aria-modal`, Escape, `prefers-reduced-motion`

### Assets

- `public/assets/` tracked con **Git LFS**: vídeo de fondo (MP4 + poster WebP)
- `src/assets/` — Imágenes de perfil (variantes light/dark), fotos para AboutCard (blanco y negro)
- Imágenes optimizadas con `<Image>` de Astro (sharp → WebP, quality 90-92%)

## Conventions

- Secciones en `src/sections/`, componentes en `src/components/`
- Selectores JS con `data-*`, nunca con clases CSS
- Glassmorphism: `color-mix(in srgb, var(--color-*) %, transparent)` + `backdrop-filter: blur()`
- TypeScript strict mode
- Toda interacción debe respetar `prefers-reduced-motion`
- Contenido en español, tono personal y cercano
