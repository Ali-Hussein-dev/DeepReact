import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as React from "react";
import { useQueryStates, parseAsString, createSerializer } from "nuqs";
import { PostgrestError } from "@supabase/supabase-js";
import { useHotkeys } from "@mantine/hooks";

interface ApiSearchResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { count: number; results: any[] } | null;
  error: PostgrestError | null;
}

const queryFn = async (path: string): Promise<ApiSearchResponse> =>
  fetch(path).then((r) => r.json());

const tab = {
  all: {
    path: "/api/search",
    value: "all",
  },
  videos: {
    path: "/api/search",
    value: "videos",
  },
  discover: {
    path: "/api/discover",
    value: "discover",
  },
  // jobs: {
  //   path: "/api/jobs",
  //   value: "jobs",
  // },
};

type UseSearchParams = {
  queryOptions?: Omit<
    UseQueryOptions<ApiSearchResponse, Error, ApiSearchResponse>,
    "queryKey" | "queryFn" | "initialData"
  >;
};

const useInputFocus = ({ key }: { key: string }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  useHotkeys([
    [
      key,
      () => {
        if (document.activeElement !== inputRef.current) {
          inputRef.current?.focus();
        }
      },
    ],
  ]);

  return { inputRef };
};

export const useSearch = ({ queryOptions = {} }: UseSearchParams) => {
  const { inputRef } = useInputFocus({ key: "s" });
  const searchParams = {
    // common
    tab: parseAsString,

    // specific to tab all
    q: parseAsString.withDefault(""),
    page: parseAsString,

    // specific to tab discover
    category: parseAsString,
  };
  const [nuqsQueries, setNuqsQueries] = useQueryStates(searchParams, {
    clearOnDefault: false,
  });

  const q = nuqsQueries.q;

  const [input, setInput] = React.useState(q ?? "");

  const serialize = createSerializer(searchParams);

  const { data, refetch, isFetching, isSuccess, fetchStatus } =
    useQuery<ApiSearchResponse>({
      queryKey: [
        nuqsQueries?.tab,
        q,
        `page:${nuqsQueries?.page}`,
        ["discover"].includes(nuqsQueries?.tab as string)
          ? `category:${nuqsQueries?.category}`
          : null,
      ].filter(Boolean),
      queryFn: async () => {
        const serialized = serialize(`?tab=${nuqsQueries?.tab}`, {
          q: input,
          page: nuqsQueries?.page,
          category: nuqsQueries?.category,
        });
        const path = `${
          tab[nuqsQueries?.tab as keyof typeof tab].path
        }${serialized}`;
        return await queryFn(path);
      },
      refetchOnWindowFocus: false,
      ...queryOptions,
      enabled: queryOptions?.enabled || !!q,
    });

  async function handleTabChange(tab: string) {
    await setNuqsQueries({
      tab,
      page: "1",
      category: tab === "discover" ? "1" : null,
    });
    // don't refetch jobs, it will clean the initial data
    if (!queryOptions?.placeholderData) {
      await refetch();
    }
  }

  async function handlePageChange(activePage: string) {
    await setNuqsQueries({ page: activePage });
    await refetch();
  }
  async function handleCategoryChange(category: string) {
    await setNuqsQueries({ category });
    await refetch();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q) {
      await setNuqsQueries({ q: input, page: "1" });
      await refetch();
    }
  }
  return {
    data,
    isFetching,
    isSuccess,
    nuqsQueries,
    input,
    setInput,
    onSubmit,
    handleTabChange,
    handlePageChange,
    handleCategoryChange,
    query: q,
    fetchStatus,
    inputRef,
  };
};

// create context and search provider
// const SearchContext = React.createContext({});
// export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
//   const [nuqsQueries, setNuqsQueries] = useQueryStates({});
//   return (
//     <SearchContext.Provider value={{ nuqsQueries, setNuqsQueries }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };
