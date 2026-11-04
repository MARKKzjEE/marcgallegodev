export interface Tech {
	name: string;
	slug: string;
	cat: 'frontend' | 'backend' | 'otros';
}

// Iconos en /public/tech-icons/ con convención {slug}-d.svg (claro) y {slug}-l.svg (oscuro).
export const TECHS: Tech[] = [
	// Frontend
	{ name: "JavaScript", slug: "js",           cat: "frontend" },
	{ name: "TypeScript", slug: "typescript",   cat: "frontend" },
	{ name: "React",      slug: "react",        cat: "frontend" },
	{ name: "Angular",    slug: "angular",      cat: "frontend" },
	{ name: "HTML",       slug: "html5",        cat: "frontend" },
	{ name: "CSS",        slug: "css3",         cat: "frontend" },
	{ name: "Tailwind",   slug: "tailwindcss",  cat: "frontend" },
	{ name: "Astro",      slug: "astro",        cat: "frontend" },
	// Backend
	{ name: "Laravel",    slug: "laravel",      cat: "backend" },
	{ name: "Django",     slug: "django",       cat: "backend" },
	{ name: "PHP",        slug: "php",          cat: "backend" },
	{ name: "Python",     slug: "python",       cat: "backend" },
	// Otros (BBDD, contenedores, CI/CD en repos Git, SEO)
	{ name: "PostgreSQL", slug: "postgresql",   cat: "otros" },
	{ name: "MySQL",      slug: "mysql",        cat: "otros" },
	{ name: "Docker",     slug: "docker",       cat: "otros" },
	{ name: "CI/CD",      slug: "git",          cat: "otros" },
	{ name: "SEO",        slug: "google",       cat: "otros" },
];
