import { supabase } from "@/supabase/supabase-client";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = new URL(req.url).searchParams;
  const category = searchParams.get("category");
  const page = +(searchParams.get("page") ?? 1);

  const offset = page == 1 ? 0 : page + 10;

  if (!category)
    return NextResponse.json({
      data: null,
      error: { message: `No category provided ${category}` },
    });
  const [{ data, error }, { data: count, error: countError }] =
    await Promise.all([
      supabase
        .rpc("get_resources_by_category", {
          category_id: +category,
        })
        .range(offset, offset + 10)
        .limit(10),
      supabase.rpc("count_resources_by_category", {
        categoryid: +category,
      }),
    ]);

  if (countError) {
    console.error("⚠️ ~ count resources: ", { countError });
  }

  if (count == 0) {
    return NextResponse.json({
      data: null,
      error: { message: `No resources found for category ${category}` },
    });
  }
  return NextResponse.json({ data: { results: data, count }, error });
};
