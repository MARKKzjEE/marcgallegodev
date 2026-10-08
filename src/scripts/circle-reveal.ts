/**
 * Circle Reveal Effect
 *
 * Applies a "negative" reveal circle that follows the cursor with a smooth lerp.
 * Usage: add `data-reveal` to a wrapper element that contains:
 *   - A base layer (visible by default)
 *   - A `.reveal-layer` element (absolute positioned, clipped)
 *
 * The wrapper must have `position: relative` and `overflow: hidden`.
 * The reveal layer uses CSS vars: --r (radius), --cx / --cy (position).
 */
function initCircleReveal() {
	if (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches) return;

	document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((wrapper) => {
		if (wrapper.dataset.revealInit) return;
		wrapper.dataset.revealInit = 'true';

		const triggers = wrapper.querySelectorAll<HTMLElement>('[data-reveal-trigger]');
		const reveal = wrapper.querySelector<HTMLElement>('.reveal-layer');
		if (!reveal) return;

		const radius = wrapper.dataset.revealRadius || '40px';
		const ease = parseFloat(wrapper.dataset.revealEase || '0.12');

		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let rafId: number | null = null;

		function tick() {
			currentX += (targetX - currentX) * ease;
			currentY += (targetY - currentY) * ease;
			wrapper.style.setProperty('--cx', `${currentX}px`);
			wrapper.style.setProperty('--cy', `${currentY}px`);

			if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
				rafId = requestAnimationFrame(tick);
			} else {
				rafId = null;
			}
		}

		wrapper.addEventListener('mousemove', (e) => {
			const rect = wrapper.getBoundingClientRect();
			targetX = e.clientX - rect.left;
			targetY = e.clientY - rect.top;
			if (!rafId) rafId = requestAnimationFrame(tick);
		});

		if (triggers.length > 0) {
			triggers.forEach((trigger) => {
				trigger.addEventListener('mouseenter', () => {
					wrapper.style.setProperty('--r', radius);
				});
				trigger.addEventListener('mouseleave', () => {
					wrapper.style.setProperty('--r', '0px');
				});
			});
		} else {
			wrapper.addEventListener('mouseenter', () => {
				wrapper.style.setProperty('--r', radius);
			});
			wrapper.addEventListener('mouseleave', () => {
				wrapper.style.setProperty('--r', '0px');
			});
		}
	});
}

// Auto-init
initCircleReveal();
