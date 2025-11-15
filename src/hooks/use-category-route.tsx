import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

/**
 * @description
 * This hook is used to get the sources by category
 */
export const useCategoryRoute = ({ category }: { category: string }) => {
	//
	const { data: sources } = useSuspenseQuery(
		convexQuery(api.sources.getByCategoryIndex, { category }),
	);
	return {
		sources,
	};
};
