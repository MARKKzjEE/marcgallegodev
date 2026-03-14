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
		if (r === 0) return;
		icons.forEach((icon, i) => {
			if (i === activeIndex) return;
			if (icon.style.transition) icon.style.transition = "";
			icon.style.transform = getWheelTransform(i, r);
		});
	};

	// ── Scroll → rueda gira solo cuando visible ──
	// Usamos delta acumulado pero con IntersectionObserver solo para activar/desactivar.
	// Al entrar al viewport sincronizamos prevScrollY para que el primer delta sea 0.
	let prevScrollY = window.scrollY;
	let isVisible = false;
	let rafId = 0;

	new IntersectionObserver((entries) => {
		isVisible = entries[0].isIntersecting;
		if (isVisible) {
			cancelAnimationFrame(rafId); // cancelar rAF pendiente con prevScrollY antiguo
			prevScrollY = window.scrollY;
		}
	}, { threshold: 0 }).observe(wheel!);

	window.addEventListener("scroll", () => {
		if (!isVisible || ticking) return;
		ticking = true;
		rafId = requestAnimationFrame(() => {
			const dy = window.scrollY - prevScrollY;
			prevScrollY = window.scrollY;
			wheelRotation += dy * DEGREES_PER_PX;
			applyWheelTransforms();
			ticking = false;
		});
	}, { passive: true });

	// Primer render
	const initWheelWhenReady = (): void => {
		if (getRadius() === 0) {
			requestAnimationFrame(initWheelWhenReady);
			return;
		}
		prevScrollY = window.scrollY;
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
