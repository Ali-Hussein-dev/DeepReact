import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export const Route = createFileRoute("/")({ component: App });

const Background = ({
	children,
	className,
	parentClassName,
}: {
	children: React.ReactNode;
	// root class name
	className?: string;

	// parent class name
	parentClassName?: string;
}) => (
	<div className={cn("max-w-3xl px-3 mx-auto relative", className)}>
		<div
			className="absolute inset-0 z-0"
			style={{
				backgroundImage:
					"repeating-linear-gradient(45deg, transparent, transparent 2px, var(--accent) 2px, var(--accent) 4px)",
			}}
		/>
		<div className={cn("z-10 isolate size-full", parentClassName)}>
			{children}
		</div>
	</div>
);
function App() {
	return (
		<div className="min-h-[calc(100vh-4rem)] bg-background text-foreground flex flex-col w-full">
			<Background
				className="max-w-full size-full grow"
				parentClassName="grid grid-cols-14 h-[calc(100vh-7rem)]"
			>
				<div className="border-x h-full bg-background p-4 md:p-10 lg:p-12 col-start-2 col-end-14 grid place-items-center grow">
					<div className="flex items-center flex-col gap-3 justify-between pb-10">
						<h1 className="text-2xl font-bold md:text-4xl lg:text-5xl lg:font-extrabold">
							Deep Dive into <span className="text-[#58919e]">React</span>{" "}
							Ecosystem
						</h1>
						<p className="text-muted-foreground pb-3 lg:text-lg">
							Discover top tools and resources without digging around
						</p>
						<Button>
							<Link to="/content/templates">Discover</Link>
						</Button>
					</div>
				</div>
			</Background>
			<footer className="text-center justify-center flex items-center min-h-13 w-full border-t">
				<p>© {new Date().getFullYear()} DeepReact</p>
			</footer>
		</div>
	);
}
