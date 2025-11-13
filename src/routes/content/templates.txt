import {
	createFileRoute,
	Link,
	redirect,
	useSearch,
} from "@tanstack/react-router";
import { ArrowUpRight, XIcon } from "lucide-react";
import { CgShapeCircle } from "react-icons/cg";
import { z } from "zod";
import { MarkButton } from "@/components/mark-button";
import { ContentLayout } from "@/components/shared/content-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { templatesTags } from "@/constants/filter-tags";
import { useCategoryRoute } from "@/hooks/use-category-route";
import { filterByTagValues } from "@/lib/utils";

const searchSchema = z.object({
	// Keep as a comma-separated string (your current approach)
	filter: z.string().optional(),
});

export const Route = createFileRoute("/content/templates")({
	beforeLoad: () => {
		// const isDisabled = true; // your condition
		// if (isDisabled) {
		// }
		throw redirect({ to: "/" }); // redirect to home or another route
	},
	validateSearch: (search) => searchSchema.parse(search),
	component: RouteComponent,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "DeepReact Templates" },
		],
	}),
});
function FilterSidebar() {
	const search = useSearch({ from: "/content/templates" });
	const activeTags =
		typeof search.filter === "string" && search.filter.length
			? search.filter.split(",")
			: [];
	return (
		<div className="">
			{Object.entries(Object.groupBy(templatesTags, (tag) => tag.group)).map(
				([group, list]) => (
					<div key={group}>
						<h3 className="font-semibold text-sm text-muted-foreground">
							<CgShapeCircle className="size-3.5 inline-block rounded-full mr-3" />
							{group}
						</h3>
						<div className="pl-[7px]">
							<div className="py-2 flex flex-col gap-2 border-l border-dashed pl-3">
								{list?.map((t) => {
									const isActive = activeTags.includes(t.value);
									return (
										<Button
											key={t.value}
											// size="sm"
											// variant={isActive ? "outline" : "ghost"}
											variant={"ghost"}
											className="justify-between"
											asChild
										>
											<Link
												to="."
												search={(prev) => {
													const prevList = Array.isArray(prev.filter)
														? prev.filter
														: typeof prev.filter === "string" &&
																prev.filter.length
															? prev.filter.split(",").filter(Boolean)
															: [];
													const exists = prevList.includes(t.value);
													const nextList = exists
														? prevList.filter((v) => v !== t.value)
														: [...prevList, t.value];
													if (nextList.length === 0) {
														const { filter, ...rest } = prev as Record<
															string,
															unknown
														>;
														return rest as typeof prev;
													}
													return { ...prev, filter: nextList.join(",") };
												}}
											>
												{t.label}{" "}
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
						</div>
					</div>
				),
			)}
		</div>
	);
}

function RouteComponent() {
	const { sources } = useCategoryRoute({
		category: "templates",
	});
	const searchParam = useSearch({ from: "/content/templates" });
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
									<CardHeader className="grid grid-rows-[auto] grid-cols-[auto_1fr] items-center lg:gap-4">
										<div className="relative aspect-video rounded-md overflow-hidden max-w-40 h-full w-full border shrink-0 hidden lg:block">
											<img
												src={source.og_image_url}
												alt={source.name}
												className="object-cover size-full"
											/>
										</div>
										<img
											src={source.logo_url}
											alt={source.name}
											className="size-10 lg:hidden"
										/>
										<div className="flex flex-col gap-1">
											<CardTitle>{source.name}</CardTitle>
											<CardDescription className="line-clamp-1 sm:line-clamp-2">
												{source.description}
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent>
										<div className="gap-2 grow group-hover:flex hidden flex-wrap">
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
									</CardContent>
									<CardFooter className="justify-end gap-3">
										<MarkButton source={source} />
										{/* <Button
											size="icon"
											variant="ghost"
											onClick={() => {
												if (isMarked(source._id)) {
													removeItem(source._id);
													return;
												}
												addItem(source);
											}}
										>
											{isMarked(source._id) ? (
												<BsBookmarkFill className="size-4.5" />
											) : (
												<BsBookmarkPlus className="size-4.5" />
											)}
										</Button> */}
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
