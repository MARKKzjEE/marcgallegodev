export function initHeroAboutCard(): void {
	const hero = document.getElementById("hero");
	if (!(hero instanceof HTMLElement)) return;
	if (hero.dataset.aboutInit === "true") return;
	hero.dataset.aboutInit = "true";

	const card = hero.querySelector<HTMLElement>("[data-about-card]");
	const slot = hero.querySelector<HTMLElement>("[data-about-slot]");
	const openButton = hero.querySelector<HTMLButtonElement>("[data-about-open]");
	const closeButton = hero.querySelector<HTMLButtonElement>("[data-about-close]");
	const backdrop = hero.querySelector<HTMLElement>("[data-about-backdrop]");
	const compactContent = hero.querySelector<HTMLElement>("[data-about-compact]");
	const siteHeader = document.querySelector<HTMLElement>("[data-site-header]");

	if (!card || !slot || !openButton || !closeButton || !backdrop || !compactContent) return;

	const DURATION_MS = 560;
	const BACKDROP_DURATION_MS = 180;
	const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
	const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	let prefersReducedMotion = reducedMotionQuery.matches;

	let currentAnimation: Animation | null = null;
	let isAnimating = false;
	let isExpanded = false;
	let lastTrigger: HTMLButtonElement | null = null;
	let previousBodyOverflow = "";

	const getGap = (): number => 24;

	const FOCUSABLE_SELECTOR = [
		"a[href]",
		"button:not([disabled])",
		"textarea:not([disabled])",
		"input:not([disabled]):not([type='hidden'])",
		"select:not([disabled])",
		"[tabindex]:not([tabindex='-1'])"
	].join(",");

	const clearInlineCardStyles = (): void => {
		card.style.transform = "";
		card.style.transformOrigin = "";
		card.style.willChange = "";
	};

	const setBodyScrollLock = (locked: boolean): void => {
		if (locked) {
			previousBodyOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return;
		}

		document.body.style.overflow = previousBodyOverflow;
	};

	const lockSlotHeight = (): void => {
		const rect = card.getBoundingClientRect();
		slot.style.minHeight = `${Math.round(rect.height)}px`;
	};

	const unlockSlotHeight = (): void => {
		slot.style.minHeight = "";
	};

	const stopCurrentAnimation = (): void => {
		currentAnimation?.cancel();
		currentAnimation = null;
	};

	const playFlip = (fromRect: DOMRect, toRect: DOMRect, onFinish: () => void): void => {
		stopCurrentAnimation();

		if (prefersReducedMotion || toRect.width === 0 || toRect.height === 0) {
			clearInlineCardStyles();
			onFinish();
			return;
		}

		const translateX = fromRect.left - toRect.left;
		const translateY = fromRect.top - toRect.top;
		const scaleX = fromRect.width / toRect.width;
		const scaleY = fromRect.height / toRect.height;

		card.style.willChange = "transform";
		card.style.transformOrigin = "top left";
		card.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

		currentAnimation = card.animate(
			[
				{ transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})` },
				{ transform: "translate(0, 0) scale(1, 1)" }
			],
			{
				duration: DURATION_MS,
				easing: EASING,
				fill: "both"
			}
		);

		currentAnimation.onfinish = () => {
			clearInlineCardStyles();
			currentAnimation = null;
			onFinish();
		};

		currentAnimation.oncancel = () => {
			clearInlineCardStyles();
			currentAnimation = null;
		};
	};

	const setExpandedState = (expanded: boolean): void => {
		card.classList.toggle("is-expanded", expanded);
		card.setAttribute("aria-expanded", expanded ? "true" : "false");
		openButton.setAttribute("aria-expanded", expanded ? "true" : "false");
		siteHeader?.classList.toggle("is-hidden", expanded);
		siteHeader?.setAttribute("aria-hidden", expanded ? "true" : "false");

		if (expanded) {
			backdrop.hidden = false;
			backdrop.classList.add("is-visible");
		} else {
			backdrop.classList.remove("is-visible");
			window.setTimeout(() => {
				if (!isExpanded && !isAnimating) backdrop.hidden = true;
			}, BACKDROP_DURATION_MS);
		}

		backdrop.setAttribute("aria-hidden", expanded ? "false" : "true");
		setBodyScrollLock(expanded);
	};

	const setCompactVisible = (visible: boolean): void => {
		card.classList.toggle("is-compact-hidden", !visible);
		compactContent.setAttribute("aria-hidden", visible ? "false" : "true");
	};

	const trapFocus = (event: KeyboardEvent): void => {
		if (!isExpanded || event.key !== "Tab") return;

		const focusables = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
			(el) => !el.hasAttribute("disabled")
		);

		if (focusables.length === 0) {
			event.preventDefault();
			card.focus();
			return;
		}

		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && active === first) {
			event.preventDefault();
			last.focus();
			return;
		}

		if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	};

	const openAbout = (trigger: HTMLButtonElement = openButton): void => {
		if (isAnimating || isExpanded) return;
		isAnimating = true;
		lastTrigger = trigger;

		const fromRect = card.getBoundingClientRect();
		lockSlotHeight();
		hero.style.setProperty("--about-gap", `${getGap()}px`);
		setExpandedState(true);
		setCompactVisible(false);

		const toRect = card.getBoundingClientRect();
		playFlip(fromRect, toRect, () => {
			isExpanded = true;
			isAnimating = false;
			card.focus();
		});
	};

	const closeAbout = (): void => {
		if (isAnimating || !isExpanded) return;
		isAnimating = true;

		const fromRect = card.getBoundingClientRect();
		setCompactVisible(true);
		setExpandedState(false);
		const toRect = card.getBoundingClientRect();

		playFlip(fromRect, toRect, () => {
			isExpanded = false;
			isAnimating = false;
			lastTrigger?.focus();
			lastTrigger = null;
			requestAnimationFrame(() => {
				if (!isExpanded && !isAnimating) unlockSlotHeight();
			});
		});
	};

	openButton.addEventListener("click", () => openAbout(openButton));
	closeButton.addEventListener("click", closeAbout);
	backdrop.addEventListener("click", closeAbout);
	document.addEventListener("keydown", (event: KeyboardEvent) => {
		if (event.key === "Escape") closeAbout();
		trapFocus(event);
	});
	document.addEventListener("focusin", (event: FocusEvent) => {
		if (!isExpanded) return;
		const target = event.target;
		if (target instanceof Node && !card.contains(target)) card.focus();
	});

	window.addEventListener("resize", () => {
		if (!isExpanded) return;
		hero.style.setProperty("--about-gap", `${getGap()}px`);
	});

	if ("addEventListener" in reducedMotionQuery) {
		reducedMotionQuery.addEventListener("change", (event) => {
			prefersReducedMotion = event.matches;
		});
	}

	setCompactVisible(true);
}
