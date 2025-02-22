import {
  Pagination as BasePagination,
  PaginationContent,
  // PaginationLink,
  // PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationParams, usePagination } from "@/hooks/use-pagination";
import * as React from "react";

//======================================
export function Pagination({ total, onChange, initialPage }: PaginationParams) {
  const { active, next, previous } = usePagination({
    total,
    onChange,
    initialPage,
  });
  if (total < 11) return null;

  const totalPages = Math.ceil(total / 10); // assuming 10 results per page

  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // const isBigger = active > 3;
  // const isSmaller = active < totalPages - 2;
  // const sliceFrom = isBigger ? active - 2 : 0;
  // const sliceTo = isSmaller ? active + 2 : totalPages;
  const hasPrevious = active > 1;
  const hasNext = active < totalPages;
  return (
    <BasePagination>
      <PaginationContent>
        <PaginationItem
          onClick={hasPrevious ? previous : undefined}
          className="hover:cursor-pointer"
        >
          <PaginationPrevious />
        </PaginationItem>
        <div className="px-2">
          Page {active}/ {totalPages}
        </div>
        {/* {pages.slice(sliceFrom, sliceTo).map((page, index) => {
          return (
            <React.Fragment key={page}>
              {isBigger && index === 0 && <PaginationEllipsis />}
              {index < 3 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => setPage(page)}
                    isActive={page === active}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )}
              {isSmaller && index === pages.length - 1 && (
                <PaginationEllipsis />
              )}
            </React.Fragment>
          );
        })} */}
        <PaginationItem
          onClick={hasNext ? next : undefined}
          className="hover:cursor-pointer"
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </BasePagination>
  );
}
