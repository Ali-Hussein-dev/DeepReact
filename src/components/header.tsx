"use client";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { urls } from "@/constants/urls";
import { FavoritesList } from "./favorites-list";
import { Logo } from "./shared/logo";

// const links = [
// 	// {
// 	//   label: "Roadmap",
// 	//   href: "https://formcn.featurebase.app/",
// 	//   target: "_blank",
// 	//   rel: "noopener noreferrer",
// 	// },
// 	// {
// 	//   label: "Hire me",
// 	//   href: "https://ali-hussein.com",
// 	//   target: "_blank",
// 	//   rel: "noopener noreferrer",
// 	// },
// ];

const socialLinks = [
	{ href: urls.github, Icon: FaGithub },
	{ href: urls.twitter, Icon: FaXTwitter },
];

export function Header() {
	return (
		<header className="flex flex-row items-center justify-between px-2 md:px-4 h-16 border-b">
			<div className="flex gap-1 items-end">
				<Link to="/" className="cursor-pointer w-fit h-fit">
					<Logo />
				</Link>
			</div>

			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center sm:gap-4 gap-2">
				<nav className="flex gap-2 items-center">
					<FavoritesList />
					<Button variant="ghost" size="sm">
						<Link to="/submit">Submit</Link>
					</Button>
					{/* {links.map(({ href, label, target, rel }) => {
              return (
                <Button key={href} variant="ghost" size="sm">
                  <a href={href} target={target} rel={rel}>
                    {label}
                  </a>
                </Button>
              );
            })} */}
				</nav>
				<div className="flex gap-4">
					{socialLinks.map(({ href, Icon }) => {
						return (
							<a
								key={href}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon />
							</a>
						);
					})}
				</div>
				<ModeToggle />
			</div>

			{/* Mobile Dropdown Menu */}
			<div className="md:hidden flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="p-2">
							<Menu size={20} />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="sm:w-56 w-64 px-3 py-4">
						<FavoritesList />
						{/* <DropdownMenuItem asChild>
                <Link href="/changelog" className="w-full">
				Changelog
                </Link>
              </DropdownMenuItem> */}
						{/* {links.map(({ href, label, target, rel }) => {
                return (
					<DropdownMenuItem key={href} asChild>
                    <a href={href} target={target} rel={rel} className="w-full">
					{label}
                    </a>
					</DropdownMenuItem>
					);
					})} */}
						<DropdownMenuSeparator />
						<div className="flex items-center justify-center gap-4 p-2">
							<ModeToggle />
							{socialLinks.map(({ href, Icon }) => {
								return (
									<a
										key={href}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="p-1 hover:bg-accent rounded-md transition-colors"
									>
										<Icon size={16} />
									</a>
								);
							})}
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
