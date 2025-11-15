import { createFileRoute, Link } from "@tanstack/react-router";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { Footer } from "@/components/footer";
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

		<div className={cn("z-10 isolate relative size-full", parentClassName)}>
			{children}
		</div>
	</div>
);

function App() {
	return (
		<div className="min-h-[calc(100vh-4rem)] bg-background text-foreground flex flex-col w-full">
			<Background
				className="max-w-full size-full grow"
				parentClassName="grid grid-cols-20 min-h-screen h-full"
			>
				<div className="border-x h-full bg-background col-start-1 md:col-start-2 grow md:col-end-20 col-end-21">
					<div className="p-4 md:p-10 lg:p-12  grid place-items-center h-[85vh] relative">
						<HoleBackground className="absolute inset-0 flex items-center justify-center rounded-xl" />
						<div className="flex items-center flex-col gap-3 justify-between pb-10 z-10 isolate">
							<h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl md:font-black text-center tracking-tight">
								Deep Dive into the <span className="text-[#58919e]">React</span>{" "}
								Ecosystem
							</h1>
							<p className="pb-3 lg:text-lg text-center font-medium">
								Discover top tools and resources without digging around
							</p>
							<div className="flex items-center gap-3">
								<Link to="/content/courses">
									<Button size="lg" className="text-lg">Discover</Button>
								</Link>
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
			<Footer />
		</div>
	);
}
