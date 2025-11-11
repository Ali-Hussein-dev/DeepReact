/** biome-ignore-all lint/correctness/useUniqueElementIds: <this is not of your business biome> */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "motion/react";
import React, { Activity } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/components/ui/multi-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/categories";
import { filterTags } from "@/constants/filter-tags";
import { getWebsiteMetadata } from "@/server/get-website-metadata";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

export const formSchema = z.object({
	name: z.string({ error: "This field is required" }),
	url: z.url({ error: "Please enter a valid url" }),
	category: z.string().min(1, "Please select an item"),
	logo_url: z.string({ error: "Please enter a valid url" }),
	description: z.string({ error: "This field is required" }),
	email: z.email({ error: "Please enter a valid email" }),

	// optional fields
	affiliate_url: z.url({ error: "Please enter a valid url" }).optional(),
	tags: z.array(z.string()),
	github_url: z.url({ error: "Please enter a valid url" }).optional(),
	og_image_url: z.string({ error: "Please enter a valid url" }).optional(),
	subscribed: z.boolean({ error: "This field is required" }).optional(),
	note: z.string().optional(),
	github: z
		.object({
			url: z.string(),
			stars: z.number(),
		})
		.optional(),
});
type Schema = z.infer<typeof formSchema>;

const PreviewCard = ({
	logo_url,
	// og_image_url,
	name,
	description,
}: {
	logo_url?: string;
	og_image_url?: string;
	name?: string;
	description?: string;
}) => {
	if (!logo_url && !name && !description) return null;
	return (
		<Card className="grow max-w-92 bg-transparent border-none shadow-none">
			<CardContent className="grid grid-cols-6 items-center gap-4">
				{logo_url && (
					<div className="w-10 h-10 grow col-span-1">
						<img
							src={logo_url}
							alt="logo"
							width={12}
							height={12}
							className="object-fill size-fit"
						/>
					</div>
				)}
				<div className="flex flex-col gap-1.5 col-span-5">
					<CardTitle>{name ?? ""}</CardTitle>
					<CardDescription className="line-clamp-2">
						<p>{description ?? ""}</p>
					</CardDescription>
				</div>
				{/* {og_image_url && (
				<div className="aspect-video max-h-44 rounded-md overflow-hidden">
					<img src={og_image_url} alt="og_image" className="object-cover" />
				</div>
			)} */}
			</CardContent>
		</Card>
	);
};

