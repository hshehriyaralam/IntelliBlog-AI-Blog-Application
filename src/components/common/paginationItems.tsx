import { useCallback, useEffect, useMemo, useState } from "react";
import React from "react";
import type { PaginationItemsProps } from "types/Blog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



const PaginationItems = React.memo(({
  ItemsPerPage,
  filteredItems,
  onPageChange,
  themeValue
}: PaginationItemsProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(filteredItems.length / ItemsPerPage), [filteredItems.length, ItemsPerPage]);

  const currentItems = useMemo(() => {
    const indexOfLast = currentPage * ItemsPerPage;
    const indexOfFirst = indexOfLast - ItemsPerPage;
    return filteredItems.slice(indexOfFirst, indexOfLast);
  }, [currentPage, ItemsPerPage, filteredItems]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(p => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(p => Math.max(p - 1, 1));
  }, []);

  useEffect(() => {
    onPageChange(currentItems);
  }, [currentItems, onPageChange]);

  // 🔹 Sliding window logic for page numbers
  const maxVisiblePages = 5; 
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className={`mt-6 ${themeValue ? "text-gray-900" : "text-gray-100"}`}>
      <PaginationContent>

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={prevPage}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => goToPage(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={nextPage}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
});



export default PaginationItems;