import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { SourceSubmissionForm } from "@/components/submission-form";

export const Route = createFileRoute("/submit")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Submit",
			},
			{
				description: "Submit your resources to DeepReact",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<>
			<div className="h-full w-full p-1.5 sm:py-5 md:py-8 lg:py-16 min-h-[calc(100vh-7.4rem)]">
				<div className="max-w-4xl mx-auto w-full">
					<SourceSubmissionForm />
				</div>
			</div>
			<Footer />
		</>
	);
}
