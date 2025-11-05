import { BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import { useFavoritesList } from "./favorites-list";
import { Button } from "./ui/button";

//======================================
export function MarkButton({
	id,
	source,
}: {
	id: string;
	source: Record<string, any>;
}) {
	const { isMarked, addItem, removeItem } = useFavoritesList();

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
