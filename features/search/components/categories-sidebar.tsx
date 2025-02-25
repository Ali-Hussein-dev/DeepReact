import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { SelectOption } from "@/types/form-types";

//======================================
export function CategoriesSidebar({
  categories,
  onCategoryChange,
  activeCategory,
}: {
  categories: SelectOption[];
  onCategoryChange: (category: string) => Promise<void>;
  activeCategory: string;
}) {
  return (
    <div className="h-full pr-2">
      <div className="space-y-3">
        {/* <div className="font-bold text-muted-foreground lg:hidden">
          Categories
        </div> */}
        <ToggleGroup
          type="single"
          value={activeCategory}
          onValueChange={onCategoryChange}
          defaultValue="1"
          variant="outline"
          className="h-full justify-start gap-1 rounded-sm border-none lg:w-full lg:flex-col"
        >
          {categories.map((cat) => (
            <ToggleGroupItem
              key={cat.value}
              className="justify-start rounded border-none px-4 py-2 lg:w-full"
              value={cat.value}
              aria-label={`Toggle ${cat.label}`}
            >
              {cat.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
