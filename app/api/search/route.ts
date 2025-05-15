import {
  searchVideos,
  searchWebpages,
} from "@/features/search/supabase/search-queries";
import { Redis } from "@upstash/redis";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res:any = {};

  // Don't skip any result
  const offset = page == 1 ? 0 : page + 10;

  if (tab === "videos") {
    res = await searchVideos({ q, offset });
  } else {
    res = await searchWebpages({ q, offset });
  }

  after(async () => {
    // TODO:
    // store query in Redis

    console.info("Run 'after' function for search");
    if (offset === 0) {
      const redis = Redis.fromEnv();
      await redis.sadd(
        "search-queries",
        JSON.stringify({
          q,
          resultsCount: res?.data?.count ?? 0,
          tab,
        })
      );
    }
  });
  // TODO:
  // Add rate limiting
  if (!res?.data?.count) {
    return NextResponse.json({
      data: null,
      error: { message: `No results for query ${q}`, reason: { q, tab } },
    });
  }
  return NextResponse.json(res);
};
