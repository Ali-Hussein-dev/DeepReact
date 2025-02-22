import { supabase } from "@/supabase/supabase-client";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const searchParams = new URL(req.url).searchParams;
    const q = searchParams.get("q");
    // console.info("🚀 ~ GET ~ search contributors q:", q)
    if (q) {
        const res = await supabase
            .from("contributors")
            .select("*")
            .eq("is_draft", false)
            .ilike("name", `${q}%`);
        return NextResponse.json(res);
    }
    return NextResponse.json({ success: false, message: "No query provided" });
};
