import { es } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';

export const languages: Record<Lang, typeof es> = { es, en };

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

export function getLocalePath(lang: Lang, path: string): string {
	if (lang === 'en') return `/en${path === '/' ? '' : path}`;
	return slugMap[path] || path;
}

/** Traduce una URL del idioma actual al otro idioma */
export function getAlternatePath(currentPath: string): { esHref: string; enHref: string } {
	if (currentPath.startsWith('/en')) {
		// Estamos en EN → calcular ES
		const enSlug = currentPath.replace(/^\/en/, '') || '/';
		const esHref = slugMap[enSlug] || enSlug;
		return { esHref, enHref: currentPath };
	}
	// Estamos en ES → calcular EN
	const enSlug = slugMapReverse[currentPath] || currentPath;
	const enHref = `/en${enSlug === '/' ? '' : enSlug}`;
	return { esHref: currentPath, enHref };
}
