//======================================
export function Footer() {
	return (
		<footer className="text-center justify-center flex items-center min-h-13 w-full border-t bg-accent">
			<div className="flex flex-col items-center py-2">
				<p>© {new Date().getFullYear()} DeepReact</p>
				<p className="text-xs text-muted-foreground">Website may contain affiliate links.</p>
			</div>
		</footer>
	);
}
