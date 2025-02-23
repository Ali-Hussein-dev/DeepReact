/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoPlay } from "react-icons/go";

const PlayBtn = ({ src }: { src: string }) => (
  <>
    <img
      src={src}
      alt="YouTube video thumbnail"
      className="absolute inset-0 m-0 size-full rounded-md object-cover"
    />
    <div className="center isolate z-10 size-full">
      <div className="relative size-full text-foreground">
        <div className="center absolute bottom-2 right-2 flex items-center gap-1.5 rounded-lg bg-background/95 px-2 py-1 shadow-lg backdrop-blur">
          Watch
          <GoPlay className="size-5" />
        </div>
      </div>
    </div>
  </>
);
//======================================
export const YouTubeDialog = ({
  videoId,
  thumbnailUrl,
}: {
  videoId: string;
  thumbnailUrl: string;
}) => {
  const thumbnail =
    thumbnailUrl ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?si=pBIyOegFmLlKSWaw&autoplay=1`;

  return (
    <Dialog>
      <DialogTitle className="sr-only"></DialogTitle>
      <DialogTrigger className="relative aspect-video h-full w-full max-w-[10rem] overflow-hidden rounded-md p-0 sm:max-w-[12rem] md:max-w-[18rem] hover:cursor-pointer">
        <PlayBtn src={thumbnail} />
      </DialogTrigger>
      <DialogContent className="h-full w-full max-w-full overflow-hidden border-none bg-background lg:max-w-7xl max-h-[760px]">
        <iframe
          src={iframeSrc}
          // width={560}
          // height={315}
          title="YouTube video player"
          //   frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="size-full rounded"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};
