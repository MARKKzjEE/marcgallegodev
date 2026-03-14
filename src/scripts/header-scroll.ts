export function initHeaderScroll(): void {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	if (!header || header.dataset.scrollInit === "true") return;
	header.dataset.scrollInit = "true";

	const hero = document.querySelector<HTMLElement>("#hero");
	const contactHero = document.querySelector<HTMLElement>("[data-contact-hero]");
	const heroPhoto = document.querySelector<HTMLElement>("[data-hero-photo]");
	const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");

	// ── Hide on scroll down, show on scroll up (mobile only) ──
	const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
	let lastScrollY = window.scrollY;
	let hideThreshold = 80; // px scrolled before hiding kicks in

	window.addEventListener("scroll", () => {
		if (!isMobile()) {
			header.classList.remove("is-hidden");
			lastScrollY = window.scrollY;
			return;
		}
		const current = window.scrollY;
		const delta = current - lastScrollY;
		const heroHeight = hero ? hero.offsetHeight : 0;
		const pastHero = current > heroHeight - 64;
		if (pastHero && current > hideThreshold && delta > 0) {
			header.classList.add("is-hidden");
		} else if (!pastHero || delta < 0) {
			header.classList.remove("is-hidden");
		}
		lastScrollY = current;
	}, { passive: true });

	// Pages without Hero or contact hero start with solid header
	if (!hero && !contactHero) {
		header.classList.add("is-past-hero");
		return;
	}

	// Contact page: use contact hero as the reference zone
	const heroZone = hero || contactHero!;

	const HEADER_HEIGHT = 64;
	const FADE_BUFFER = 20;
	const FADE_ZONE = 400;
	const FADE_START = 120; // px scrolled before fade begins
	let ticking = false;

	function applyScrollMask(el: HTMLElement, fadeZone: number) {
		const rect = el.getBoundingClientRect();
		const h = rect.height;

		if (h <= 0 || fadeZone <= 0) {
			el.style.setProperty("mask-image", "none");
			el.style.setProperty("-webkit-mask-image", "none");
			return;
		}

		// Fade zone edges in element-relative percentages
		const fadeTop = ((HEADER_HEIGHT + FADE_BUFFER - rect.top) / h) * 100;
		const fadeBot = fadeTop + (fadeZone / h) * 100;

		let gradient: string;
		if (fadeTop >= 100) {
			gradient = "linear-gradient(transparent, transparent)";
		} else if (fadeBot <= 0) {
			gradient = "none";
		} else {
			gradient = `linear-gradient(to bottom, transparent ${Math.max(fadeTop, 0)}%, black ${Math.min(fadeBot, 100)}%)`;
		}

		el.style.setProperty("mask-image", gradient);
		el.style.setProperty("-webkit-mask-image", gradient);
	}

	function update() {
		const scrollY = window.scrollY;
		const zoneHeight = heroZone.offsetHeight;

		// Header: solid bg + color changes when past hero/contact-hero
		header!.classList.toggle("is-past-hero", scrollY >= zoneHeight - HEADER_HEIGHT);

		// Fade zone grows with scroll: 0 at rest → FADE_ZONE max
		const fadeZone = Math.min(Math.max(scrollY - FADE_START, 0), FADE_ZONE);
		if (heroPhoto) applyScrollMask(heroPhoto, fadeZone);
		if (heroContent) applyScrollMask(heroContent, fadeZone);

		ticking = false;
	}

	window.addEventListener(
		"scroll",
		() => {
			if (!ticking) {
				requestAnimationFrame(update);
				ticking = true;
			}
		},
		{ passive: true }
	);

	update();
}
