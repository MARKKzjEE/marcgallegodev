import type { Translations } from './es';

export const en: Translations = {
	// ── Meta / SEO ──
	meta: {
		siteName: "Marc Gallego",
		defaultTitle: "Marc Gallego | Full Stack Software Engineer in Barcelona",
		defaultDescription: "Portfolio of Marc Gallego, Software Engineer and Full Stack freelance developer in Barcelona. Web development, mobile apps and custom digital solutions.",
		jobTitle: "Full Stack Software Engineer",
		ogImageAlt: "Marc Gallego — Full Stack Software Engineer in Barcelona",
		indexTitle: "Marc Gallego | Full Stack Software Engineer in Barcelona",
		indexDescription: "Portfolio of Marc Gallego, Software Engineer and Full Stack freelance developer in Barcelona. Web development, mobile apps and custom digital solutions.",
		experienceTitle: "Experience | Marc Gallego — Full Stack Developer",
		experienceDescription: "Professional background of Marc Gallego: 5+ years as a Full Stack Software Engineer in Barcelona. Laravel, Django, React, Angular, DevOps and mobile apps.",
		projectsTitle: "Projects | Marc Gallego — Web development and custom apps",
		projectsDescription: "Project portfolio of Marc Gallego: web platforms, SaaS, mobile apps and custom digital solutions. Built with Laravel, React, Django and more in Barcelona.",
		contactTitle: "Contact | Marc Gallego — Freelance developer in Barcelona",
		contactDescription: "Have a project in mind? Get in touch with Marc Gallego, Full Stack freelance developer in Barcelona. Web development, mobile apps and custom digital solutions.",
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
			since: "since 2019",
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
		footMeta: "STACK / {count} tools · since 2019",
		footNote: "See my experience",
	},

	// ── About (editorial section: big name + overlapping photo) ──
	aboutCover: {
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
		studioText1: "I work side by side with Doko: sometimes I lend a hand on something specific, and other times we dive into bigger projects together.",
		studioText2: "If your project needs more hands, no problem: together we cover every phase with specialized people. And if needed, we jump in as part of your team.",
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
			// Catalog placeholder cells (decorative)
			placeholders: [
				{ type: "In progress", tagline: "Something new in the works." },
				{ type: "Coming soon", tagline: "Reserved for what's next." },
			],
		},
		// NOTE: `description` feeds the image alt text (home collage + catalog).
		// `type` and `tagline` feed the catalog sheet (/en/projects).
		// → Placeholders: REVIEW (project type, short catalog line).
		items: [
			{
				title: 'PlanIT',
				description: 'My side project that evolved into a startup connecting people around any kind of plan or activity.',
				type: 'Startup · Social app',
				tagline: 'Connecting people through plans.',
			},
			{
				title: 'Loyic',
				description: 'Internal employee portal: time tracking, document uploads, charts and reports of the company\'s internal data.',
				type: 'Internal portal',
				tagline: 'Employee portal',
			},
			{
				title: 'Lateua',
				description: 'SaaS with marketplace for product management and AI-powered interior design solutions.',
				type: 'SaaS · Marketplace',
				tagline: 'AI-powered interior design marketplace.',
			},
			{
				title: 'Cor de suro',
				description: 'Website that integrates a visual narrative highlighting craftsmanship, community strength and commitment to sustainability.',
				type: 'Web · Visual narrative',
				tagline: 'Immersive site about craft and sustainability.',
			},
			{
				title: 'Viviq',
				description: 'Real estate platform with a CMS adaptable to each client.',
				type: 'Web platform',
				tagline: 'Adaptable real-estate CMS per client.',
			},
			{
				title: 'RTTH',
				description: 'Brand territory built through a service that transforms sound waves from audio files into design assets with integrated waveforms.',
				type: 'Branding · Tool',
				tagline: 'From sound waves to design assets.',
			},
			{
				title: 'PilloSitio',
				description: 'App and web platform for bars and restaurants with services for businesses and customers.',
				type: 'App + Web platform',
				tagline: 'App for bars, restaurants and guests.',
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
		summary: "I've been building websites and apps for over 5 years, and I've been lucky to go through incredible projects and teams that helped me grow, both professionally and personally. Now I'm putting all of that into my own brand, as a freelancer.",
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
