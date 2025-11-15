import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function filterByTagValues<
	T extends { tags?: Array<{ value: string }> },
>(sources: T[] | undefined, filter?: string): T[] | undefined {
	if (!sources) return sources;
	if (!filter) return sources;
	const active = new Set(filter.split(",").filter(Boolean));
	return sources.filter(
		(s) => Array.isArray(s.tags) && s.tags.some((t) => active.has(t.value)),
	);
}