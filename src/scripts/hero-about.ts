export function initHeroAboutCard(): void {
	const hero = document.getElementById("hero");
	if (!(hero instanceof HTMLElement)) return;
	if (hero.dataset.aboutInit === "true") return;
	hero.dataset.aboutInit = "true";

	const card = hero.querySelector<HTMLElement>("[data-about-card]");
	const slot = hero.querySelector<HTMLElement>("[data-about-slot]");
	const openButton = hero.querySelector<HTMLButtonElement>("[data-about-open]");
	const closeButton = hero.querySelector<HTMLButtonElement>("[data-about-close]");

	if (!card || !slot || !openButton || !closeButton) return;

	const DURATION_MS = 560;
	const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	let currentAnimation: Animation | null = null;
	let isAnimating = false;
	let isExpanded = false;
	let lastTrigger: HTMLButtonElement | null = null;

	const getGap = (): number => Math.max(16, Math.min(window.innerWidth * 0.03, 40));

	const clearInlineCardStyles = (): void => {
		card.style.transform = "";
		card.style.transformOrigin = "";
		card.style.willChange = "";
	};

	const setBodyScrollLock = (locked: boolean): void => {
		document.body.style.overflow = locked ? "hidden" : "";
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
		setBodyScrollLock(expanded);
	};

	const openAbout = (trigger: HTMLButtonElement = openButton): void => {
		if (isAnimating || isExpanded) return;
		isAnimating = true;
		lastTrigger = trigger;

		const fromRect = card.getBoundingClientRect();
		lockSlotHeight();
		hero.style.setProperty("--about-gap", `${getGap()}px`);
		setExpandedState(true);

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
	document.addEventListener("keydown", (event: KeyboardEvent) => {
		if (event.key === "Escape") closeAbout();
	});
}
