import { supabase } from "@/supabase/supabase-client";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = new URL(req.url).searchParams;
  const category = searchParams.get("category");

  if (!category)
    return NextResponse.json({
      data: null,
      error: { message: `No category provided ${category}` },
    });
  const { data, error } = await supabase.rpc("get_resources_by_category", {
    category_id: +category,
  });
  const count = data?.length;
 
  if (count == 0) {
    return NextResponse.json({
      data: null,
      error: { message: `No resources found for category ${category}` },
    });
  }
  return NextResponse.json({ data: { results: data, total: count }, error });
};
