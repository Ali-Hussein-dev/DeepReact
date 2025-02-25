import { TabDiscoverSegment } from "@/features/search/components/tab-discover-segment";
import { supabase } from "@/supabase/supabase-client";

//======================================
export default async function DiscoverSlot() {
  const { data } = await supabase.from("categories").select("id, name");
  return (
    <div>
      <TabDiscoverSegment
        categories={
          data?.map((o) => ({
            label: o.name,
            value: o.id + "",
          })) ?? []
        }
      />
    </div>
  );
}
