"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  isLoading,
  onPageChange,
}: PaginationProps) => {
  // Calculate start and end items for the current page
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <div className="text-sm text-muted-foreground">
        {totalItems > 0 ? (
          <>
            Showing {startItem} to {endItem} of {totalItems} entries
          </>
        ) : (
          "No entries to show"
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading || totalPages === 0}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
