"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setCurrentPage, setItemsPerPage } from "@/store/reducers/appealLetterSlice";

export function Pagination() {
  const dispatch = useAppDispatch();
  const { currentPage, itemsPerPage, data, searchTerm } = useAppSelector(
    (state) => state.appealLetter
  );

  const [goToPage, setGoToPage] = useState(currentPage.toString());

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        for (let i = totalPages - 1; i <= totalPages; i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = 1; i <= 2; i++) pages.push(i);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-4 rounded-md shadow flex items-center justify-between px-6 py-1 bg-custom-gray dark:bg-gray-900">
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {startItem}-{endItem} of {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 py-1 text-gray-500">...</span>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => dispatch(setCurrentPage(page as number))}
                  className={cn(
                    "py-0.5 h-6",
                    currentPage === page
                      ? "bg-white dark:bg-black text-black dark:text-white"
                      : "text-gray-400"
                  )}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ArrowRight size={14} />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Go on to
        </span>
        <Input
          type="number"
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
          className="w-fit h-8 text-center !bg-white dark:!bg-black"
          min={1}
          max={totalPages}
        />
      </div>
    </div>
  );
}
