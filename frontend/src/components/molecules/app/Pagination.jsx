import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
        onClick={() => hasPreviousPage && onPageChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft
          size={16}
          className={!hasPreviousPage ? "opacity-50" : ""}
        />
        <span className="sr-only">Previous page</span>
      </button>

      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-500">
          Page {page} of {totalPages}
        </span>
      </div>

      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
        onClick={() => hasNextPage && onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        <ChevronRight size={16} className={!hasNextPage ? "opacity-50" : ""} />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  );
};

export default Pagination;
