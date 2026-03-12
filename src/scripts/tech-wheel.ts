export function initTechWheel(): void {
	const wheel = document.querySelector<HTMLElement>("[data-tech-wheel]");
	if (!wheel || wheel.dataset.wheelInit === "true") return;
	wheel.dataset.wheelInit = "true";

	// HMR: limpiar el guard si el módulo se recarga en dev
	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			wheel.dataset.wheelInit = "";
		});
	}

	const icons = Array.from(wheel.querySelectorAll<HTMLButtonElement>("[data-tech]"));
	if (icons.length === 0) return;

	icons.forEach((icon) => icon.classList.add("is-placed"));

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const total = icons.length;
	const DEGREES_PER_PX = 0.08;
	const SPRING = "0.5s cubic-bezier(0.22, 1, 0.36, 1)";

	let wheelRotation = 0;
	let lastScrollY = window.scrollY;
	let ticking = false;
	let activeIndex: number | null = null;
	let cachedRadius = 0;

	const readRadius = (): number =>
		parseFloat(getComputedStyle(wheel!).getPropertyValue("--radius")) || 0;

	const getRadius = (): number => cachedRadius;

	new ResizeObserver(() => { cachedRadius = readRadius(); }).observe(wheel!);

	const getWheelTransform = (index: number, r = getRadius()): string => {
		const angle = (360 / total) * index + wheelRotation;
		return `translate(-50%, -50%) rotate(${angle}deg) translateY(-${r}px) rotate(-${angle}deg)`;
	};

	const applyWheelTransforms = (): void => {
		const r = getRadius();
		if (r === 0) return; // --radius aún no está calculado, skip
		icons.forEach((icon, i) => {
			if (i === activeIndex) return;
			// Si el icono aún tiene transición activa (viene de deactivate), la limpiamos
			if (icon.style.transition) icon.style.transition = "";
			icon.style.transform = getWheelTransform(i, r);
		});
	};

	// ── Scroll → rueda gira ──
	window.addEventListener("scroll", () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			const currentScrollY = window.scrollY;
			const delta = currentScrollY - lastScrollY;
			lastScrollY = currentScrollY;
			// Clamp para evitar saltos bruscos (ej. scroll restoration, fast scroll)
			const clampedDelta = Math.max(-80, Math.min(80, delta));
			wheelRotation += clampedDelta * DEGREES_PER_PX;
			applyWheelTransforms();
			ticking = false;
		});
	}, { passive: true });

	// Primer render: reintentar hasta que --radius esté calculado (puede tardar más de 2 rAF)
	const initWheelWhenReady = (): void => {
		if (getRadius() === 0) {
			requestAnimationFrame(initWheelWhenReady);
			return;
		}
		applyWheelTransforms();
	};
	requestAnimationFrame(initWheelWhenReady);

	// ── Hover → icono al centro ──
	const deactivate = (): void => {
		if (activeIndex === null) return;
		const idx = activeIndex;
		const icon = icons[idx];
		activeIndex = null;
		icon.classList.remove("is-active");
		icon.style.transition = `transform ${SPRING}`;
		icon.style.transform = getWheelTransform(idx);
		// Limpiar transition al acabar para que el scroll sea instantáneo
		icon.addEventListener("transitionend", () => {
			icon.style.transition = "";
		}, { once: true });
	};

	icons.forEach((icon, index) => {
		icon.addEventListener("mouseenter", () => {
			if (activeIndex !== null && activeIndex !== index) deactivate();

			activeIndex = index;
			icon.classList.add("is-active");
			icon.style.transition = "";

			// Doble rAF: garantiza que el browser pinta la posición actual antes de transicionar
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (activeIndex !== index) return;
					icon.style.transition = `transform ${SPRING}`;
					icon.style.transform = "translate(-50%, -50%) scale(1.8)";
				});
			});
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
