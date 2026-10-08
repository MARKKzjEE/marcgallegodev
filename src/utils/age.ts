/** Edad en años cumplidos a fecha `now` (fecha de nacimiento en formato YYYY-MM-DD) */
export function getAge(birthDate: string, now: Date = new Date()): number {
	const birth = new Date(`${birthDate}T00:00:00`);
	const age = now.getFullYear() - birth.getFullYear();
	const hadBirthday =
		now.getMonth() > birth.getMonth() ||
		(now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
	return hadBirthday ? age : age - 1;
}
