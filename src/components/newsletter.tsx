import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { XIcon } from "lucide-react";
import { Activity, useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import {
	AvatarGroup,
	AvatarGroupTooltip,
} from "@/components/animate-ui/components/animate/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type Mode = "visible" | "hidden";
//======================================
export function Subscribe() {
	const [modeManager, setModeManager] = useState<Record<string, Mode>>({
		subscribe: "visible",
		submit: "hidden",
		submitted: "hidden",
	});
	const [email, setEmail] = useState("");
	const mutate = useMutation(api.sources.submitEmail);
	return (
		<div className="w-fit mx-auto">
			<Activity mode={modeManager.subscribe}>
				<Button
					variant="outline"
					className="mx-auto"
					onClick={() =>
						setModeManager((prv) => ({
							...prv,
							subscribe: "hidden",
							submit: "visible",
						}))
					}
				>
					Subscribe
				</Button>
			</Activity>
			<Activity mode={modeManager.submit}>
				<InputGroup className="h-10 w-full max-w-88 mx-auto">
					<InputGroupInput
						autoFocus
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<InputGroupAddon align="inline-end" className="gap-0">
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={() => {
								setEmail("");
								setModeManager((prv) => ({
									...prv,
									submit: "hidden",
									subscribe: "visible",
								}));
							}}
						>
							<XIcon />
						</Button>
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={() => {
								mutate({ email });
								setModeManager((prv) => ({
									...prv,
									submit: "hidden",
									submitted: "visible",
								}));
							}}
						>
							<RiSendPlaneLine />
						</Button>
					</InputGroupAddon>
				</InputGroup>
			</Activity>
			<Activity mode={modeManager.submitted}>
				<div
					className="text-center font-semibold"
					// role="button"
					// tabIndex={0}
					// onClick={() =>
					// 	setModeManager({
					// 		subscribe: "visible",
					// 		submit: "hidden",
					// 		submitted: "hidden",
					// 	})
					// }
				>
					Your're subscribed!
				</div>
			</Activity>
		</div>
	);
}

const experts = [
	{
		name: "Kent C. Dodds",
		subtitle: "Content creator & OSS contributer",
		company: "",
		src: "https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_400x400.jpg",
	},
	{
		name: "Tanner Linsley",
		subtitle: "Creator of Tanstack",
		company: "Tanstack",
		src: "https://pbs.twimg.com/profile_images/1943040832564506624/mbc_FWFV_400x400.jpg",
	},
	{
		name: "Jack Herrington",
		subtitle: "Principal engineer at Blue Collar Coder",
		company: "Blue Collar Coder",
		src: "https://jfaxy2g83mbc3j4t.public.blob.vercel-storage.com/authors/Jack_Herrington-fZl3uKr6sHAi2AIpdgJW9Pkgwimf6Y.png",
	},
	{
		name: "Seif Ghezala",
		subtitle: "Co-founder of Tinloof",
		company: "Tinloof",
		src: "https://jfaxy2g83mbc3j4t.public.blob.vercel-storage.com/authors/Seif_Ghezala-JEW4ucS6myZsAhET3sal9JPjjZgst3.png",
	},
	{
		name: "Dominik",
		subtitle: "Tanstack query maintainer",
		company: "Tanstack",
		src: "https://avatars.githubusercontent.com/u/1021430?s=400",
	},
	{
		name: "Scott Moss",
		subtitle: "CEO & Co-founder of Superfilter AI",
		company: "Superfilter AI",
		src: "https://jfaxy2g83mbc3j4t.public.blob.vercel-storage.com/authors/Scott_Moss-HNcZCeK5Uy38scN4bfUziMZUwUZZEG.png",
	},
	{
		name: "David Khourshid",
		subtitle: "Creator of xState",
		company: "Stately.ai",
		src: "https://pbs.twimg.com/profile_images/619677584805208064/RwwbnNpi_400x400.jpg",
	},
	{
		name: "Matt Biilmann",
		subtitle: "CEO of Netlify",
		company: "Netlify",
		src: "https://pbs.twimg.com/profile_images/560874041452408833/a8obZPqr_400x400.jpeg",
	},
	{
		name: "Vishwas Gopinath",
		subtitle: "DevRel at Builder.io",
		company: "Builder.io",
		src: "https://jfaxy2g83mbc3j4t.public.blob.vercel-storage.com/authors/Vishwas_Gopinath-nwt9fhm3k6bQ37RUhDsMelqi8wcDTo.png",
	},
	{
		name: "Simeon Griggs",
		subtitle: "Principal Educator at Sanity",
		company: "Sanity",
		src: "https://cdn.sanity.io/images/3do82whm/next/b1bfbfe4173a8f7688d37adb45028724f266a74c-792x792.jpg?h=96&w=96&fit=crop&auto=format",
	},
];

const HighlightText = ({ children }: { children: React.ReactNode }) => (
	<span className="bg-linear-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent font-medium">
		{children}
	</span>
);
const Card = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full overflow-hidden">
		<div className="size-full bg-repeat dark:bg-[url(/grid-ellipsis.svg)] bg-[url(/grid-ellipsis-light.svg)] bg-size-[45px_45px]">
			<div className="size-full bg-linear-to-tr dark:from-background dark:via-background/70 dark:to-background">
				{children}
			</div>
		</div>
	</div>
);
//======================================
export function Newsletter() {
	return (
		<div className="border-t w-full p-1.5">
			<Card>
				<div className="">
					<div className="gap-1 p-2 py-8 sm:p-3 lg:p-8 lg:py-20">
						<h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-bold tracking-tighter text-center text-foreground">
							Join the Newsletter
						</h2>
						<p className="pb-8 text-center max-w-xl mx-auto text-secondary-foreground">
							In-depth insights and resources straight into your inbox from the
							minds of <HighlightText>founders</HighlightText>,{" "}
							<HighlightText>lead engineers</HighlightText>,{" "}
							<HighlightText>CTOs</HighlightText>, and{" "}
							<HighlightText>seasoned pros</HighlightText> in the field.
						</p>
						<div className="mb-6">
							<AvatarGroup className="flex-wrap justify-center h-auto">
								{experts.map((expert) => (
									<Avatar
										key={expert.name}
										className="size-12 border-3 border-background"
									>
										<AvatarImage src={expert.src} />
										<AvatarFallback>{expert.name}</AvatarFallback>
										<AvatarGroupTooltip>{expert.name}</AvatarGroupTooltip>
									</Avatar>
								))}
							</AvatarGroup>
						</div>
						<Subscribe />
						{/* <Button asChild className="px-6 rounded-xl gap-2">
						<a href={urls.newsletter}>
							Subscribe
							<MdOutlineArrowOutward size="14" />
						</a>
					</Button>{" "} */}
					</div>
				</div>
			</Card>
		</div>
	);
}
