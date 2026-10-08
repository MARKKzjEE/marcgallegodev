# marcgallego.com

Portfolio personal de Marc Gallego, Ingeniero de Software Full Stack en Barcelona.

Web estática multi-página con Astro 5, Tailwind CSS v4 y TypeScript vanilla. Versión en español (por defecto, sin prefijo) e inglés (`/en/`). Desplegada en Vercel.

## Comandos

```sh
pnpm install   # instalar dependencias
pnpm dev       # servidor de desarrollo en localhost:4321
pnpm build     # build de producción en ./dist/
pnpm preview   # previsualizar el build
```

## Estructura

```text
src/
├── pages/       # rutas: /, /experiencia, /proyectos, /contacto, /404 y /en/*
├── layouts/     # Layout.astro: <head>, SEO, JSON-LD, tema pre-paint, splash
├── sections/    # secciones a ancho completo (Header, Hero, Footer…)
├── scripts/     # scripts de cliente compartidos (circle reveal, gradient UnicornStudio)
├── i18n/        # textos es.ts / en.ts y helpers de URLs
├── data/        # imágenes de proyectos
├── utils/       # helpers pequeños compartidos
└── styles/      # config de Tailwind v4 y tokens de diseño (tailwind.css)
public/          # fuentes, iconos, imagen OG, CVs en PDF, escenas de UnicornStudio
cv/              # fuentes LaTeX de los CVs de public/cv/
```

Todas las URLs canónicas acaban en `/`; `vercel.json` redirige las versiones sin barra.
