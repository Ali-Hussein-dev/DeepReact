import { Link, useMatchRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { sidebarLinks } from "@/constants/urls";
import { SourceSearch } from "@/components/search-sources";
import { Button } from "@/components/ui/button";
import { Content, FilterSidebar, MainLayoutRoot, Sidebar } from "./layout";

//======================================
export function ContentLayout({
	children,
	FilterSidebarChildren,
}: {
	children: React.ReactNode;
	FilterSidebarChildren?: React.ReactNode;
}) {
	const matchRoute = useMatchRoute();
	return (
		<div className="">
			<MainLayoutRoot className="gap-2 max-w-[86rem] mx-auto">
				<Sidebar className="md:sticky top-0 pt-4 sm:px-4 ">
					<div className="flex flex-col gap-6">
						{sidebarLinks.map(({ Icon, label, to }) => (
							<Link to={to} key={label}>
								<Button
									variant={matchRoute({ to }) ? "secondary" : "ghost"}
									className="w-full border-none rounded-none justify-start"
								>
									<Icon />
									{label}
								</Button>
							</Link>
						))}
					</div>
				</Sidebar>
				<Content className="border-x">
					<div className="border-b">
						<SourceSearch />
					</div>
					<div className="border-x max-w-3xl w-full mx-auto">
						<div className="px-3 relative">
							<div
								className="absolute inset-0 z-0"
								style={{
									backgroundImage:
										"repeating-linear-gradient(45deg, transparent, transparent 2px, var(--accent) 2px, var(--accent) 4px)",
								}}
							/>
							<div className="bg-background w-full mx-auto z-20 isolate">
								<Suspense
									fallback={
										<div className="flex items-center justify-center h-full p-10">
											Loading...
										</div>
									}
								>
									<ErrorBoundary
										FallbackComponent={() => <div>Something went wrong</div>}
									>
										{children}
									</ErrorBoundary>
								</Suspense>
							</div>
						</div>
					</div>
				</Content>
				{FilterSidebarChildren && (
					<FilterSidebar className="sticky top-0 pl-4">
						{FilterSidebarChildren}
					</FilterSidebar>
				)}
			</MainLayoutRoot>
		</div>
	);
}
