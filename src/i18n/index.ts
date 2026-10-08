import { es } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';

const languages: Record<Lang, typeof es> = { es, en };

export function getLang(url: URL): Lang {
	return url.pathname.startsWith('/en') ? 'en' : 'es';
}

export function useTranslations(lang: Lang) {
	return languages[lang];
}

// Mapa de slugs: clave EN → valor ES
const slugMap: Record<string, string> = {
	'/experience': '/experiencia',
	'/projects': '/proyectos',
	'/contact': '/contacto',
};

// Mapa inverso: clave ES → valor EN
const slugMapReverse: Record<string, string> = Object.fromEntries(
	Object.entries(slugMap).map(([en, es]) => [es, en])
);

/** Las URLs canónicas del sitio acaban siempre en "/" (igual que el sitemap) */
export function withSlash(path: string): string {
	return path.endsWith('/') ? path : `${path}/`;
}

export function getLocalePath(lang: Lang, path: string): string {
	if (lang === 'en') return withSlash(`/en${path === '/' ? '' : path}`);
	return withSlash(slugMap[path] || path);
}

/** Traduce una URL del idioma actual al otro idioma (acepta rutas con o sin "/" final) */
export function getAlternatePath(currentPath: string): { esHref: string; enHref: string } {
	const path = currentPath.replace(/\/$/, '') || '/';
	if (path.startsWith('/en')) {
		// Estamos en EN → calcular ES
		const enSlug = path.replace(/^\/en/, '') || '/';
		const esHref = slugMap[enSlug] || enSlug;
		return { esHref: withSlash(esHref), enHref: withSlash(path) };
	}
	// Estamos en ES → calcular EN
	const enSlug = slugMapReverse[path] || path;
	return { esHref: withSlash(path), enHref: withSlash(`/en${enSlug === '/' ? '' : enSlug}`) };
}
