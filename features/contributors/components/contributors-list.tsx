/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Contributor } from "@/supabase/types/db.types";

//======================================
export function ContributorsList({
  contributors,
}: {
  contributors: Pick<Contributor, "name" | "role" | "bio" | "avatar_url">[];
}) {
  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {contributors?.map((contributor) => (
        <div key={contributor.name} className="mb-4 break-inside-avoid">
          <Card className="border-dashed">
            <CardHeader className="gap-3 flex justify-start flex-row">
              <div className="rounded-full border-2 border-card-foreground/90 w-fit">
                <img
                  src={contributor.avatar_url as string}
                  alt={contributor.name}
                  className="size-12 rounded-full"
                />
              </div>
              <div className="flex-col justify-start inline-flex">
                <h3 className="font-bold">{contributor.name}</h3>
                <span className="text-sm text-card-foreground/50">
                  {contributor.role}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{contributor.bio}</CardDescription>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
