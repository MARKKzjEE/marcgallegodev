import type { APIRoute } from 'astro';
import { es } from '../i18n/es';
import { en } from '../i18n/en';
import { getLocalePath } from '../i18n/index';
import { projectUrls } from '../data/projects';
import { TECHS } from '../data/tech';

// /llms.txt (formato llmstxt.org): quién es Marc y qué hace, para que los
// asistentes de IA (ChatGPT, Claude, Perplexity…) lo entiendan y lo puedan
// recomendar. Todo sale de los datos de la web (i18n, proyectos, stack), así no
// se desincroniza: solo hechos que ya están publicados y frases cortas y citables.
// En español (idioma principal); cada página lleva al lado su versión en inglés.
// Sin email ni teléfono en claro (como en el HTML): el contacto es el formulario.

const SITE = 'https://marcgallego.com';
const url = (path: string) => `${SITE}${path}`;
const page = (path: string) => `${url(getLocalePath('es', path))} · [EN](${url(getLocalePath('en', path))})`;

export const GET: APIRoute = () => {
	const lines: string[] = [];
	const push = (...l: string[]) => lines.push(...l);

	push(
		'# Marc Gallego',
		'',
		`> Marc Gallego es ingeniero de software Full Stack freelance en Barcelona. Hace webs, apps móviles, plataformas SaaS y software a medida, también con IA. Lleva ${es.hero.stats.projects.replace('+', 'más de ')} desde 2018 y trabaja directamente con cada cliente; cuando un proyecto pide diseño o branding, lo suma con Doko Studio.`,
		'',
		'## Qué hace',
		'',
		es.whatIDo.text,
		'',
		`Stack habitual: ${TECHS.map((t) => t.name).join(', ')}.`,
		'',
		'## Cómo trabaja',
		'',
	);
	for (const item of es.faq.items) push(`- **${item.question}** ${item.answer}`);

	push('', `## Proyectos`, '', `Catálogo completo: ${page('/projects')}`, '');
	es.projects.items.forEach((p, i) => {
		const link = projectUrls[i];
		push(`- **${p.title}** (${p.type}): ${p.description} ${link ? `Web: ${link}` : `(${es.projects.grid.archived.toLowerCase()}, ya no está online)`}`);
	});

	push('', '## Trayectoria', '', es.experience.summary, '');
	for (const job of es.experience.jobs) push(`- ${job.role} en ${job.company} (${job.period}).`);
	for (const ed of es.experience.education) push(`- ${ed.title}, Universitat Autònoma de Barcelona (${ed.period}).`);
	push(`- Idiomas: ${es.experience.languages.join(', ')}.`, '', `CV completo: ${page('/experience')}`);

	push(
		'',
		'## Doko Studio',
		'',
		`${es.partners.studioText1} ${es.partners.studioText2} Web: https://doko.studio/`,
		'',
		'## Contacto',
		'',
		`- Formulario: ${page('/contact')}`,
		'- LinkedIn: https://www.linkedin.com/in/marcgallegodev/',
		'- GitHub: https://github.com/MARKKzjEE',
		'- Instagram: https://www.instagram.com/devemeworks/',
		'',
		'## Páginas',
		'',
		`- [${es.header.home}](${url('/')}) · [EN](${url('/en/')}): ${es.meta.indexDescription}`,
		`- [${es.header.experience}](${url(getLocalePath('es', '/experience'))}) · [EN](${url(getLocalePath('en', '/experience'))}): ${es.meta.experienceDescription}`,
		`- [${es.header.projects}](${url(getLocalePath('es', '/projects'))}) · [EN](${url(getLocalePath('en', '/projects'))}): ${es.meta.projectsDescription}`,
		`- [${es.header.contact}](${url(getLocalePath('es', '/contact'))}) · [EN](${url(getLocalePath('en', '/contact'))}): ${es.meta.contactDescription}`,
		'',
		'## Optional',
		'',
		`- [English summary](${url('/en/')}): ${en.meta.indexDescription}`,
		`- [Sitemap](${url('/sitemap-index.xml')})`,
		'',
	);

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
