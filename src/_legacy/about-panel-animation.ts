/**
 * LEGACY — Animación de expansión/contracción del panel "Sobre mí"
 *
 * Este código implementaba un efecto FLIP morph: al hacer click en el card
 * "Conóceme" del Hero, el card se expandía a pantalla completa con una
 * animación suave (transform + borderRadius). Al cerrar, se contraía de
 * vuelta al card original.
 *
 * Características:
 * - FLIP animation con Web Animations API (spring easing)
 * - Backdrop con blur
 * - Focus trap (Tab / Shift+Tab) dentro del panel
 * - Escape para cerrar
 * - Scroll lock del body mientras está abierto
 * - Respeta prefers-reduced-motion
 * - Scroll automático al hero antes de abrir
 * - Oculta el header y los collapsibles del hero durante la expansión
 */

export function initHero(): void {
	const hero = document.getElementById("hero");
	if (!(hero instanceof HTMLElement)) return;
	if (hero.dataset.heroInit === "true") return;
	hero.dataset.heroInit = "true";

	const panel = hero.querySelector<HTMLElement>("[data-about-panel]");
	const closeButton = hero.querySelector<HTMLButtonElement>("[data-about-close]");
	const backdrop = hero.querySelector<HTMLElement>("[data-about-backdrop]");
	const expandedContent = hero.querySelector<HTMLElement>("[data-about-expanded]");
	const triggers = hero.querySelectorAll<HTMLElement>("[data-about-trigger]");
	const collapsibles = hero.querySelectorAll<HTMLElement>("[data-hero-collapsible]");
	const siteHeader = document.querySelector<HTMLElement>("[data-site-header]");

	if (!panel || !closeButton || !backdrop || !expandedContent) return;

	// ─── Constants ───

	const DURATION_MS = 550;
	const CARD_RADIUS = "0.5rem";
	const FOCUSABLE_SELECTOR = [
		"a[href]",
		"button:not([disabled])",
		"textarea:not([disabled])",
		"input:not([disabled]):not([type='hidden'])",
		"select:not([disabled])",
		"[tabindex]:not([tabindex='-1'])"
	].join(",");

	const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	let prefersReducedMotion = reducedMotionQuery.matches;

	// ─── State ───

	let isAnimating = false;
	let isExpanded = false;
	let lastTrigger: HTMLElement | null = null;
	let previousBodyOverflow = "";

	// ─── Helpers ───

	const setBodyScrollLock = (locked: boolean): void => {
		if (locked) {
			previousBodyOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = previousBodyOverflow;
		}
	};

	const getCardTransform = (cardRect: DOMRect, panelRect: DOMRect): string => {
		const dx = cardRect.left - panelRect.left;
		const dy = cardRect.top - panelRect.top;
		const sx = cardRect.width / panelRect.width;
		const sy = cardRect.height / panelRect.height;
		return `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
	};

	const onPanelTransitionEnd = (): Promise<void> => {
		return new Promise((resolve) => {
			const fallback = setTimeout(resolve, DURATION_MS + 50);
			const handler = (e: TransitionEvent): void => {
				if (e.target !== panel || e.propertyName !== "transform") return;
				clearTimeout(fallback);
				panel.removeEventListener("transitionend", handler);
				resolve();
			};
			panel.addEventListener("transitionend", handler);
		});
	};

	// ─── UI state toggles ───

	const setExpandedState = (expanded: boolean): void => {
		panel.classList.toggle("is-expanded", expanded);
		panel.setAttribute("aria-expanded", String(expanded));
		siteHeader?.classList.toggle("is-hidden", expanded);
		siteHeader?.setAttribute("aria-hidden", String(expanded));
		collapsibles.forEach((el) => el.classList.toggle("is-hidden", expanded));
		backdrop.classList.toggle("is-visible", expanded);
		backdrop.setAttribute("aria-hidden", String(!expanded));
		setBodyScrollLock(expanded);
	};

	const setExpandedContentVisible = (visible: boolean): void => {
		expandedContent.classList.toggle("is-visible", visible);
		expandedContent.setAttribute("aria-hidden", String(!visible));
	};

	// ─── Focus trap ───

	const trapFocus = (event: KeyboardEvent): void => {
		if (!isExpanded || event.key !== "Tab") return;

		const focusables = Array.from(
			panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
		).filter((el) => !el.hasAttribute("disabled"));

		if (focusables.length === 0) {
			event.preventDefault();
			panel.focus();
			return;
		}

		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && active === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	};

	// ─── Scroll to hero ───

	const scrollToHero = (): Promise<void> => {
		const heroTop = hero.getBoundingClientRect().top + window.scrollY;
		if (Math.abs(window.scrollY - heroTop) < 2) return Promise.resolve();

		return new Promise((resolve) => {
			const onEnd = (): void => {
				clearTimeout(fallback);
				window.removeEventListener("scrollend", onEnd);
				resolve();
			};
			const fallback = setTimeout(onEnd, 600);
			window.addEventListener("scrollend", onEnd, { once: true });
			window.scrollTo({ top: heroTop, behavior: "smooth" });
		});
	};

	// ─── Open / Close ───

	const openAbout = async (trigger?: HTMLElement): Promise<void> => {
		if (isAnimating || isExpanded) return;
		isAnimating = true;
		lastTrigger = trigger ?? null;

		await scrollToHero();

		const cardRect = trigger
			? trigger.getBoundingClientRect()
			: panel.getBoundingClientRect();

		const panelRect = panel.getBoundingClientRect();

		if (prefersReducedMotion) {
			setExpandedState(true);
			panel.classList.add("is-morphing");
			setExpandedContentVisible(true);
			isExpanded = true;
			isAnimating = false;
			panel.focus();
			return;
		}

		// 1. Position panel at card (no transition)
		panel.classList.add("no-transition");
		panel.style.transformOrigin = "top left";
		panel.style.transform = getCardTransform(cardRect, panelRect);
		panel.style.borderRadius = CARD_RADIUS;

		// 2. Make visible at card position
		setExpandedState(true);
		void panel.offsetHeight;

		// 3. Animate to full size
		panel.classList.remove("no-transition");
		panel.classList.add("is-morphing");
		panel.style.transform = "";
		panel.style.borderRadius = "";

		// 4. Reveal content mid-animation
		setTimeout(() => setExpandedContentVisible(true), DURATION_MS * 0.45);

		// 5. Cleanup
		await onPanelTransitionEnd();
		panel.style.transformOrigin = "";
		isExpanded = true;
		isAnimating = false;
		panel.focus();
	};

	const closeAbout = async (): Promise<void> => {
		if (isAnimating || !isExpanded) return;
		isAnimating = true;

		if (prefersReducedMotion) {
			setExpandedContentVisible(false);
			panel.classList.remove("is-morphing");
			setExpandedState(false);
			isExpanded = false;
			isAnimating = false;
			lastTrigger?.focus();
			lastTrigger = null;
			return;
		}

		// 1. Hide content + revert bg to glass
		setExpandedContentVisible(false);
		backdrop.classList.remove("is-visible");
		panel.classList.remove("is-morphing");

		const panelRect = panel.getBoundingClientRect();
		const cardRect = lastTrigger
			? lastTrigger.getBoundingClientRect()
			: panelRect;

		// 2. Shrink to card
		panel.style.transformOrigin = "top left";
		panel.style.transform = getCardTransform(cardRect, panelRect);
		panel.style.borderRadius = CARD_RADIUS;

		// 3. Show hero content mid-animation
		setTimeout(() => {
			collapsibles.forEach((el) => el.classList.remove("is-hidden"));
			siteHeader?.classList.remove("is-hidden");
			siteHeader?.setAttribute("aria-hidden", "false");
		}, DURATION_MS * 0.4);

		// 4. Cleanup after shrink
		await onPanelTransitionEnd();
		panel.style.transform = "";
		panel.style.borderRadius = "";
		panel.style.transformOrigin = "";
		setExpandedState(false);
		isExpanded = false;
		isAnimating = false;
		lastTrigger?.focus();
		lastTrigger = null;
	};

	// ─── Event listeners ───

	triggers.forEach((trigger) => {
		trigger.addEventListener("click", () => openAbout(trigger));
	});

	closeButton.addEventListener("click", closeAbout);
	backdrop.addEventListener("click", closeAbout);

	document.addEventListener("keydown", (event: KeyboardEvent) => {
		if (event.key === "Escape") closeAbout();
		trapFocus(event);
	});

	document.addEventListener("focusin", (event: FocusEvent) => {
		if (!isExpanded) return;
		const target = event.target;
		if (target instanceof Node && !panel.contains(target)) panel.focus();
	});

	reducedMotionQuery.addEventListener("change", (event) => {
		prefersReducedMotion = event.matches;
	});
}
