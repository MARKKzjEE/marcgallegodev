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

export function getLocalePath(lang: Lang, path: string): string {
	if (lang === 'en') return `/en${path === '/' ? '' : path}`;
	return path;
}
