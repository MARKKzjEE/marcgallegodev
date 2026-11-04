import type { Translations } from './es';

export const en: Translations = {
	// ── Meta / SEO ──
	meta: {
		siteName: "Marc Gallego",
		defaultTitle: "Marc Gallego | Full Stack Software Engineer in Barcelona",
		defaultDescription: "I'm Marc Gallego, a freelance Full Stack developer in Barcelona. Bring me an idea and we'll turn it into a website, an app or whatever software it needs.",
		jobTitle: "Full Stack Software Engineer",
		ogImageAlt: "Marc Gallego — Full Stack Software Engineer in Barcelona",
		indexTitle: "Marc Gallego | Full Stack Software Engineer in Barcelona",
		indexDescription: "I'm Marc Gallego, a freelance Full Stack developer in Barcelona. Bring me an idea and we'll turn it into a website, an app or whatever software it needs.",
		experienceTitle: "Experience | Marc Gallego — Full Stack Developer",
		experienceDescription: "Marc Gallego's journey as a Full Stack software engineer in Barcelona. 5+ years with Laravel, Django, React, Angular, AI and mobile apps.",
		projectsTitle: "Projects | Marc Gallego — Web development and custom apps",
		projectsDescription: "Startups, SaaS, web platforms and custom apps. Projects by Marc Gallego, freelance developer in Barcelona, from idea to production.",
		contactTitle: "Contact | Marc Gallego — Freelance developer in Barcelona",
		contactDescription: "Got a project in mind? Tell me about it and we'll talk it through. Marc Gallego, freelance Full Stack developer in Barcelona.",
	},

	// ── Header / Nav ──
	header: {
		experience: "Experience",
		projects: "Projects",
		contact: "Contact",
		mobileMenuOpen: "Open menu",
		mobileMenuClose: "Close menu",
		home: "Home",
		mainNav: "Main navigation",
		mobileNav: "Mobile navigation",
		toggleTheme: "Dark mode",
		linkedinCta: "Let's talk on LinkedIn",
		available: "Available for projects",
		availableShort: "Available",
	},

	// ── Hero ──
	hero: {
		sectionAriaLabel: "Marc Gallego introduction",
		// Top band: repeated across the width with "/" separators
		role: "Full Stack Software Engineer",
		stats: {
			years: "+5 years exp.",
			projects: "+60 projects",
			since: "since 2018",
			location: "Barcelona",
		},
	},

	// ── WhatIDo ──
	whatIDo: {
		label: "What I do",
		text: "You bring me an idea and we turn it into something real, whether it's a website, an app or whatever it takes. I build it with an engineer's brain and a stylist's eye, and yes, both come as standard. It's solid on the inside and good-looking on the outside, so all you have to worry about is showing it off.",
	},

	// ── TechStack ──
	techStack: {
		heading: "Stack",
		filters: {
			all: "All",
			frontend: "Frontend",
			backend: "Backend",
			otros: "Other",
		},
		// Section foot (below the carousel). {count} = number of technologies.
		// footMeta only on tablet/desktop; hidden on mobile.
		footMeta: "STACK / {count} tools · since 2018",
		footNote: "See my experience",
	},

	// ── About (editorial section: big name + overlapping photo) ──
	aboutCover: {
		// Section heading for search engines and screen readers (the visible one is the staggered name)
		heading: "About Marc Gallego Gines, Full Stack developer in Barcelona",
		profileAlt: "Marc Gallego, Full Stack developer in Barcelona",
		location: "Barcelona",
		ageLabel: "{age} years",   // {age} computed in the component
		roleTop: "Fullstack",
		firstName: "Marc",
		lastName: "Gallego",
		secondLastName: "Gines",
		roleBottom: "Developer",
		photoCredit: "By m",
		// Summary paragraphs (each on its own line, separated by space).
		summary: [
			"What's on my CV you already know, computer engineer and in love with creating things on a computer.",
			"What it doesn't show is where the rest comes from. Fashion sharpens my eye for colors, shapes and details. And the sea is my reset button, where I switch off and come back with my ideas in place.",
		],
	},


	// ── Partners ──
	partners: {
		// Metadata in [ brackets ] (corners + center)
		metaName: "Doko Studio",
		metaCenter: "Partners",
		metaSince: "since 2024",
		// Large statement (font-nord). " / " separates the fragments shown on lines.
		statement: "Creative studio / Web development / Design & / Branding / born in Valencia.",
		dokoImgAlt: "Doko Studio — web design and development studio",
		// Link under the bio, to Doko's site
		dokoVisit: "Visit the site",
		dokoLinkLabel: "Doko Studio: visit the site (opens in a new tab)",
		studioText1: "Doko is my ace up the sleeve. We've been working side by side since 2024, sometimes lending a hand on something specific and other times diving into big projects together.",
		studioText2: "If your project needs more hands, we show up as a full design and development team.",
	},

	// ── FAQ ──
	faq: {
		heading: "Frequently asked questions",
		signature: "* marc, somewhere in a café in barcelona",
		items: [
			{
				question: "What kind of projects do you work on?",
				answer: "Pretty much any. I love taking a business idea that's barely off the ground and seeing it through until it's a real website or app.",
			},
			{
				question: "What can you do for me?",
				answer: "Get your project going from scratch or from whatever you already have. And if you already have a website or an app, give it a fresh spin: redesign, improvements or maintenance.",
			},
			{
				question: "How do you work?",
				answer: "First things first, a meeting (with coffee, ideally) to really understand what you need and what the actual problem is. Once that's clear, I get to work and keep you posted on how everything's going. No surprises.",
			},
			{
				question: "Do you work alone or with a team?",
				answer: "I'm independent, but not alone: I work hand in hand with Doko Studio. If you need design, branding or any other profile, we bring them on board and we're good to go.",
			},
			{
				question: "How much does a project with you cost?",
				answer: "It depends, and I'm not dodging the question: every project is its own world. Tell me what you need and we'll find a price that works for both of us.",
			},
		],
	},

	// ── Projects ──
	projects: {
		// Unified projects title (home + catalog /projects)
		title: "Projects",
		// Results block header (home gallery)
		resultsLabel: "results",
		// Home gallery CTA towards the full catalog
		moreResults: "more results",
		grid: {
			// Catalog foot. {range} is replaced by the real numbering (e.g. 031–039).
			foot: "CAT. No. {range} · EDITION 01",
			// Each project's status in its card: live site → link; no site → archived.
			visit: "Visit site",
			visitLabel: "{title}: visit the site (opens in a new tab)",
			archived: "Archived",
			// Catalog placeholder cells (decorative)
			placeholders: [
				{ type: "In progress", tagline: "Something new in the works." },
				{ type: "Coming soon", tagline: "Reserved for what's next." },
			],
		},
		// `type` and `description` are the catalog sheet (/en/projects);
		// `description` is also the image alt text (home + catalog).
		items: [
			{
				title: 'PlanIT',
				description: 'My startup and my first venture. An app to connect with people through plans, which fell by the wayside when COVID hit.',
				type: 'Startup · Social app',
			},
			{
				title: 'Loyic',
				description: 'The company\'s entire employee portal, built from scratch. Time tracking, documents, payslips and much more.',
				type: 'Internal portal',
			},
			{
				title: 'Lateua',
				description: 'A very promising project that created interior design proposals with AI. I worked on the models, the integrations and the 3D.',
				type: 'SaaS · Marketplace',
			},
			{
				title: 'Cor de suro',
				description: 'A truly immersive site that champions a sustainable, handcrafted product.',
				type: 'Web · Visual narrative',
			},
			{
				title: 'Viviq',
				description: 'Custom websites for real estate agencies, each with its own built-in CMS.',
				type: 'Web platform',
			},
			{
				title: 'RTTH',
				description: 'Turns the sound waves of a recording into branding and design assets.',
				type: 'Branding · Tool',
			},
			{
				title: 'PilloSitio',
				description: 'My biggest project to date. Payments, tables, orders, delivery and much more, all in one place.',
				type: 'App + Web platform',
			},
			{
				title: 'Trama World',
				description: 'Built on the idea that “everything fits in a QR”, Trama World digitises any event to cut queues, add gamification and measure everything that happens.',
				type: 'SaaS · Events & venues',
			},
		],
	},

	// ── Contact ──
	contact: {
		title: "Let's talk",
		namePlaceholder: "Name",
		emailPlaceholder: "Email",
		messagePlaceholder: "Message",
		submitLabel: "Send",
		successMessage: "✓ Got it! I'll write back in no time.",
		errorMessage: "Oops, something went wrong. Try again or write to me directly.",
	},

	// ── Footer ──
	footer: {
		headline: "Shall we team up?",
		headlineReveal: "Shall we team up?",
		copyright: "All rights reserved.",
		scrollTop: "Back to top",
		linkedinLabel: "LinkedIn",
		navExperience: "Experience",
		navProjects: "Projects",
		navContact: "Contact",
		navLabel: "Footer navigation",
	},

	// ── Experience page ──
	experience: {
		pageTitle: "My professional journey",
		downloadLabel: "Download PDF",
		downloadAriaLabel: "Download PDF of my CV",
		cvFile: "/cv/CV_MarcGallego_en.pdf",
		sections: {
			summary: "Summary",
			experience: "Experience",
			education: "Education",
			languages: "Languages",
			extracurricular: "Extracurricular",
		},
		summary: "I started as a junior lending a hand on projects for brands like Coca-Cola and Bimbo, launched my own startup, ended up leading a team and dove headfirst into building AI, with models that detect colors and shapes, generate images or chat with users. More than 5 years later, everything I've picked up along the way goes into my own brand, as a freelancer.",
		jobs: [
			{
				company: "Doko Studio",
				role: "Software Engineer",
				period: "Jul 2024 — Present",
				location: "Barcelona, Spain",
				tags: ["Laravel", "Django", "Angular", "REST API", "CI/CD", "DEVOPS", "Figma"],
				bullets: [
					"Participation in multiple projects using technologies such as Laravel, Django, React, Angular.",
					"Design and development of modular APIs with documentation generated through Swagger.",
					"Implementation of CI/CD pipelines and production workflows with GitLab CI, enabling deployments across different client environments.",
					"Domain management and server administration.",
					"Experience implementing both integrated and standalone payment gateways.",
					"Publishing mobile apps on the Play Store and App Store.",
					"Collaboration with designers in Figma for the creation of responsive and usable web interfaces.",
				"Web performance optimisation.",
				],
				logoAlt: "Doko Studio logo, web design and development studio",
			},
			{
				company: "Lateua",
				role: "Full Stack Developer",
				period: "May 2023 — Feb 2024",
				location: "Barcelona, Spain",
				tags: ["React", "Django", "Python", "WordPress", "AI", "PHP"],
				bullets: [
					"Migration of the legacy WordPress platform to a new scalable solution with React and Django.",
					"Design and implementation of microservices to decouple functionalities and improve performance.",
					"Development of cross-platform data migration scripts with Python.",
					"Creation of AI-based processes for color detection, shapes and image generation.",
					"Development of a conversational AI model to assist users in generating results.",
				],
				logoAlt: "Lateua logo",
			},
			{
				company: "Loyic",
				role: "Full Stack Lead Developer",
				period: "Mar 2023 — Mar 2024",
				location: "Barcelona, Spain",
				tags: ["HTML", "CSS", "Javascript", "SQL", "BI"],
				bullets: [
					"Development and maintenance of internal HR management software: time tracking, payroll, reports and documentation.",
					"Leadership of a development team, coordinating tasks and deliveries of new features and fixes.",
					"Supervision of web development projects and internal database administration.",
					"Building solutions on the Dutch platform Exact Synergy, customising it according to business needs.",
					"Collaboration with consultants and stakeholders to align development with business requirements.",
				],
				logoAlt: "Loyic logo, business management software company",
			},
			{
				company: "Social Labs",
				role: "Junior Developer",
				period: "Jan 2019 — Aug 2019",
				location: "Barcelona, Spain",
				tags: ["Frontend", "Backend", "Cordova"],
				bullets: [
					"Support in the development of multiple web projects for clients such as Bimbo, Coca-Cola and Ferromex.",
					"Collaboration with different teams to implement features, fixes and maintenance tasks.",
					"Hands-on experience working with large-scale clients and adapting to different project requirements.",
					"Support in front-end and back-end tasks, strengthening my overall web development skills.",
				],
				logoAlt: "Social Labs logo, digital development agency",
			},
		],
		education: [
			{
				title: "BSc in Computer Science",
				subtitle: "Specialisation in Software Development and Project Management",
				period: "2015 — 2020",
				location: "Barcelona, Spain",
				logoAlt: "UAB logo - Universitat Autònoma de Barcelona",
			},
		],
		languages: ["English — B2", "Spanish — C2 (Native)", "Catalan — C2 (Native)"],
		extracurricular: [
			{
				company: "Planit",
				role: "Founder & Full Stack Developer",
				period: "2020",
				location: "Barcelona, Spain",
				bullets: [
					"Creation of a mobile and web application that, after validating the idea with real users, evolved into an early-stage startup oriented towards attracting investment.",
					"Development of the platform in React, allowing users to propose plans and connect with others.",
					"Full management of the product cycle: idea validation, design, development and private launch for investors.",
					"Definition of workflows and pitch strategies oriented towards attracting investment.",
					"The project reached the pre-investment stage but was paused due to the COVID-19 pandemic.",
				],
				logoAlt: "Planit logo, social app to connect people through plans",
			},
		],
	},

	// ── 404 ──
	notFound: {
		title: "404 — Marc Gallego",
		description: "Page not found. Go back to the home page of Marc Gallego's portfolio.",
		heading: "Nothing to see here",
		backHome: "← Back to home",
	},

	// ── Breadcrumbs ──
	breadcrumbs: {
		home: "Home",
		experience: "Experience",
		projects: "Projects",
		contact: "Contact",
	},
};
