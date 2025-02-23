"use client";
import * as React from "react";
import {
  CardSkeleton,
  WebpageCard,
  WebpageCardProps,
} from "@/features/search/components/search-cards";
import { Loading } from "@/features/search/components/loading";
import { Pagination } from "@/components/shared/pagination";
import { useSearch } from "@/features/search/hooks/use-search";
import { SearchBar } from "./search-bar";
import { SearchLayout } from "./search-layout";

//======================================
export function TabAllSegment() {
  const {
    data: res,
    isFetching,
    isSuccess,
    input,
    setInput,
    onSubmit,
    handleTabChange,
    handlePageChange,
    nuqsQueries,
    // fetchStatus,
    inputRef,
  } = useSearch({ queryOptions: { enabled: false } });
  const data = res?.data;
  const error = res?.error;
  // const length = data?.count;
  return (
    <>
      <SearchBar
        ref={inputRef as React.RefObject<HTMLInputElement>}
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        isFetching={isFetching}
        handleTabChange={handleTabChange}
        activeTab={"all"}
      />
      <SearchLayout>
        <div>
          {/* {fetchStatus} */}
          {/* <pre className="mt-4 text-wrap rounded border border-dashed border-gray-800 p-2">
            {JSON.stringify(data, null, 2)}{" "}
          </pre> */}
          {/* <div className="space-y-4 pb-4">

            {!isFetching && length === 0 && query === "" && (
              <p className="pt-10 text-center text-lg text-secondary-foreground">
                Add a keyword to search
              </p>
            )}
            {isSuccess && length === 0 && query !== "" && (
              <p className="pt-10 text-center text-lg text-secondary-foreground">
                Nothing found for {query}
              </p>
            )}
          </div> */}
          <Loading
            isFetching={isFetching}
            hasData={!!data}
            Skeleton={
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            }
          />
          {isSuccess && (
            <>
              <div className="mb-3 space-y-4">
                {Array.isArray(data?.results) &&
                  data.results.map((result: WebpageCardProps, i) => (
                    <WebpageCard key={result.title + i + 10} {...result} />
                  ))}
              </div>
              <div className="border-t border-dashed pt-1">
                <Pagination
                  total={data?.count ?? 0}
                  onChange={(page) => handlePageChange(page + "")}
                  initialPage={+(nuqsQueries.page || 1)}
                />
              </div>
              {error && <p className="error">{error?.message}</p>}
            </>
          )}
        </div>
      </SearchLayout>
    </>
  );
}
