import type { Source } from "convex/schema";
import { BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import { useFavoritesList } from "@/components/favorites-list";
import { Button } from "@/components/ui/button";

//======================================
export function MarkButton({ source }: { source: Source }) {
	const { isMarked, addItem, removeItem } = useFavoritesList();
	const id = source._id;
	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={() => {
				if (isMarked(id)) {
					removeItem(id);
					return;
				}
				addItem(source);
			}}
		>
			{isMarked(id) ? (
				<BsBookmarkFill className="size-4.5" />
			) : (
				<BsBookmarkPlus className="size-4.5" />
			)}
		</Button>
	);
}
