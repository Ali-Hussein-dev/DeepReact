import { Menu } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type SidebarSectionProps = {
	children: React.ReactNode;
	className?: string;
};

export const SidebarWrapper = ({
	children,
	className,
}: SidebarSectionProps) => {
	return (
		<aside className={cn("flex h-full w-64 flex-col min-h-full", className)}>
			{children}
		</aside>
	);
};

export const SidebarContent = ({
	children,
	className,
}: SidebarSectionProps) => {
	return (
		<div className={cn("flex-1 overflow-y-auto p-4", className)}>
			{children}
		</div>
	);
};

type SidebarProps = {
	children: React.ReactNode;
	trigger?: React.ReactNode;
	className?: string;
};

export const Sidebar = ({ children, trigger, className }: SidebarProps) => {
	const defaultTrigger = (
		<Button variant="ghost" size="icon" aria-label="Open sidebar">
			<Menu className="size-5" />
		</Button>
	);

	return (
		<div className={cn("relative", className)}>
			<div className="hidden md:flex">
				<SidebarWrapper>
					<SidebarContent>{children}</SidebarContent>
				</SidebarWrapper>
			</div>

			<div className="md:hidden">
				<Drawer direction="left">
					<DrawerTrigger asChild>{trigger ?? defaultTrigger}</DrawerTrigger>
					<DrawerContent className="p-0 data-[vaul-drawer-direction=left]:w-80">
						<SidebarWrapper>
							<SidebarContent>{children}</SidebarContent>
						</SidebarWrapper>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
};
