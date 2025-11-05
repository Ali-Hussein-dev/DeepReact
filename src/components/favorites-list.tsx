import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArrowUpRight } from "lucide-react";
import { BsBookmarkDash, BsBookmarkStar } from "react-icons/bs";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

const initialMarkedList = atomWithStorage("deepreact-favorites-list", {});

export const useFavoritesList = () => {
	const [markedListObject, setMarkedListObject] = useAtom(initialMarkedList);
	const addItem = (item: Record<string, any>) => {
		setMarkedListObject((prev) => ({ ...prev, [item._id]: item }));
		toast.success("Item added to marked list");
	};
	const isMarked = (key: string) => {
		return !!markedListObject[key as keyof typeof markedListObject];
	};
	const removeItem = (key: keyof typeof markedListObject) => {
		setMarkedListObject((prev) => {
			const { [key]: _removed, ...rest } = prev;
			return rest;
		});
		toast.success("Item removed from marked list");
	};
	return {
		addItem,
		isMarked,
		markedList: Object.values(markedListObject),
		removeItem,
	};
};

export function FavoritesList() {
	const { markedList, removeItem } = useFavoritesList();
	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="ghost">Favorites list</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader className="border-b ">
					<DrawerTitle>
						<BsBookmarkStar className="size-4 mr-2 inline-block" />
						Favorites list
					</DrawerTitle>
					{/* <DrawerDescription>Any content goes here.</DrawerDescription> */}
				</DrawerHeader>
				<div>
					{markedList?.map((source) => (
						<div key={source._id} className="border-b">
							<Card
								key={source._id}
								className="bg-transparent border-none shadow-none group"
							>
								<CardHeader className="flex gap-4">
									<img
										src={source.logo_url}
										alt={source.name}
										className="size-8"
									/>
									<div className="flex flex-col gap-1">
										<CardTitle>{source.name}</CardTitle>
										<CardDescription>{source.description}</CardDescription>
									</div>
								</CardHeader>
								<CardFooter className="justify-end gap-3">
									<div className="flex gap-1 grow opacity-0 group-hover:opacity-100 flex-wrap">
										{source.tags?.map((tag) => (
											<Badge
												key={tag.value}
												variant="outline"
												className="px-2 py-1 text-xs"
											>
												{tag.label}
											</Badge>
										))}
									</div>
									<Button
										size="icon"
										variant="ghost"
										onClick={() => removeItem(source._id)}
									>
										<BsBookmarkDash />
									</Button>
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
				{/* ...drawer body... */}
			</DrawerContent>
		</Drawer>
	);
}
