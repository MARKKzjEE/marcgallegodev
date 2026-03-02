export function initHeaderScroll(): void {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	if (!header || header.dataset.scrollInit === "true") return;
	header.dataset.scrollInit = "true";

	const hero = document.querySelector<HTMLElement>("#hero");
	const heroPhoto = document.querySelector<HTMLElement>("[data-hero-photo]");
	const heroCard = document.querySelector<HTMLElement>("[data-about-card]");

	// Pages without Hero start with solid header
	if (!hero) {
		header.classList.add("is-past-hero");
		return;
	}

	const HEADER_HEIGHT = 64;
	const FADE_BUFFER = 40; // content fully hidden this far below header
	const FADE_ZONE = 150;
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
		const heroHeight = hero!.offsetHeight;

		// Header: solid bg + color changes when past hero
		header!.classList.toggle("is-past-hero", scrollY >= heroHeight - HEADER_HEIGHT);

		// Fade zone grows with scroll: 0 at rest → FADE_ZONE max
		const fadeZone = Math.min(scrollY, FADE_ZONE);
		if (heroPhoto) applyScrollMask(heroPhoto, fadeZone);
		if (heroCard) applyScrollMask(heroCard, fadeZone);

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