export function SourceSubmissionForm() {
	const form = useForm<Schema>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});
	const addSource = useAction(api.sources.submitSource);
	const { handleSubmit, formState } = form;
	const RepoAction = useAction(api.actions.getRepoInfoAction);
	const onSubmit = async ({ github_url = "", ...data }: Schema) => {
		let github: undefined | { url: string; stars: number };
		if (github_url) {
			const repoInfo = await RepoAction({ url: github_url });
			github = repoInfo;
		}
		const options = filterTags[data.category as keyof typeof filterTags] ?? [];
		const labelByValue = new Map(options.map((o) => [o.value, o.label]));
		const tags =
			data.tags.map((value) => ({
				label: labelByValue.get(value) ?? value,
				value,
			})) || [];
		await addSource({ ...data, tags, github });
		toast.success("Source submitted successfully");
	};
	const watchCategory = useWatch({
		control: form.control,
		name: "category",
	});
	// reset the value of tags when category changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <ignor...>
	React.useEffect(() => {
		form.setValue("tags", []);
	}, [watchCategory]);

	const { isSubmitting, isSubmitSuccessful } = formState;
	const onUrlBlur = () => {
		const url = form.watch("url");
		if (url) {
			getWebsiteMetadata({ data: { url } }).then((data) => {
				form.setValue("logo_url", data.logo_url as string);
				form.setValue("description", data.description as string);
				form.setValue("og_image_url", data.og_image_url as string);
				form.setValue("name", data.title as string);
			});
		}
	};

	if (isSubmitSuccessful) {
		return (
			<div className="p-2 sm:p-5 md:p-8 w-full bg-background gap-2 border">
				<motion.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
					className="h-full py-6 px-3"
				>
					<motion.div
						initial={{ scale: 0.5 }}
						animate={{ scale: 1 }}
						transition={{
							delay: 0.3,
							type: "spring",
							stiffness: 500,
							damping: 15,
						}}
						className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
					>
						<Check className="size-8" />
					</motion.div>
					<h2 className="text-center text-2xl text-pretty font-bold mb-2">
						Thank you
					</h2>
					<p className="text-center text-lg text-pretty text-muted-foreground">
						Form submitted successfully, we will review your submission and get
						back to you
					</p>
				</motion.div>
				<div className="flex gap-4 mx-auto border-t pt-4 justify-center ">
					<Button variant="outline">
						<ArrowLeft />
						Back
					</Button>
					<Button onClick={() => form.reset()}>Submit another</Button>
				</div>
			</div>
		);
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col w-full gap-2 border bg-background p-2"
		>
			{/* <div>
				{formState.errors && (
					<p className="text-red-500 text-sm">
						{JSON.stringify(formState.errors)}
					</p>
				)}
			</div> */}
			<div className="flex md:flex-row flex-col items-center justify-between gap-4 border-b p-2 sm:p-5 md:p-8">
				<div>
					<h1 className="mt-6 mb-2 font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight">
						Recommend a React Gem
					</h1>
					<p className="tracking-wide text-muted-foreground mb-5 text-wrap text-sm">
						Found something cool for React devs? Share your go-to packages, or
						tutorials, with DeepReact.
					</p>
				</div>
				<PreviewCard
					logo_url={form.watch("logo_url")}
					og_image_url={form.watch("og_image_url")}
					name={form.watch("name")}
					description={form.watch("description")}
				/>
			</div>
			<FieldGroup className="p-2 sm:p-5 md:p-8">
				<Controller
					name="url"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="gap-1">
							<FieldLabel htmlFor="url">URL to source *</FieldLabel>
							<Input
								{...field}
								onBlur={onUrlBlur}
								id="url"
								type="text"
								onChange={(e) => {
									field.onChange(e.target.value);
								}}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your text"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="gap-1">
							<FieldLabel htmlFor="email">Email *</FieldLabel>
							<Input
								{...field}
								id="name"
								type="email"
								aria-invalid={fieldState.invalid}
								placeholder="Enter your email"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<div className="flex gap-3 w-full">
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="gap-1">
								<FieldLabel htmlFor="name">Name *</FieldLabel>
								<Input
									{...field}
									id="name"
									type="text"
									onChange={(e) => {
										field.onChange(e.target.value);
									}}
									aria-invalid={fieldState.invalid}
									placeholder="what is the name of the resource"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<Controller
					name="description"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="gap-1">
							<FieldLabel htmlFor="description">Description *</FieldLabel>
							<Textarea
								{...field}
								id="description"
								aria-invalid={fieldState.invalid}
								placeholder="Enter your description"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<div className="flex gap-3 w-full">
					<Controller
						name="logo_url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="gap-1">
								<FieldLabel htmlFor="logo_url">Logo URL *</FieldLabel>
								<Input
									{...field}
									id="logo_url"
									type="text"
									onChange={(e) => {
										field.onChange(e.target.value);
									}}
									aria-invalid={fieldState.invalid}
									placeholder="Enter your text"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<div className="flex gap-3 w-full">
					<Controller
						name="affiliate_url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="gap-1">
								<FieldLabel htmlFor="affiliate_url">Affiliate link </FieldLabel>
								<Input
									{...field}
									id="affiliate_url"
									type="text"
									onChange={(e) => {
										field.onChange(e.target.value);
									}}
									aria-invalid={fieldState.invalid}
									placeholder="Affiliate url"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="github_url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="gap-1">
								<FieldLabel htmlFor="github_url">Github link </FieldLabel>
								<Input
									{...field}
									id="github_url"
									type="text"
									onChange={(e) => {
										field.onChange(e.target.value);
									}}
									aria-invalid={fieldState.invalid}
									placeholder="Github url"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<div className="flex gap-3 w-full">
					<Controller
						name="category"
						control={form.control}
						render={({ field, fieldState }) => {
							const options = categories;
							return (
								<Field data-invalid={fieldState.invalid} className="gap-1">
									<FieldLabel htmlFor="category">Select category *</FieldLabel>

									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select an option" />
										</SelectTrigger>
										<SelectContent>
											{options.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							);
						}}
					/>
					<Activity
						mode={
							["courses", "shadcn", "templates", "packages"].includes(
								watchCategory,
							)
								? "visible"
								: "hidden"
						}
					>
						<Controller
							name="tags"
							control={form.control}
							render={({ field, fieldState }) => {
								const options =
									filterTags[
										form.watch("category") as keyof typeof filterTags
									] || [];
								return (
									<Field
										data-invalid={fieldState.invalid}
										className="gap-1 [&_p]:pb-1"
									>
										<FieldLabel htmlFor="tags">Filter tags *</FieldLabel>
										{/* <FieldDescription>
											Choose relevant tags to make your resource easier to find
										</FieldDescription> */}
										<MultiSelect
											values={field.value ?? []}
											onValuesChange={(value) => field.onChange(value ?? [])}
										>
											<MultiSelectTrigger>
												<MultiSelectValue placeholder="Select one tag or more" />
											</MultiSelectTrigger>
											<MultiSelectContent>
												{options.map(({ label, value }) => (
													<MultiSelectItem key={value} value={value}>
														{label}
													</MultiSelectItem>
												))}
											</MultiSelectContent>
										</MultiSelect>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								);
							}}
						/>
					</Activity>
				</div>
				<Activity
					mode={
						["courses", "shadcn"].includes(form.watch("category"))
							? "visible"
							: "hidden"
					}
				>
					<Controller
						name="og_image_url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} className="gap-1">
								<FieldLabel htmlFor="og_image_url">OG Image URL </FieldLabel>
								<Input
									{...field}
									id="og_image_url"
									type="text"
									onChange={(e) => {
										field.onChange(e.target.value);
									}}
									aria-invalid={fieldState.invalid}
									placeholder="Enter your text"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</Activity>
				<Controller
					name="note"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="gap-1">
							<FieldLabel htmlFor="note">Note</FieldLabel>
							<Textarea
								{...field}
								id="note"
								aria-invalid={fieldState.invalid}
								placeholder="Enter your note"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="subscribed"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="gap-1">
							<div className="flex items-center gap-2 mb-1">
								<Checkbox
									id="subscribed"
									checked={field.value}
									onCheckedChange={field.onChange}
									aria-invalid={fieldState.invalid}
								/>
								<FieldLabel htmlFor="subscribed">
									I'd like to receive free email updates
								</FieldLabel>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<div className="flex justify-end items-center w-full border-t p-2 sm:p-5 md:p-8 gap-4">
				<Button
					type="button"
					variant="outline"
					onClick={() => form.reset()}
					size="lg"
				>
					Reset
				</Button>
				<Button type="submit" className="rounded-lg" size="lg">
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</div>
		</form>
	);
}
