/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Webpage, Website, Youtube } from "@/supabase/types/db.types";
import { truncate, decodeHtmlEntities } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { YouTubeDialog } from "./youtube-dialog";
import { formatDistanceToNow } from "date-fns";

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

export type YouTubeCardProps = Pick<
  Youtube,
  | "channel_title"
  | "description"
  | "published_at"
  | "title"
  | "video_id"
  | "thumbnails"
>;
//======================================
export function YouTubeCard(props: YouTubeCardProps) {
  return (
    <Card className="overlflow-hidden rounded-md border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-start gap-2 space-y-0 p-0">
        {props.video_id ? (
          <YouTubeDialog
            videoId={props.video_id}
            // @ts-expect-error thumbnails is json type
            thumbnailUrl={props.thumbnails?.medium?.url as string}
          />
        ) : (
          <div>video_id is not valid {props.video_id}</div>
        )}
        <div className="w-full gap-2 p-0.5 flex flex-col items-start lg:pt-3">
          <CardTitle className="line-clamp-2 font-semibold md:text-lg lg:text-xl pt-1 capitalize leading-5">
            {truncate(decodeHtmlEntities(props.title), 50)}
          </CardTitle>
          {/* <CardDescription className="mb-1 line-clamp-1 text-sm md:w-[90%] lg:line-clamp-2">
            {props.description}
          </CardDescription> */}
          <div className="w-full gap-1 pt-1 text-xs md:text-base text-muted-foreground/80 flex justify-start items-center">
            <span className="">{props.channel_title}</span> <span>-</span>
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
