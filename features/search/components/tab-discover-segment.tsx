"use client";
import { CategoriesSidebar } from "@/features/search/components/categories-sidebar";
import {
  CardSkeleton,
  GitHubCard,
  GitHubCardProps,
} from "@/features/search/components/search-cards";
import type { SelectOption } from "@/types/form-types";
import { useSearch } from "@/features/search/hooks/use-search";
import { SearchBar } from "@/features/search/components/search-bar";
import { SearchLayout } from "@/features/search/components/search-layout";
import { Loading } from "@/features/search/components/loading";
import { Pagination } from "@/components/shared/pagination";
//======================================
export function TabDiscoverSegment({
  categories,
}: {
  categories: SelectOption[];
}) {
  const {
    data: res,
    isFetching,
    isSuccess,
    handleTabChange,
    handleCategoryChange,
    handlePageChange,
    nuqsQueries,
    input,
    setInput,
    onSubmit,
  } = useSearch({ queryOptions: { enabled: true } });
  const data = res?.data;
  const error = res?.error;
  return (
    <>
      <SearchBar
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        isFetching={isFetching}
        handleTabChange={handleTabChange}
        activeTab={"discover"}
      />
      <SearchLayout
        sidebar={
          <nav className="">
            <CategoriesSidebar
              categories={categories}
              onCategoryChange={handleCategoryChange}
              activeCategory={nuqsQueries.category + ""}
            />
          </nav>
        }
      >
        <div className="w-full">
          <Loading
            isFetching={isFetching}
            hasData={Array.isArray(data?.results)}
            Skeleton={
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            }
          />
          <div className="space-y-4">
            {/* <pre className="mt-4 text-wrap rounded border border-dashed border-gray-800 p-2">
            {JSON.stringify(data, null, 2)}
            </pre> */}
            {!isFetching && isSuccess && (
              <>
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  {data?.results?.map((props: GitHubCardProps, i) => (
                    <GitHubCard key={props.name + i} {...props} />
                  ))}
                </div>
                <div className="border-t border-dashed pt-1">
                  <Pagination
                    total={data?.count ?? 0}
                    onChange={(page) => handlePageChange(page + "")}
                    initialPage={+(nuqsQueries.page || 1)}
                  />
                </div>
                {error && (
                  <div className="error">{error.message}</div>
                )}
              </>
            )}
          </div>
        </div>
      </SearchLayout>
    </>
  );
}
