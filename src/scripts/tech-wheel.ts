export function initTechWheel(): void {
	const wheel = document.querySelector<HTMLElement>("[data-tech-wheel]");
	if (!wheel || wheel.dataset.wheelInit === "true") return;
	wheel.dataset.wheelInit = "true";

	const icons = Array.from(wheel.querySelectorAll<HTMLButtonElement>("[data-tech]"));
	if (icons.length === 0) return;

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// ── Scroll-linked animation ──

	if (prefersReducedMotion) {
		icons.forEach((icon) => icon.classList.add("is-placed"));
		return;
	}

	const section = wheel.closest("section");
	if (!section) return;

	// Easing: curva cúbica suave
	const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

	// Precalcular ángulos
	const total = icons.length;
	const angles = icons.map((_, i) => (360 / total) * i);

	// Stagger: cada icono arranca un poco más tarde dentro del progreso 0→1
	const STAGGER_SHARE = 0.5;
	const iconDelay = (index: number): number => (index / total) * STAGGER_SHARE;

	let ticking = false;
	let lastProgress = -1;

	const update = (): void => {
		const wheelRect = wheel.getBoundingClientRect();
		const viewH = window.innerHeight;

		// Centro del wheel relativo al viewport
		const wheelCenter = wheelRect.top + wheelRect.height / 2;

		// ── Zonas de scroll ──
		const enterStart = viewH * 1.1;
		const enterEnd = viewH * 0.5;
		const exitStart = viewH * 0.4;
		const exitEnd = viewH * -0.2;

		let progress: number;
		if (wheelCenter >= enterEnd && wheelCenter <= enterStart) {
			progress = 1 - (wheelCenter - enterEnd) / (enterStart - enterEnd);
		} else if (wheelCenter >= exitStart && wheelCenter < enterEnd) {
			progress = 1;
		} else if (wheelCenter < exitStart && wheelCenter >= exitEnd) {
			progress = (wheelCenter - exitEnd) / (exitStart - exitEnd);
		} else if (wheelCenter < exitEnd) {
			progress = 0;
		} else {
			progress = 0;
		}
		progress = Math.max(0, Math.min(1, progress));

		if (Math.abs(progress - lastProgress) < 0.001) {
			ticking = false;
			return;
		}
		lastProgress = progress;

		const radius = parseFloat(getComputedStyle(wheel).getPropertyValue("--radius"));

		icons.forEach((icon, index) => {
			const delay = iconDelay(index);
			const iconProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - STAGGER_SHARE)));
			const t = easeOut(iconProgress);

			const angle = angles[index];

			if (t >= 0.98) {
				if (!icon.classList.contains("is-placed")) {
					icon.style.transform = "";
					icon.style.opacity = "";
					icon.classList.add("is-placed");
				}
			} else {
				icon.classList.remove("is-placed");
				const currentRadius = radius * t;
				icon.style.transform =
					`translate(-50%, -50%) rotate(${angle}deg) translateY(-${currentRadius}px) rotate(-${angle}deg) scale(${t})`;
				icon.style.opacity = String(t);
			}
		});

		ticking = false;
	};

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

	// ── Hover → centro del círculo ──

	let activeIcon: HTMLButtonElement | null = null;
	let originalRect: DOMRect | null = null;
	let deactivateTimer: ReturnType<typeof setTimeout> | null = null;

	const deactivate = (): void => {
		if (activeIcon) {
			activeIcon.style.pointerEvents = "";
			activeIcon.classList.remove("is-active");
			activeIcon = null;
			originalRect = null;
		}
	};

	icons.forEach((icon) => {
		icon.addEventListener("mouseenter", () => {
			if (!icon.classList.contains("is-placed")) return;
			if (deactivateTimer) {
				clearTimeout(deactivateTimer);
				deactivateTimer = null;
			}
			deactivate();
			originalRect = icon.getBoundingClientRect();
			activeIcon = icon;

			// Reset shine animations para que se reproduzcan cada vez
			icon.getAnimations().forEach((a) => a.cancel());
			void icon.offsetWidth; // force reflow

			icon.classList.add("is-active");
			icon.style.pointerEvents = "none";
		});
	});

	// ── Toggle mostrar nombres ──
	const toggleBtn = document.querySelector<HTMLButtonElement>("[data-toggle-names]");
	if (toggleBtn) {
		toggleBtn.addEventListener("click", () => {
			const active = wheel.classList.toggle("show-names");
			toggleBtn.setAttribute("aria-pressed", String(active));
			toggleBtn.textContent = active ? "Ocultar nombres" : "Mostrar nombres";
		});
	}

	// Detectar salida basándose en la posición original (no la animada)
	window.addEventListener("mousemove", (e: MouseEvent) => {
		if (!activeIcon || !originalRect) return;

		const margin = 20; // px de tolerancia
		const x = e.clientX;
		const y = e.clientY;

		const isOutside =
			x < originalRect.left - margin ||
			x > originalRect.right + margin ||
			y < originalRect.top - margin ||
			y > originalRect.bottom + margin;

		if (isOutside && !deactivateTimer) {
			deactivateTimer = setTimeout(() => {
				deactivate();
				deactivateTimer = null;
			}, 80);
		} else if (!isOutside && deactivateTimer) {
			clearTimeout(deactivateTimer);
			deactivateTimer = null;
		}
	});
}
