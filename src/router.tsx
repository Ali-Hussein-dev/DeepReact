import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Simple NotFound component
function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
			<h1 className="text-4xl font-bold mb-4">404</h1>
			<p className="text-lg text-muted-foreground mb-4">Page not found</p>
			<a href="/" className="text-primary hover:underline">
				Go back home
			</a>
		</div>
	);
}

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: NotFound,
	});

	return router;
};
