import { supabase } from "@/supabase/supabase-client";
import { SearchableContributorsList } from "@/features/contributors/components/searchable-contributors-list";

//======================================
export default async function ContributorsPage() {
  const s = await supabase.rpc("get_contributors", {
    limit_count: 12,
    random_order: true,
  });
  const contributors = s.data;
  return (
    <div className="px-2 py-10">
      <section className="container mx-auto w-full">
        <h2 className="text-2xl mb-1 font-bold">Top Contributors</h2>
        <p className="text-muted-foreground">
          Discover top expert contributors and original content
        </p>
        <SearchableContributorsList initialContributors={contributors ?? []} />
      </section>
    </div>
  );
}
