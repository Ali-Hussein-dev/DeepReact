import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
	console.error("missing envar CONVEX_URL");
}


export default function AppConvexProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
	const convexQueryClient = new ConvexQueryClient(convex);
	const queryClient = new QueryClient({
	  defaultOptions: {
		queries: {
		  queryKeyHashFn: convexQueryClient.hashFn(),
		  queryFn: convexQueryClient.queryFn(),
		},
	  },
	});
	convexQueryClient.connect(queryClient);
  return (
    <ConvexProvider client={convexQueryClient.convexClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConvexProvider>
  );
}
