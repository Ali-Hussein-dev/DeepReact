import { RootLayout } from "@/components/shared/root-layout";
import { RenderSlotBySearchParams } from "@/features/search/components/render-slot-by-search-params";
import * as React from "react";

// add seo metadata, here
export const metadata = {
  title: "Search Engine for React Ecosystem",
  description: "Context-aware Search engine for React ecosystem",
};
//======================================
export default function SearchLayout({
  all,
  videos,
  discover,
  jobs,
}: {
  children: React.ReactNode;
  all: React.ReactNode;
  videos: React.ReactNode;
  jobs: React.ReactNode;
  discover: React.ReactNode;
}) {
  const slots = {
    all: all,
    videos: videos,
    jobs: jobs,
    discover: discover,
  };
  
  return (
    <RootLayout>
      <div className="container mx-auto p-2">
        <RenderSlotBySearchParams param={"tab"} slots={slots} />
      </div>
    </RootLayout>
  );
}
