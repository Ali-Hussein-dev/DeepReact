import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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
import { useCategoryRoute } from "@/hooks/use-category-route";

export const Route = createFileRoute("/content/hosting")({
	component: RouteComponent,
});

function RouteComponent() {
	const { sources } = useCategoryRoute({
		category: "hosting",
	});
	return (
		<ContentLayout>
			<div className="h-full">
				<div className="max-w-xl lg:max-w-3xl mx-auto w-full border-x gap-1 bg-accent/40">
					<div>
						{sources?.map((source) => (
							<div key={source._id} className="border-b">
								<Card
									key={source._id}
									className="bg-transparent border-none shadow-none group"
								>
									<CardHeader className="flex gap-4">
										<img
											src={source.logo_url}
											alt={source.name}
											className="size-10"
										/>
										<div className="flex flex-col gap-1">
											<CardTitle>{source.name}</CardTitle>
											<CardDescription>{source.description}</CardDescription>
										</div>
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
