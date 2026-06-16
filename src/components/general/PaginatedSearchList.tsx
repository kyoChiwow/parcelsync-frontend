import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface IPaginatedSearchListProps<T> {
  data: T[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  totalPage: number;
  isLoading?: boolean;
  renderItem: (item: T) => ReactNode;
  searchPlaceholder?: string;
}

export default function PaginatedSearchList<T>({
  data,
  page,
  setPage,
  search,
  setSearch,
  totalPage,
  isLoading,
  renderItem,
  searchPlaceholder = "Search...",
}: IPaginatedSearchListProps<T>) {
  const getVisiblePages = () => {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPage, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      <Input
        value={search}
        placeholder={searchPlaceholder}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : (
        <div className="space-y-2">
          {data?.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </div>
      )}

      {totalPage > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (page > 1) {
                    setPage((prev) => prev - 1);
                  }
                }}
              />
            </PaginationItem>

            {getVisiblePages().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={page === pageNumber}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (page < totalPage) {
                    setPage((prev) => prev + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}