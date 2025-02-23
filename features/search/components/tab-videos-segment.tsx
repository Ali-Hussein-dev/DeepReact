"use client";
import { SearchBar } from "@/features/search/components/search-bar";
import * as React from "react";
import {
  CardSkeleton,
  YouTubeCard,
  YouTubeCardProps,
} from "@/features/search/components/search-cards";
import { Pagination } from "@/components/shared/pagination";
import { useSearch } from "@/features/search/hooks/use-search";
import { SearchLayout } from "@/features/search/components/search-layout";
import { Loading } from "@/features/search/components/loading";

//======================================
export function TabVidoesSegment() {
  const {
    data: res,
    isFetching,
    isSuccess,
    input,
    setInput,
    onSubmit,
    handleTabChange,
    handlePageChange,
    // fetchStatus,
    nuqsQueries
  } = useSearch({ queryOptions: { enabled: false } });
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
        activeTab={"videos"}
      />
      <SearchLayout>
        <>
          {/* <pre className="mt-4 text-wrap rounded border border-dashed border-gray-800 p-2">
            {JSON.stringify(data, null, 2)}{" "}
          </pre> */}
          <Loading
            isFetching={isFetching}
            hasData={!!data}
            Skeleton={
              <div className="space-y-4 mb-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            }
          />
          {/* <div className="space-y-5 pb-4">
            {length === 0 && query === "" && (
              <p className="pt-10 text-center text-lg text-secondary-foreground">
                Add a keyword to search
              </p>
            )}
          </div> */}
          {isSuccess && (
            <>
              <div className="space-y-4">
                {data?.results?.map((result: YouTubeCardProps, i) => (
                  <YouTubeCard key={result.title + i} {...result} />
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
        </>
      </SearchLayout>
    </>
  );
}
