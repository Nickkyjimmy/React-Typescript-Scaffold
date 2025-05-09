import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

type TablePaginationProps = {
  pageNumber: number;
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
  className?: string;
};

export function TablePagination({
  pageNumber,
  onPageChange,
  totalPages,
  className,
}: TablePaginationProps) {
  
  const handlePreviousClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pageNumber > 0) onPageChange(pageNumber - 1);
  };

  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pageNumber < totalPages - 1) onPageChange(pageNumber + 1);
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousClick}
            className={pageNumber === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* First page */}
        {pageNumber > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(0);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis if needed */}
        {pageNumber > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Previous page if not on first */}
        {pageNumber > 0 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageNumber - 1);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Current page */}
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
            {pageNumber + 1}
          </PaginationLink>
        </PaginationItem>

        {/* Next page if not on last */}
        {pageNumber < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageNumber + 1);
              }}
            >
              {pageNumber + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis if needed */}
        {pageNumber < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page if not current */}
        {pageNumber < totalPages - 2 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages - 1);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextClick}
            className={
              pageNumber >= totalPages - 1
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
