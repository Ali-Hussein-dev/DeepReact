import {
	createFileRoute,
	Link,
	useParams,
	useSearch,
} from "@tanstack/react-router";
import { ArrowUpRight, XIcon } from "lucide-react";
import { CiStar } from "react-icons/ci";
import { z } from "zod";
import { MarkButton } from "@/components/mark-button";
import { ContentLayout } from "@/components/shared/content-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { packagesTags } from "@/constants/filter-tags";
import { useCategoryRoute } from "@/hooks/use-category-route";
import { filterByTagValues } from "@/lib/utils";

const searchSchema = z.object({
	// Keep as a comma-separated string (your current approach)
	filter: z.string().optional(),
});
export const Route = createFileRoute("/content/packages")({
	validateSearch: (search) => searchSchema.parse(search),
	component: RouteComponent,
});
function FilterSidebar() {
	const search = useSearch({ from: "/content/packages" });
	const activeTags =
		typeof search.filter === "string" && search.filter.length
			? search.filter.split(",")
			: [];
	return (
		<div className="border-l border-dashed pl-3">
			{packagesTags.map((o) => {
				const isActive = activeTags.includes(o.value);
				return (
					<Button
						key={o.value}
						size="sm"
						// variant={isActive ? "outline" : "ghost"}
						variant={"ghost"}
						className="justify-between w-full text-sm"
						asChild
					>
						<Link
							to="."
							search={(prev) => {
								const prevList = Array.isArray(prev.filter)
									? prev.filter
									: typeof prev.filter === "string" && prev.filter.length
										? prev.filter.split(",").filter(Boolean)
										: [];
								const exists = prevList.includes(o.value);
								const nextList = exists
									? prevList.filter((v) => v !== o.value)
									: [...prevList, o.value];
								if (nextList.length === 0) {
									const { filter, ...rest } = prev as Record<string, unknown>;
									return rest as typeof prev;
								}
								return { ...prev, filter: nextList.join(",") };
							}}
						>
							{o.label}
							{isActive ? (
								<span className="">
									<XIcon />
								</span>
							) : (
								""
							)}
						</Link>
					</Button>
				);
			})}
		</div>
	);
}

function RouteComponent() {
	const { sources } = useCategoryRoute({
		category: "packages",
	});
	const searchParam = useSearch({ from: "/content/packages" });
	const filteredSources = filterByTagValues(sources, searchParam?.filter);

	return (
		<ContentLayout FilterSidebarChildren={<FilterSidebar />}>
			<div className="h-full">
				<div className="max-w-xl lg:max-w-3xl mx-auto w-full border-x gap-1 bg-accent/40">
					<div>
						{filteredSources?.map((source) => (
							<div key={source._id} className="border-b">
								<Card
									key={source._id}
									className="bg-transparent border-none shadow-none group"
								>
									<CardHeader className="flex gap-4 w-full">
										<img
											src={source.logo_url}
											alt={source.name}
											className="size-10"
										/>
										<div className="flex flex-col gap-1 grow">
											<CardTitle>{source.name}</CardTitle>
											<CardDescription className="line-clamp-1 md:line-clamp-2">
												{source.description}
											</CardDescription>
										</div>
										{source.github && (
											<div className="flex justify-start items-center gap-1 text-lime-400">
												<CiStar size="18" />

												{source.github?.stars > 1000
													? `${(source.github.stars / 1000).toFixed(1)}k`
													: source.github?.stars}
											</div>
										)}
									</CardHeader>
									<CardFooter className="justify-end gap-3">
										<div className="flex gap-2 grow opacity-0 group-hover:opacity-100">
											{source.tags?.map((tag) => (
												<Badge
													key={tag.value}
													variant="outline"
													className="px-2 py-1.5"
												>
													{tag.label}
												</Badge>
											))}
										</div>
										<MarkButton id={source._id} source={source} />
										<Button asChild variant="outline">
											<a href={source.url} target="_blank">
												View
												<ArrowUpRight />
											</a>
										</Button>
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</ContentLayout>
	);
}
