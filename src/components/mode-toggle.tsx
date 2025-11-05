"use client";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	return (
		<Button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			size="icon"
			variant="ghost"
			aria-label="Theme"
			type="button"
			className="size-8"
		>
			<svg
				viewBox="0 0 32 32"
				width="24"
				height="24"
				fill="currentcolor"
				className="block"
			>
				<title>Theme</title>
				<circle
					cx="16"
					cy="16"
					r="14"
					fill="none"
					stroke="currentcolor"
					strokeWidth="4"
				></circle>
				<path
					d="
        M 16 0
        A 16 16 0 0 0 16 32
        z"
				></path>
			</svg>
		</Button>
	);
}
