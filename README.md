<p align="center">
  <a href="https://marcgallego.com">
    <img src="public/assets/og-image.jpg" alt="Marc Gallego — Ingeniero de Software Full Stack" width="720">
  </a>
</p>

<h1 align="center">marcgallego.com</h1>

<p align="center">
  Portfolio de <strong>Marc Gallego</strong>, ingeniero de software full stack en Barcelona.
</p>

<p align="center">
  <a href="https://marcgallego.com"><strong>Ver la web →</strong></a>
</p>

<p align="center">
  <img alt="Astro 5" src="https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white">
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white">
</p>

---

## Qué hay

| Página | Qué cuenta |
|---|---|
| **Inicio** | Quién soy, el stack con el que trabajo y mi colaboración con Doko Studio |
| **Experiencia** | Más de 5 años de trayectoria: Laravel, Django, React, Angular, DevOps y apps móviles, con el CV para descargar en español e inglés |
| **Proyectos** | Una selección de trabajos: PlanIT, Lateua, Viviq, RTTH, PilloSitio y más |
| **Contacto** | Cómo trabajar conmigo en un proyecto web, una app o una solución a medida |

## Cómo está hecha

- **Estática y multipágina** con Astro 5, sin framework de cliente: TypeScript
  sin dependencias para lo que se mueve.
- **Bilingüe**: español por defecto, sin prefijo, e inglés en `/en/`, con todos
  los textos en `src/i18n`.
- **Tema claro y oscuro**, aplicado antes de pintar para que no parpadee.
- **Fondos interactivos** con escenas de Unicorn Studio que siguen al ratón, una
  pantalla de entrada y una transición en círculo entre páginas.
- **SEO cuidado**: metadatos y Open Graph por página, JSON-LD de persona y URLs
  canónicas acabadas en `/`.
- **Tailwind CSS v4** configurado solo por CSS, con tokens semánticos con `@theme`.
- **Cabeceras de seguridad** y caché larga para las fuentes, en `vercel.json`.

## Desarrollo

```sh
pnpm install   # dependencias
pnpm dev       # servidor de desarrollo en localhost:4321
pnpm check     # comprobación de tipos (astro check)
pnpm build     # comprobación de tipos y build de producción en ./dist/
pnpm preview   # previsualizar el build
```

## Estructura

```text
src/
├── pages/       # rutas: /, /experiencia, /proyectos, /contacto, /404 y /en/*
├── layouts/     # Layout.astro: <head>, SEO, JSON-LD, tema antes de pintar, pantalla de entrada
├── sections/    # secciones a ancho completo (Header, Hero, Footer…)
├── scripts/     # scripts de cliente compartidos (transición en círculo, degradado de Unicorn Studio)
├── i18n/        # textos es.ts y en.ts, y helpers de URLs
├── data/        # imágenes de proyectos
├── utils/       # helpers pequeños compartidos
└── styles/      # Tailwind v4 y tokens de diseño (tailwind.css)
public/          # fuentes, iconos, imagen OG, CV en PDF, escenas de Unicorn Studio
cv/              # el CV en LaTeX, origen de los PDF de public/cv/
```

Se despliega en Vercel con cada push a `main`. Todas las URLs canónicas
acaban en `/`, y `vercel.json` redirige las que llegan sin barra.

---

<p align="center">
  <a href="https://marcgallego.com">marcgallego.com</a> ·
  <a href="https://www.linkedin.com/in/marcgallegodev/">LinkedIn</a> ·
  <a href="https://www.instagram.com/markgallego/">Instagram</a>
</p>
