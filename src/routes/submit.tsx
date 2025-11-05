import { createFileRoute } from "@tanstack/react-router";
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
		<div className="h-full w-full p-2 sm:p-5 md:p-8 lg:p-10 bg-accent">
			<div className="max-w-4xl mx-auto w-full">
				<SourceSubmissionForm />
			</div>
		</div>
	);
}
