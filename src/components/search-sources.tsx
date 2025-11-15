"use client";
import { useConvexAction } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { api } from "convex/_generated/api";
import { ExternalLink, Loader2, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import type { Source } from "../../convex/schema";
import { Badge } from "./ui/badge";

export function SourceSearch() {
	// const navigate = useNavigate();
	const searchParams = useSearch({ strict: false }) as { q?: string };

	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	// Get the query from URL params
	const urlQuery = searchParams.q || "";

	const similarSources = useConvexAction(api.actions.similarSources);

	// Initialize search query from URL params on mount
	useEffect(() => {
		if (urlQuery) {
			setSearchQuery(urlQuery);
			setOpen(true); // Open command palette if there's a search query
		}
	}, [urlQuery]);

	// Use TanStack Query for automatic loading, error handling, and caching
	const {
		data: searchResults,
		isLoading,
		error,
		isError,
	} = useQuery({
		queryKey: ["similarSources", searchQuery],
		queryFn: () => {
			console.log("Executing search for:", searchQuery); // Debug log
			return similarSources({ descriptionQuery: searchQuery });
		},
		enabled: !!searchQuery.trim(), // Only run query when we have a search term
		staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
		gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
	});

	// Handle Ctrl+K shortcut
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const handleSelect = useCallback((source: Source) => {
		// Open the source URL in a new tab
		window.open(source.url, "_blank", "noopener,noreferrer");
		setOpen(false);
	}, []);

	const handleSearchChange = (value: string) => {
		console.log("Search changed to:", value); // Debug log
		setSearchQuery(value);
		// Don't update URL immediately to avoid circular updates
		// URL will be updated when user stops typing or selects a result
	};
	const isResults =
		!isLoading && !isError && searchResults && searchResults.length > 0;
	return (
		<>
			{/* Trigger Button */}
			<div className="w-full max-w-3xl mx-auto py-4">
				<Button
					variant="outline"
					className="w-full justify-start text-muted-foreground active:scale-100 h-12 border-none bg-transparent dark:bg-transparent shadow-none"
					onClick={() => setOpen(true)}
					size="lg"
				>
					<Search className="mr-2 size-4" />
					Search sources...
					<KbdGroup className="ml-auto">
						<Kbd className="size-7">⌘</Kbd>
						<Kbd className="size-7">K</Kbd>
					</KbdGroup>
				</Button>
			</div>

			{/* Command Dialog */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="overflow-hidden p-0 sm:max-w-3xl">
					<DialogHeader className="sr-only">
						<DialogTitle>Search Sources</DialogTitle>
						<DialogDescription>
							Search for similar sources using semantic vector search
						</DialogDescription>
					</DialogHeader>
					<Command className="p-5">
						<CommandInput
							placeholder="Describe what you're looking for..."
							value={searchQuery}
							onValueChange={handleSearchChange}
						/>
						<CommandList className="max-h-[calc(100vh-14rem)]">
							{/* Debug info */}
							{/* 
								<div className="px-2 py-2 text-xs text-muted-foreground border-b">
									Debug: Query="{searchQuery}" | Loading={isLoading.toString()}{" "}
									| Results={searchResults?.length || 0} | Error=
									{isError.toString()}
								</div>
							 */}

							{isLoading && (
								<div className="flex items-center justify-center py-6">
									<Loader2 className="size-4 animate-spin" />
									<span className="ml-2 text-sm text-muted-foreground">
										Searching...
									</span>
								</div>
							)}

							{isError && error && (
								<div className="px-2 py-6 text-center text-sm text-red-600">
									Error:{" "}
									{error instanceof Error ? error.message : "An error occurred"}
								</div>
							)}
							{isResults && (
								<CommandGroup
									heading={`Sources (${searchResults.length})`}
									className=""
								>
									{searchResults.map((source: Source) => (
										<CommandItem
											key={source._id}
											value={`${source.name} ${source.description}`}
											onSelect={() => handleSelect(source)}
											className="flex items-center gap-3 cursor-pointer mb-3 group"
										>
											<Image
												src={source.logo_url}
												width={32}
												height={32}
												className="rounded-full shrink-0"
												alt={source.name}
											/>
											<div className="flex-1 min-w-0">
												<div className="font-medium truncate">
													{source.name}
												</div>
												<div className="text-sm text-muted-foreground line-clamp-2">
													{source.description}
												</div>
												<Badge className="rounded-xs mt-1" variant="outline">
													<span className="first-letter:uppercase">
													{source.category}
													</span>
												</Badge>
											</div>
											<ExternalLink className="size-4 opacity-0 text-muted-foreground shrink-0 group-hover:opacity-100" />
										</CommandItem>
									))}
								</CommandGroup>
							)}

							{!isLoading &&
								!isError &&
								searchQuery &&
								(!searchResults || searchResults.length === 0) && (
									<CommandEmpty>No sources found.</CommandEmpty>
								)}

							{!searchQuery && (
								<div className="px-2 py-6 text-center text-sm text-muted-foreground">
									Start typing to search for sources...
								</div>
							)}
						</CommandList>
						{isResults && (
							<div className="border-t pt-4 text-xs text-muted-foreground flex justify-center">
								Powered by Convex
							</div>
						)}
					</Command>
				</DialogContent>
			</Dialog>
		</>
	);
}
