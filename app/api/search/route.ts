import {
  searchVideos,
  searchWebpages,
} from "@/features/search/supabase/search-queries";
import { after, type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const page = +(url.searchParams.get("page") ?? 1);

  const tab = url.searchParams.get("tab");
  const isValidTab = ["videos", "all"].includes(tab ?? "");
  if (!q || !isValidTab) {
    console.error("⚠️ ~ SEARCH API: ", { q, tab, isValidTab });
    return NextResponse.json({
      data: null,
      error: { message: "Search queries are not valid", reason: { q, tab } },
    });
  }
  let res = {};
  if (tab === "videos") {
    console.log({ tab });
    res = await searchVideos({ q, offset: page });
  } else {
    res = await searchWebpages({ q, offset: page });
  }

  after(async () => {
    // TODO:
    // store query in Redis
    console.info("Run 'after' function for search");
  });
  // TODO:
  // Add rate limiting
  // @ts-expect-error at runtime type is correct
  if (!res?.data?.count) {
    return NextResponse.json({
      data: null,
      error: { message: `No results for query ${q}`, reason: { q, tab } },
    });
  }
  return NextResponse.json(res);
};
