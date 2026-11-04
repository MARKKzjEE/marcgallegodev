/**
 * Project video
 *
 * Miniaturas animadas de los proyectos (components/ProjectVideo.astro). El
 * vídeo va encima de su imagen y solo se ve mientras se reproduce
 * (`.is-playing`). Dos modos:
 *   - `data-play-in-view`: arranca al asomar en pantalla y se pausa al salir
 *     (catálogo de /proyectos).
 *   - `data-play-on-hover`: quieto hasta que el ratón entra en su tarjeta
 *     (`[data-hover-target]`); al salir vuelve la imagen (collage de la home).
 *     Solo con ratón: en táctil se queda la imagen.
 * Con prefers-reduced-motion no arranca ninguno.
 */
const FADE_MS = 400; // = transición de opacidad de .project-video

function initProjectVideos() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const pending = (selector: string) =>
		[...document.querySelectorAll<HTMLVideoElement>(selector)].filter((video) => !video.dataset.videoInit);

	// ─── Al verse ───
	const inView = pending('[data-play-in-view]');
	if (inView.length) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const video = entry.target as HTMLVideoElement;
				// Si el navegador no deja arrancarlo (ahorro de batería), se queda la imagen
				if (entry.isIntersecting) video.play().catch(() => {});
				else video.pause();
			});
		}, { threshold: 0.25 });

		inView.forEach((video) => {
			video.dataset.videoInit = 'true';
			video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
			observer.observe(video);
		});
	}

	// ─── Al pasar el ratón ───
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	pending('[data-play-on-hover]').forEach((video) => {
		video.dataset.videoInit = 'true';
		const target = video.closest<HTMLElement>('[data-hover-target]') ?? video.parentElement;
		if (!target) return;

		// Se descarga cuando la tarjeta asoma, así el hover arranca al momento
		const preload = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			video.preload = 'auto';
			video.load();
			preload.disconnect();
		});
		preload.observe(target);

		let stopTimer: number | undefined;
		video.addEventListener('playing', () => video.classList.add('is-playing'));

		target.addEventListener('mouseenter', () => {
			window.clearTimeout(stopTimer);
			video.play().catch(() => {});
		});
		target.addEventListener('mouseleave', () => {
			video.classList.remove('is-playing');
			// Tras el fundido, a cero: el siguiente hover empieza desde el principio
			stopTimer = window.setTimeout(() => {
				video.pause();
				video.currentTime = 0;
			}, FADE_MS);
		});
	});
}

// Auto-init
initProjectVideos();
