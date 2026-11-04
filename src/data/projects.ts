import cordesuro from '../assets/projects/cordesuro.png';
import lateua from '../assets/projects/lateua.png';
import loyic from '../assets/projects/loyic.png';
import pillositio from '../assets/projects/pillositio.png';
import planit from '../assets/projects/planit.png';
import rtth from '../assets/projects/rtth-onda.png';
import trama from '../assets/projects/trama-world.png';
import viviq from '../assets/projects/viviq.png';

// Orden: PlanIT · Loyic · Lateua · Cor de suro · Viviq · RTTH · PilloSitio · Trama World (031→038).
export const projectImages = [planit, loyic, lateua, cordesuro, viviq, rtth, pillositio, trama];

/** Miniatura animada: vídeo en bucle de public/projects/ (H.264 + AV1). Se
    hacen en marcgallego-motion (miniaturas/preparar.sh). */
export interface ProjectVideo {
	src: string;
	av1: string;
}

const thumb = (name: string): ProjectVideo => ({ src: `/projects/${name}.mp4`, av1: `/projects/${name}.av1.mp4` });

// Web de cada proyecto (mismo orden). null = ya no existe: la ficha del
// catálogo lo marca como archivado.
export const projectUrls: (string | null)[] = [
	null, null, null,
	'https://cordesuro.org/', 'https://viviq.digital/', 'https://rtth.es/',
	'https://pillositio.app/', 'https://trama.world/',
];

// Mismo orden que projectImages
export const projectVideos: ProjectVideo[] = [
	thumb('planit'), thumb('loyic'), thumb('lateua'), thumb('cordesuro'), thumb('viviq'), thumb('rtth'), thumb('pillositio'), thumb('trama'),
];
