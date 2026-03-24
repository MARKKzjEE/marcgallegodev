export function initTechWheel(): void {
	const wheel = document.querySelector<HTMLElement>("[data-tech-wheel]");
	if (!wheel || wheel.dataset.wheelInit === "true") return;
	wheel.dataset.wheelInit = "true";

	if (import.meta.hot) {
		import.meta.hot.dispose(() => { wheel.dataset.wheelInit = ""; });
	}

	const icons = Array.from(wheel.querySelectorAll<HTMLButtonElement>("[data-tech]"));
	if (icons.length === 0) return;

	icons.forEach((icon) => icon.classList.add("is-placed"));

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const total = icons.length;
	const DEGREES_PER_PX = 0.08;
	const SPRING = "0.5s cubic-bezier(0.22, 1, 0.36, 1)";

	let wheelRotation = 0;
	let ticking = false;
	let activeIndex: number | null = null;
	let cachedRadius = 0;
	let deactivatingIndex: number | null = null;

	new ResizeObserver(() => {
		cachedRadius = parseFloat(getComputedStyle(wheel).getPropertyValue("--radius")) || 0;
	}).observe(wheel);

	const getTransform = (index: number): string => {
		const angle = (360 / total) * index + wheelRotation;
		return `translate(-50%, -50%) rotate(${angle}deg) translateY(-${cachedRadius}px) rotate(${-angle}deg)`;
	};

	const applyTransforms = (): void => {
		if (cachedRadius === 0) return;
		icons.forEach((icon, i) => {
			if (i === activeIndex) return;
			icon.style.transition = "";
			icon.style.transform = getTransform(i);
		});
	};

	// ── Scroll ──
	let prevScrollY = window.scrollY;

	window.addEventListener("scroll", () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			wheelRotation += (window.scrollY - prevScrollY) * DEGREES_PER_PX;
			prevScrollY = window.scrollY;
			applyTransforms();
			ticking = false;
		});
	}, { passive: true });

	// ── Init: esperar radius y calcular rotación inicial por scroll ──
	const init = (): void => {
		if (cachedRadius === 0) { requestAnimationFrame(init); return; }
		wheelRotation = -wheel.getBoundingClientRect().top * DEGREES_PER_PX;
		prevScrollY = window.scrollY;
		applyTransforms();
	};
	requestAnimationFrame(init);

	// ── Hover ──
	const deactivate = (): void => {
		if (activeIndex === null) return;
		const idx = activeIndex;
		deactivatingIndex = idx;
		activeIndex = null;
		const icon = icons[idx];
		icon.classList.remove("is-active");
		icon.style.transition = `transform ${SPRING}`;
		icon.style.transform = getTransform(idx);
		icon.addEventListener("transitionend", () => {
			if (deactivatingIndex !== idx) return; // cancelado por otro hover
			icon.style.transition = "";
			deactivatingIndex = null;
		}, { once: true });
	};

	icons.forEach((icon, index) => {
		icon.addEventListener("mouseenter", () => {
			if (activeIndex !== null && activeIndex !== index) deactivate();
			deactivatingIndex = null; // cancelar cualquier retorno en curso
			activeIndex = index;
			icon.classList.add("is-active");
			icon.style.transition = "";
			requestAnimationFrame(() => requestAnimationFrame(() => {
				if (activeIndex !== index) return;
				icon.style.transition = `transform ${SPRING}`;
				icon.style.transform = "translate(-50%, -50%) scale(1.8)";
			}));
		});
	});

	wheel.addEventListener("mouseleave", deactivate);

	// ── Toggle nombres ──
	const toggleBtn = document.querySelector<HTMLButtonElement>("[data-toggle-names]");
	toggleBtn?.addEventListener("click", () => {
		const active = wheel.classList.toggle("show-names");
		toggleBtn.setAttribute("aria-pressed", String(active));
	});
}
