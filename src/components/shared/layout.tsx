import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

//======================================
const MainLayoutRoot = ({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"grid md:grid-cols-12 lg:grid-cols-12 items-start @container/main-layout",
				className,
			)}
		>
			{children}
		</div>
	);
};

const Sidebar = ({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) => (
	<>
		<aside
			className={cn("md:col-span-3 lg:col-span-2 hidden md:block", className)}
		>
			{children}
		</aside>
		<div className="md:hidden">
			<Drawer direction="bottom">
				<div className="px-8 py-3">
					<DrawerTrigger asChild>
						<Button variant="outline" className="justify-between w-full">
							Category
							<ArrowRight />
						</Button>
					</DrawerTrigger>
				</div>

				<DrawerContent>
					<DrawerHeader className="border-b ">
						<DrawerTitle>Favorites list</DrawerTitle>
						{/* <DrawerDescription>Any content goes here.</DrawerDescription> */}
					</DrawerHeader>
					<div className="px-5 py-4">{children}</div>
					{/* ...drawer body... */}
				</DrawerContent>
			</Drawer>
		</div>
	</>
);

const FilterSidebar = ({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) => (
	<div className={cn("col-span-2 hidden lg:block pt-1 md:pt-4", className)}>
		<ScrollArea className="h-[calc(100vh-20rem)] ">{children}</ScrollArea>
	</div>
);

const Content = ({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) => (
	<section
		className={cn("md:col-span-9 lg:col-span-8 min-h-screen", className)}
	>
		{children}
	</section>
);

export { Content, FilterSidebar, Sidebar, MainLayoutRoot };
