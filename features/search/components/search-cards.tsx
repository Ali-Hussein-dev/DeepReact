/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  Github,
  Resource,
  ReturnTypeSearchYoutube,
  Webpage,
  Website,
} from "@/supabase/types/db.types";
import { truncate, decodeHtmlEntities } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { YouTubeDialog } from "./youtube-dialog";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CiStar } from "react-icons/ci";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type WebpageCardProps = Pick<Webpage, "link" | "title" | "snippet"> & {
  website: Pick<Website, "title" | "image_url">;
};
//======================================
export function WebpageCard(props: WebpageCardProps) {
  return (
    <Card className="rounded-md border-dashed p-3 shadow-none">
      <CardHeader className="gap-2 space-y-0 flex items-center justify-start flex-row">
        <div className="rounded-full bg-background w-fit">
          {props?.website?.image_url && (
            <img
              src={props.website.image_url}
              alt={props.website.title.at(0)}
              className="size-10 rounded-full object-contain brightness-75"
              loading="lazy"
            />
          )}
        </div>
        <div className="w-full overflow-hidden text-ellipsis flex flex-col items-start justify-center gap-1">
          <Button
            asChild
            variant={"link"}
            className="mt-0 h-auto justify-start gap-0 text-ellipsis px-0 py-0 text-xl"
          >
            <a
              href={props.link}
              target="_blank"
              rel="noreferrer"
              className="line-clamp-1"
            >
              <CardTitle className="line-clamp-1 font-semibold">
                {truncate(decodeHtmlEntities(props.title), 50)}
              </CardTitle>
            </a>
          </Button>
          <span className="text-xs text-muted-foreground/80">
            {props.link
              .replace("https://", "")
              .replace(/\/$/, "")
              .replaceAll("/", " › ")}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{props.snippet}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function CardSkeleton() {
  return <Skeleton className="h-32 w-full md:h-44" />;
}

export type YouTubeCardProps = ReturnTypeSearchYoutube[number];

type ChannelDetails = {
  channel_title: string;
  avatar_url: string;
};
type Thumbnails = {
  medium: {
    url: string;
  };
};
//======================================
export function YouTubeCard(props: YouTubeCardProps) {
  const channel_details = props?.channel_details as ChannelDetails;
  const thumbnails = props?.thumbnails as Thumbnails;
  return (
    <Card className="overlflow-hidden rounded-md border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-start gap-2 space-y-0 p-0">
        {props.video_id ? (
          <YouTubeDialog
            videoId={props.video_id as string}
            thumbnailUrl={thumbnails?.medium?.url as string}
          />
        ) : (
          <div>video_id is not valid {props.video_id}</div>
        )}
        <div className="w-full gap-2 p-0.5 flex flex-col items-start lg:pt-3">
          <CardTitle className="line-clamp-2 font-semibold md:text-lg lg:text-xl pt-1 capitalize leading-5">
            {truncate(decodeHtmlEntities(props.title as string), 50)}
          </CardTitle>
          {/* <CardDescription className="mb-1 line-clamp-1 text-sm md:w-[90%] lg:line-clamp-2">
            {props.description}
          </CardDescription> */}
          <div className="w-full gap-1 pt-1 text-xs md:text-base text-muted-foreground/80 flex justify-start items-center">
            <Avatar>
              <AvatarImage src={channel_details?.avatar_url} />
            </Avatar>
            <span>{channel_details?.channel_title}</span> <span>-</span>
            <span className="">
              {props.published_at &&
                formatDistanceToNow(new Date(props.published_at), {
                  addSuffix: true,
                })}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export type GitHubCardProps = Pick<
  Resource,
  "homepage" | "logo_url" | "name" | "tags" | "og_image_url" | "snippet"
> & {
  github_info: Pick<
    Github,
    | "avatar_url"
    | "description"
    | "homepage"
    | "profile_url"
    | "stars"
    | "last_commit"
  >;
};
//======================================
export function GitHubCard(props: GitHubCardProps) {
  const github_info = props?.github_info;
  const logoUrl = props.logo_url || github_info?.avatar_url;
  return (
    <Card className="flex w-full flex-col border-dashed bg-card/40">
      <CardHeader className="justify-between items-center flex-row flex">
        <CardTitle>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={"logo"}
              className="my-0 mr-2 inline-block size-7 rounded-full border"
            />
          )}
          {props.name}
        </CardTitle>
        {github_info?.stars && (
          <span className="gap-1 justify-start items-center flex-row flex">
            <CiStar size="18" />
            {github_info.stars > 1000
              ? `${(github_info.stars / 1000).toFixed(1)}k`
              : github_info.stars}
          </span>
        )}
      </CardHeader>
      <CardContent className="grow">
        <CardDescription className="line-clamp-2">
          {props.snippet}
        </CardDescription>
        <div className="flex-wrap gap-1.5 py-3 flex justify-start items-center flex-row">
          {props?.tags?.map((tag, i) => (
            <Badge key={i} variant="secondary">
              {/* @ts-expect-error TS is not happy with this */}
              {tag?.label}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t border-dashed py-3 sm:flex-row sm:items-center">
        <div className="w-full grow gap-3 justify-between items-center flex-row flex">
          {github_info?.last_commit ? (
            <div className="text-muted-foreground/80 text-sm">
              Last commit:{" "}
              {formatDistanceToNow(new Date(github_info.last_commit), {
                addSuffix: true,
              })}
            </div>
          ) : (
            <span></span>
          )}
          <div className="gap-2 justify-between items-center flex-row flex">
            {github_info?.profile_url && (
              <Button
                size="icon"
                asChild
                variant="outline"
                className="rounded-lg"
              >
                <a
                  href={`https://github.com/${github_info.profile_url}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <FaGithub size="17" />
                </a>
              </Button>
            )}
            {props?.homepage && (
              <Button asChild variant={"outline"} size="icon">
                <a
                  href={props.homepage}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {/* Visit */}
                  <MdOutlineArrowOutward size="16" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
