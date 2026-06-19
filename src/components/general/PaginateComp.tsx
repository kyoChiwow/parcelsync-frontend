import type { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface IPaginationProps {
  currentPage: number;
  totalPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

// Returns the list of page numbers/ellipsis markers to render,
// condensed around the current page on small screens.
function getPageItems(
  currentPage: number,
  totalPage: number,
  maxVisible: number,
): (number | "ellipsis")[] {
  if (totalPage <= maxVisible) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const items: (number | "ellipsis")[] = [];
  const siblingCount = 1; // pages shown on each side of current page

  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPage - 1, currentPage + siblingCount);

  items.push(1);

  if (left > 2) {
    items.push("ellipsis");
  }

  for (let page = left; page <= right; page++) {
    items.push(page);
  }

  if (right < totalPage - 1) {
    items.push("ellipsis");
  }

  items.push(totalPage);

  return items;
}

export default function PaginationComp({
  currentPage,
  totalPage,
  setCurrentPage,
}: IPaginationProps) {
  if (totalPage <= 1) return null;

  // Tighter range on very small screens, more room on larger ones.
  const mobilePages = getPageItems(currentPage, totalPage, 3);
  const desktopPages = getPageItems(currentPage, totalPage, 7);

  return (
    <div className="flex justify-end mt-6">
      <Pagination className="w-auto mx-0">
        <PaginationContent className="flex-wrap gap-y-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "pointer-events-auto"
              }
            />
          </PaginationItem>

          {/* Condensed list for small screens */}
          <div className="flex items-center gap-1 sm:hidden">
            {mobilePages.map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`m-ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
          </div>

          {/* Fuller list for sm screens and up */}
          <div className="hidden items-center gap-1 sm:flex">
            {desktopPages.map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`d-ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={
                currentPage === totalPage
                  ? "pointer-events-none opacity-50"
                  : "pointer-events-auto"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}