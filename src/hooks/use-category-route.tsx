
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

/**
 * @description
 * This hook is used to get the sources by category
 */
export const useCategoryRoute = ({ category }: { category: string }) => {
	//
	const sources = useQuery(api.sources.getByCategoryIndex, { category });
	return {
		sources,
	};
};
