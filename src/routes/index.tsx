import { createFileRoute, Link } from "@tanstack/react-router";
import { Newsletter } from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "DeepReact" },
		],
	}),
});

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

// const logos = [
// 	{
// 		src: "https://cdn.brandfetch.io/id8SBm2SUH/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1760696691779",
// 	},
// 	{
// 		src: "https://tanstack.com/images/logos/logo-color-600.png",
// 	},
// 	{
// 		src: "https://cdn.brandfetch.io/idJ3Cg8ymG/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1668515610854",
// 	},
];
function App() {
	return (
		<div className="min-h-[calc(100vh-4rem)] bg-background text-foreground flex flex-col w-full">
			<Background
				className="max-w-full size-full grow"
				parentClassName="grid grid-cols-14 min-h-screen h-full"
			>
				<div className="border-x h-full bg-background col-start-2 col-end-14 grow">
					<div className="p-4 md:p-10 lg:p-12  grid place-items-center h-[85vh]">
						<div className="flex items-center flex-col gap-3 justify-between pb-10">
							<h1 className="text-2xl font-bold md:text-4xl lg:text-5xl lg:font-extrabold">
								Deep Dive into the <span className="text-[#58919e]">React</span>{" "}
								Ecosystem
							</h1>
							<p className="text-muted-foreground pb-3 lg:text-lg">
								Discover top tools and resources without digging around
							</p>
							<div className="flex items-center gap-3">
								<Button>
									<Link to="/content/templates">Discover</Link>
								</Button>
							</div>
							{/* <div className="flex items-center flex-col gap-3 pt-8 font-medium text-lg">
								Built with
								<div className="flex gap-4">
									{logos.map((logo) => (
										<img
											key={logo.src}
											src={logo.src}
											alt="logo"
											width="42"
											height="42"
											className="rounded-full"
										/>
									))}
								</div>
							</div> */}
						</div>
					</div>
					<Newsletter />
				</div>
			</Background>
			<footer className="text-center justify-center flex items-center min-h-13 w-full border-t">
				<p>© {new Date().getFullYear()} DeepReact</p>
			</footer>
		</div>
	);
}
