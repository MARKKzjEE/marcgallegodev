// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Pares de URLs equivalentes ES ↔ EN
const alternates = [
  ['/', '/en/'],
  ['/experiencia/', '/en/experience/'],
  ['/proyectos/', '/en/projects/'],
  ['/contacto/', '/en/contact/'],
];

const BASE = 'https://marcgallego.com';

/** @param {string} loc */
function buildLinks(loc) {
  const path = loc.replace(BASE, '');
  const pair = alternates.find(([es, en]) => path === es || path === en);
  if (!pair) return undefined;
  return [
    { lang: 'es',        url: `${BASE}${pair[0]}` },
    { lang: 'en',        url: `${BASE}${pair[1]}` },
    { lang: 'x-default', url: `${BASE}${pair[0]}` },
  ];
}

// https://astro.build/config
export default defineConfig({
  site: BASE,
  integrations: [sitemap({
    serialize(item) {
      const links = buildLinks(item.url);
      if (links) item.links = links;
      return item;
    },
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});