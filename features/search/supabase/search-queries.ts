import { supabase } from "@/supabase/supabase-client";
// import type { InsertWebpage } from "@/supabase/types/db.types";

const fetchPages = async ({
  search_term,
  offset,
}: {
  search_term: string;
  offset: number;
}) => {
  return await Promise.all([
    supabase.rpc("count_search_webpages", {
      search_term,
    }),
    supabase
      .rpc("search_webpages", {
        search_term,
      })
      .select("*")
      .range(offset, offset + 10)
      .limit(10),
  ]);
};

export async function searchWebpages({
  q,
  offset = 0,
}: {
  q: string;
  offset: number;
}) {
  let search_term = q.replaceAll(" ", "&");
  console.log({ search_term });

  const [
    { data: count, error: countError },
    { data: results, error: resultError },
  ] = await fetchPages({ search_term, offset });
  // const search_term = q.split(" ").join(" <-> ");

  if (countError || resultError) {
    console.error("⚠️ ~ search Webpages: ", { countError, resultError });
    return { data: null, error: countError || resultError };
  }
  console.log({count})
  if (count == 0) {
    // recall with different operator
    search_term = q.replaceAll(" ", " | ");
    const [
      { data: count, error: countError },
      { data: results, error: resultError },
    ] = await fetchPages({ search_term, offset });

    if (countError || resultError) {
      console.error("⚠️ ~ search Webpages: ", { countError, resultError });
      return { data: null, error: countError || resultError };
    }
    return { data: { count, results }, error: null };
  }

  return { data: { count, results }, error: null };
}

async function fetchVideos({ search_term, offset }: { search_term: string; offset: number }) {
  return await Promise.all([
    supabase.rpc("count_search_videos", {
      search_term,
    }),
    supabase
      .rpc("search_youtube", {
       search_term,
      })
      .range(offset, offset + 10)
      .limit(10),
  ])
}

export async function searchVideos({
  q,
  offset = 0,
}: {
  q: string;
  offset: number;
}) {
  let search_term = q.replaceAll(" ", " & ");

  const [
    { data: count, error: countError },
    { data: results, error: resultError },
  ] = await fetchVideos({ search_term, offset });

  if (count == 0) {
    // recall with different operator
    search_term = q.replaceAll(" ", " | ");
    const [
      { data: count, error: countError },
      { data: results, error: resultError },
    ] = await fetchVideos({ search_term, offset });

    if (countError || resultError) {
      console.error("⚠️ ~ search youtube videos: ", { countError, resultError });
      return { data: null, error: countError || resultError };
    }

    return { data: { count, results }, error: null };
  }

  if (countError || resultError) {
    console.error("⚠️ ~ search youtube videos: ", { countError, resultError });
    return { data: null, error: countError || resultError };
  }
  return { data: { count, results }, error: null };
}

// export async function insertWebpages(webpages: InsertWebpage[]) {
//   // const date = new Date().toISOString();

//   // const mapped = webpages.map((o) => ({
//   //   created_at: date,
//   //   updated_at: date,
//   //   website_id,
//   //   title: o.title,
//   //   snippet: o.snippet,
//   // }));
//   return await supabase.from("webpages").insert(webpages);
// }
