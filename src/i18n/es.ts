export const es = {
	// ── Meta / SEO ──
	meta: {
		siteName: "Marc Gallego",
		defaultTitle: "Marc Gallego | Ingeniero de Software Full Stack en Barcelona",
		defaultDescription: "Portfolio de Marc Gallego, Ingeniero del Software y desarrollador Full Stack freelance en Barcelona. Desarrollo web, apps móviles y soluciones a medida.",
		jobTitle: "Ingeniero de Software Full Stack",
		ogImageAlt: "Marc Gallego — Ingeniero de Software Full Stack en Barcelona",
		indexTitle: "Marc Gallego | Ingeniero de Software Full Stack en Barcelona",
		indexDescription: "Portfolio de Marc Gallego, Ingeniero del Software y desarrollador Full Stack freelance en Barcelona. Desarrollo web, apps móviles y soluciones a medida.",
		experienceTitle: "Experiencia | Marc Gallego — Desarrollador Full Stack",
		experienceDescription: "Trayectoria profesional de Marc Gallego: +5 años como ingeniero de software Full Stack en Barcelona. Laravel, Django, React, Angular, DevOps y apps móviles.",
		projectsTitle: "Proyectos | Marc Gallego — Desarrollo web y apps a medida",
		projectsDescription: "Proyectos de Marc Gallego: plataformas web, SaaS, apps móviles y soluciones a medida. Desarrollados con Laravel, React, Django y más en Barcelona.",
		contactTitle: "Contacto | Marc Gallego — Desarrollador freelance Barcelona",
		contactDescription: "¿Tienes un proyecto en mente? Contacta con Marc Gallego, desarrollador Full Stack freelance en Barcelona. Desarrollo web, apps móviles y soluciones a medida.",
	},

	// ── Header / Nav ──
	header: {
		experience: "Experiencia",
		projects: "Proyectos",
		contact: "Contacto",
		mobileMenuOpen: "Abrir menú",
		mobileMenuClose: "Cerrar menú",
		home: "Inicio",
		mainNav: "Navegación principal",
		mobileNav: "Navegación móvil",
		toggleTheme: "Modo oscuro",
		linkedinCta: "Hablemos por LinkedIn",
		available: "Disponible para proyectos",
		availableShort: "Disponible",
	},

	// ── Hero ──
	hero: {
		sectionAriaLabel: "Presentación de Marc Gallego",
		// Banda superior: se repite a lo ancho con separadores "/"
		role: "Full Stack Software Engineer",
		stats: {
			years: "+5 años exp.",
			projects: "+60 proyectos",
			since: "desde 2019",
			location: "Barcelona",
		},
	},

	// ── WhatIDo ──
	whatIDo: {
		label: "Qué es lo que hago",
		text: "Me traes una idea y la convertimos en algo real, ya sea una web, una app o lo que haga falta. Lo hago con cabeza de ingeniero y con gusto, y lo digo en los dos sentidos. Sale sólido por dentro y bonito por fuera, así que tú solo tienes que preocuparte de estrenarlo.",
	},

	// ── TechStack ──
	techStack: {
		heading: "Tecnologías",
		filters: {
			all: "Todos",
			frontend: "Frontend",
			backend: "Backend",
			otros: "Otros",
		},
		// Pie de la sección (bajo el carrusel). {count} = nº de tecnologías.
		// footMeta solo en tablet/desktop; en móvil se oculta.
		footMeta: "STACK / {count} herramientas · desde 2019",
		footNote: "Ver mi trayectoria",
	},

	// ── About (sección editorial: nombre grande + foto superpuesta) ──
	aboutCover: {
		profileAlt: "Marc Gallego, desarrollador Full Stack en Barcelona",
		location: "Barcelona",
		ageLabel: "{age} años",   // {age} se calcula en el componente
		roleTop: "Fullstack",
		firstName: "Marc",
		lastName: "Gallego",
		secondLastName: "Gines",
		roleBottom: "Developer",
		photoCredit: "By m",
		// Párrafos del resumen (cada uno en su línea, separados por aire).
		summary: [
			"Lo que sale en el CV ya lo sabes, ingeniero informático y enamorado de crear cosas con un ordenador.",
			"Lo que no sale es de dónde viene el resto. La moda me afina el ojo para los colores, las formas y los detalles. Y el mar es mi botón de reinicio, donde desconecto y vuelvo con las ideas en su sitio.",
		],
	},


	// ── Partners ──
	partners: {
		// Metadatos en [ corchetes ] (esquinas + centro)
		metaName: "Doko Studio",
		metaCenter: "Colaboraciones",
		metaSince: "desde 2024",
		// Statement grande (font-nord). El " / " separa los fragmentos que van en líneas.
		statement: "Estudio creativo / Desarrollo web / Diseño & / Branding / nacido en Valencia.",
		dokoImgAlt: "Doko Studio — estudio de branding, diseño y desarrollo",
		studioText1: "Doko es mi as en la manga. Desde 2024 trabajamos codo con codo, a veces echando una mano puntual y otras metidos juntos en proyectos grandes.",
		studioText2: "Si tu proyecto pide más manos, lo saco y aparece un equipo entero de diseño, branding y desarrollo. Y si lo prefieres, nos sentamos dentro de tu equipo como si fuéramos de la casa.",
	},

	// ── FAQ ──
	faq: {
		heading: "Preguntas frecuentes",
		signature: "* marc, en algún café de barcelona",
		items: [
			{
				question: "¿Con qué tipo de proyectos trabajas?",
				answer: "Con casi cualquiera. Me encanta coger una idea de negocio que está en pañales y acompañarla hasta que es una web o una app de verdad.",
			},
			{
				question: "¿Qué puedes hacer por mí?",
				answer: "Arrancar tu proyecto desde cero o desde lo que ya tengas. Y si ya tienes una web o una app, darle una vuelta: rediseño, mejoras o mantenimiento.",
			},
			{
				question: "¿Cómo trabajas?",
				answer: "Lo primero, una reunión (con café, si puede ser) para entender bien qué necesitas y cuál es el problema de verdad. Con eso claro, me pongo manos a la obra y te voy contando cómo avanza todo. Sin sorpresas.",
			},
			{
				question: "¿Trabajas solo o con equipo?",
				answer: "Voy por libre, pero no estoy solo: trabajo mano a mano con Doko Studio. Si hace falta diseño, branding u otro perfil, lo sumamos al proyecto y listo.",
			},
			{
				question: "¿Cuánto cuesta un proyecto contigo?",
				answer: "Depende, y no es por escaquearme: cada proyecto es un mundo. Cuéntame qué necesitas y buscamos juntos un precio que nos encaje a los dos.",
			},
		],
	},

	// ── Projects ──
	projects: {
		// Título único de proyectos (home + catálogo /proyectos)
		title: "Proyectos",
		// Cabecera del bloque de resultados (galería home)
		resultsLabel: "resultados",
		// CTA de la galería de la home hacia el catálogo completo
		moreResults: "más resultados",
		grid: {
			// Pie del catálogo. {range} se sustituye por la numeración real (ej. 031–039).
			foot: "CAT. No. {range} · EDICIÓN 01",
			// Celdas placeholder del catálogo (decorativas)
			placeholders: [
				{ type: "En desarrollo", tagline: "Algo nuevo cociéndose." },
				{ type: "Próximamente", tagline: "Reservado para el próximo." },
			],
		},
		// NOTA: `description` alimenta el alt de las imágenes (collage home + catálogo).
		// `type` y `tagline` alimentan la ficha del catálogo (/proyectos).
		// → Placeholders: REVISAR Y CUADRAR (tipo de proyecto y frase corta de catálogo).
		items: [
			{
				title: 'PlanIT',
				description: 'Mi pequeño proyecto que acabó siendo una startup que permitía conectar personas haciendo cualquier tipo de plan o actividad.',
				type: 'Startup · App social',
				tagline: 'Conectar personas a través de planes.',
			},
			{
				title: 'Loyic',
				description: 'Portal interno del empleado: fichaje horario, subida de documentación, gráficos y reportes de datos internos de la empresa.',
				type: 'Portal interno',
				tagline: 'Portal del empleado',
			},
			{
				title: 'Lateua',
				description: 'SaaS con marketplace que permite la gestión de producto para clientes y ofrece soluciones de interiorismo apoyadas con modelos IA.',
				type: 'SaaS · Marketplace',
				tagline: 'Marketplace de interiorismo con IA.',
			},
			{
				title: 'Cor de suro',
				description: 'Web que integra una narrativa visual que pone en valor lo artesanal, la fuerza de la comunidad y el compromiso con la sostenibilidad.',
				type: 'Web · Narrativa visual',
				tagline: 'Web inmersiva sobre lo artesanal y sostenible.',
			},
			{
				title: 'Viviq',
				description: 'Plataforma inmobiliaria con CMS adaptable a cada cliente.',
				type: 'Plataforma web',
				tagline: 'CMS inmobiliario adaptable a cada cliente.',
			},
			{
				title: 'RTTH',
				description: 'Generación del territorio de la marca con un servicio que transforma las ondas de sonido de un archivo a imágenes como recursos de diseño con las ondas integradas.',
				type: 'Branding · Herramienta',
				tagline: 'Del sonido a recursos de diseño.',
			},
			{
				title: 'PilloSitio',
				description: 'App y plataforma web para bares y restaurantes con servicios para negocios y clientes.',
				type: 'App + Plataforma web',
				tagline: 'App para bares, restaurantes y clientes.',
			},
		],
	},

	// ── Contact ──
	contact: {
		title: "Hablemos",
		namePlaceholder: "Nombre",
		emailPlaceholder: "Email",
		messagePlaceholder: "Mensaje",
		submitLabel: "Enviar",
		successMessage: "✓ ¡Recibido! Te escribo en nada.",
		errorMessage: "Vaya, algo ha fallado. Prueba otra vez o escríbeme directamente.",
	},

	// ── Footer ──
	footer: {
		headline: "¿Hacemos algo juntos?",
		headlineReveal: "¿Hacemos algo juntos?",
		copyright: "Todos los derechos reservados.",
		scrollTop: "Quiero volver arriba",
		linkedinLabel: "LinkedIn",
		navExperience: "Experiencia",
		navProjects: "Proyectos",
		navContact: "Contacto",
		navLabel: "Navegación del footer",
	},

	// ── Experience page ──
	experience: {
		pageTitle: "Mi trayectoria profesional",
		downloadLabel: "Descargar PDF",
		downloadAriaLabel: "Descargar PDF del CV",
		cvFile: "/cv/CV_MarcGallego_es.pdf",
		sections: {
			summary: "Resumen",
			experience: "Experiencia",
			education: "Educación",
			languages: "Idiomas",
			extracurricular: "Extracurricular",
		},
		summary: "Empecé como junior echando una mano en proyectos para marcas como Coca-Cola o Bimbo, monté mi propia startup, acabé liderando un equipo y me metí de lleno a desarrollar IA, con modelos que detectan colores y formas, generan imágenes o charlan con los usuarios. Más de 5 años después, todo lo que he aprendido por el camino lo pongo en mi propia marca, como freelance.",
		jobs: [
			{
				company: "Doko Studio",
				role: "Ingeniero de software",
				period: "Jul 2024 — Presente",
				location: "Barcelona, España",
				tags: ["Laravel", "Django", "Angular", "API REST", "CI/CD", "DEVOPS", "Figma"],
				bullets: [
					"Participación en múltiples proyectos utilizando tecnologías como Laravel, Django, React, Angular.",
					"Diseño y desarrollo de APIs modulares con documentación generada mediante Swagger.",
					"Implementación de pipelines CI/CD y flujos de producción con GitLab CI, facilitando despliegues en distintos entornos de cliente.",
					"Gestión de dominios y administración de servidores.",
					"Experiencia implementando pasarelas de pago tanto integradas como independientes.",
					"Publicación de apps móviles en play store y app store.",
					"Colaboración con diseñadores en Figma para la creación de interfaces web responsivas y usables.",
					"Optimización de rendimiento de sitios webs.",
				],
				logoAlt: "Logo Doko Studio, estudio de diseño y desarrollo web",
			},
			{
				company: "Lateua",
				role: "Desarrollador Full Stack",
				period: "May 2023 — Feb 2024",
				location: "Barcelona, España",
				tags: ["React", "Django", "Python", "WordPress", "IA", "PHP"],
				bullets: [
					"Migración de la plataforma heredada en WordPress hacia una nueva solución escalable con React y Django.",
					"Diseño e implementación de microservicios para desacoplar funcionalidades y mejorar el rendimiento.",
					"Desarrollo de scripts de migración de datos multiplataforma con Python.",
					"Creación de procesos basados en IA para detección de colores, formas y generación de imágenes.",
					"Desarrollo de un modelo conversacional de IA para asistir a los usuarios en la generación de resultados.",
				],
				logoAlt: "Logo Lateua",
			},
			{
				company: "Loyic",
				role: "Desarrollador Full Stack Lead",
				period: "Mar 2023 — Mar 2024",
				location: "Barcelona, España",
				tags: ["HTML", "CSS", "Javascript", "SQL", "BI"],
				bullets: [
					"Desarrollo y mantenimiento de software interno para la gestión de RRHH: control horario, nóminas, reportes y documentación.",
					"Liderazgo de un equipo de desarrollo, coordinando tareas y entregas de nuevas funcionalidades y correcciones.",
					"Supervisión de proyectos de desarrollo web y administración de bases de datos internas.",
					"Construcción de soluciones sobre la plataforma holandesa Exact Synergy, personalizándola según necesidades de negocio.",
					"Colaboración con consultores y stakeholders para alinear el desarrollo con los requisitos empresariales.",
				],
				logoAlt: "Logo Loyic, empresa de software de gestión empresarial",
			},
			{
				company: "Social Labs",
				role: "Desarrollador Junior",
				period: "Ene 2019 — Ago 2019",
				location: "Barcelona, España",
				tags: ["Frontend", "Backend", "Cordova"],
				bullets: [
					"Soporte en el desarrollo de múltiples proyectos web para clientes como Bimbo, Coca-Cola y Ferromex.",
					"Colaboración con distintos equipos para implementar funcionalidades, correcciones y tareas de mantenimiento.",
					"Experiencia práctica trabajando con clientes de gran escala y adaptándome a distintos requisitos de proyecto.",
					"Apoyo en tareas de front-end y back-end, fortaleciendo mis habilidades globales en desarrollo web.",
				],
				logoAlt: "Logo Social Labs, agencia de desarrollo digital",
			},
		],
		education: [
			{
				title: "Grado en Ingeniería Informática",
				subtitle: "Especialización en Desarrollo de Software y Gestión de Proyectos",
				period: "2015 — 2020",
				location: "Barcelona, España",
				logoAlt: "Logo UAB - Universitat Autònoma de Barcelona",
			},
		],
		languages: ["Inglés — B2", "Español — C2 (Nativo)", "Catalán — C2 (Nativo)"],
		extracurricular: [
			{
				company: "Planit",
				role: "Fundador & Desarrollador Full Stack",
				period: "2020",
				location: "Barcelona, España",
				bullets: [
					"Creación de una aplicación móvil y web que, tras validar la idea con usuarios reales, evolucionó a una startup en etapa inicial orientada a la captación de inversión.",
					"Desarrollo de la plataforma en React, que permitía a los usuarios proponer planes y conectar con otras personas.",
					"Gestión completa del ciclo de producto: validación de la idea, diseño, desarrollo y lanzamiento privado para inversores.",
					"Definición de workflows y estrategias de pitch orientadas a la captación de inversión.",
					"El proyecto alcanzó fase de pre-inversión pero fue pausado a causa de la pandemia de COVID-19.",
				],
				logoAlt: "Logo Planit, app social para conectar personas a través de planes",
			},
		],
	},

	// ── 404 ──
	notFound: {
		title: "404 — Marc Gallego",
		description: "Página no encontrada. Vuelve al inicio del portfolio de Marc Gallego.",
		heading: "Por aquí no hay nada",
		backHome: "← Volver al inicio",
	},

	// ── Breadcrumbs ──
	breadcrumbs: {
		home: "Inicio",
		experience: "Experiencia",
		projects: "Proyectos",
		contact: "Contacto",
	},
};

export type Translations = typeof es;
