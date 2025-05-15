import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import IconButton from "../atoms/IconButton";

const Pagination = ({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <IconButton
        variant="pagination"
        onClick={() => hasPreviousPage && onPageChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft
          size={16}
          className={!hasPreviousPage ? "opacity-50" : "text-black"}
        />
      </IconButton>

      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-500">
          Page {page} of {totalPages}
        </span>
      </div>

      <IconButton
        variant="pagination"
        onClick={() => hasNextPage && onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        <ChevronRight
          size={16}
          className={!hasNextPage ? "opacity-50" : "text-black"}
        />
      </IconButton>
    </div>
  );
};

export default Pagination;
