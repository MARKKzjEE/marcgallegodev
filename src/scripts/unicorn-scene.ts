// Gradient interactivo de UnicornStudio (Hero y Contacto).
// - La librería se carga bajo demanda, sin bloquear el parseo del HTML.
// - La escena solo se recarga cuando cambia el tema (light/dark), no con
//   cualquier cambio de clase en <html>.
// - Con prefers-reduced-motion se desactiva el ratón y la escena se congela
//   tras pintarse (queda como gradient estático).

interface UnicornScene {
	paused: boolean;
	destroy(): void;
}

declare global {
	interface Window {
		UnicornStudio?: {
			addScene(options: Record<string, unknown>): Promise<UnicornScene>;
		};
	}
}

const LIB_SRC = '/unicorn/unicornStudio.umd.js';
const REDUCED_MOTION_FREEZE_MS = 500;
let libPromise: Promise<void> | null = null;

function loadLib(): Promise<void> {
	libPromise ??= new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = LIB_SRC;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = reject;
		document.head.appendChild(script);
	});
	return libPromise;
}

const isDark = () => document.documentElement.classList.contains('dark');

export function mountUnicornScene(elementId: string) {
	const el = document.getElementById(elementId);
	if (!el || el.dataset.unicornInit) return;
	el.dataset.unicornInit = 'true';

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let scene: UnicornScene | null = null;
	let loadId = 0;

	async function load() {
		// Cada carga invalida las anteriores: si el tema cambia dos veces seguidas,
		// la escena que llegue tarde se destruye y nunca quedan dos vivas.
		const id = ++loadId;
		scene?.destroy();
		scene = null;

		await loadLib();
		if (id !== loadId || !window.UnicornStudio) return;

		const next = await window.UnicornStudio.addScene({
			elementId,
			fps: 60,
			scale: 1,
			// Un gradient no gana nitidez por encima de 1.5x y en móvil ahorra GPU
			dpi: Math.min(window.devicePixelRatio || 1, 1.5),
			filePath: isDark()
				? '/unicorn/mouse-tracking-gradient.json'
				: '/unicorn/mouse-tracking-gradient-light.json',
			interactivity: { mouse: { disableMobile: false, disabled: reduceMotion } },
		});

		if (id !== loadId) {
			next.destroy();
			return;
		}
		scene = next;
		// Deja pintar unos frames y congela la animación. El rAF solo corre con la
		// pestaña visible, así nunca se congela antes del primer pintado.
		if (reduceMotion) {
			requestAnimationFrame(() => setTimeout(() => { next.paused = true; }, REDUCED_MOTION_FREEZE_MS));
		}
	}

	load().catch(() => {});

	let dark = isDark();
	new MutationObserver(() => {
		if (isDark() === dark) return;
		dark = isDark();
		load().catch(() => {});
	}).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
