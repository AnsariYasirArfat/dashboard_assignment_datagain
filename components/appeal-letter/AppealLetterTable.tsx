"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  ChevronsDownUp,
  ListFilter,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "./Pagination";
import { AppealData, appealDataColumns } from "@/data/appeal-letter";
import { cn } from "@/lib/utils";
import { SelectionToast } from "./SelectionToast";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import {
  toggleRowSelection,
  selectAllRows,
  clearSelection,
  setSortColumn,
  setSortDirection,
} from "@/store/reducers/appealLetterSlice";

export function AppealLetterTable() {
  const dispatch = useAppDispatch();
  const {
    data: appealData,
    selectedRows,
    sortColumn,
    sortDirection,
    searchTerm,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.appealLetter);

  // Filter data based on search term
  const filteredData = appealData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn as keyof AppealData];
    const bValue = b[sortColumn as keyof AppealData];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleRowSelection = (rowId: string, isSelected: boolean) => {
    dispatch(toggleRowSelection(rowId));

    // Check if we need to show/hide toast
    const newSelection = isSelected
      ? [...selectedRows, rowId]
      : selectedRows.filter((id) => id !== rowId);

    if (newSelection.length > 0) {
      toast.custom(
        (id) => (
          <SelectionToast
            id={id}
            selectedCount={newSelection.length}
            onClear={() => dispatch(clearSelection())}
          />
        ),
        { position: "bottom-center" }
      );
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    dispatch(selectAllRows(isSelected));

    if (isSelected) {
      const allIds = paginatedData.map((item) => item.id);
      toast.custom(
        (id) => (
          <SelectionToast
            id={id}
            selectedCount={allIds.length}
            onClear={() => dispatch(clearSelection())}
          />
        ),
        { position: "bottom-center" }
      );
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      dispatch(setSortDirection(sortDirection === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortColumn(column));
      dispatch(setSortDirection("asc"));
    }
  };

  const getSortIcon = (column: string) => {
    return (
      <div className="flex gap-1 justify-center items-center">
        <span>
          {sortDirection === "asc" && sortColumn === column ? (
            <ChevronsDownUp size={14} className="text-gray-600" fill="" />
          ) : (
            <ChevronsUpDown size={14} className="text-gray-600" fill="" />
          )}
        </span>
        <span>
          <ListFilter size={14} className="text-gray-400" />
        </span>
      </div>
    );
  };

  // Check if all rows on current page are selected
  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows.includes(row.id));

  return (
    <div className="rounded-t-md overflow-hidden min-h-0 flex flex-col h-full">
      <div className="overflow-auto  flex-1 h-full y-hidden">
        <Table className="min-w-[1200px] ">
          <TableHeader>
            <TableRow className="bg-[#ecf3f9] dark:bg-gray-700 [&_button]:text-xs">
              <TableHead className="sticky left-0 bg-[#ecf3f9] dark:bg-gray-700 z-10">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className="mx-4 data-[state=checked]:bg-custom-red data-[state=checked]:dark:bg-custom-red data-[state=checked]:border-none border-black dark:border-white"
                />
              </TableHead>
              {appealDataColumns.map((col, idx) => (
                <TableHead
                  className={cn(col.className, "")}
                  key={col.key + idx}
                >
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    {getSortIcon(col.key)}
                  </Button>
                </TableHead>
              ))}
              <TableHead className="">
                <span className="font-semibold text-xs mx-4">ACTIONS</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-auto">
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                className={
                  selectedRows.includes(row.id) ? "bg-custom-teal/10" : ""
                }
              >
                <TableCell className="sticky left-0 bg-white dark:bg-gray-800 z-10">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={(checked) =>
                      handleRowSelection(row.id, checked as boolean)
                    }
                    className="mx-4 data-[state=checked]:bg-custom-red data-[state=checked]:dark:bg-custom-red data-[state=checked]:border-none border-black dark:border-white"
                  />
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  <span className="">{row.taxYear}</span>
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  <span className="text-wrap">{row.company}</span>
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  {row.state}
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  <span className="text-wrap">{row.assessor}</span>
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  <span className="text-wrap">{row.accountNumber}</span>
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  {row.appealedDate}
                </TableCell>
                <TableCell className="text-sm sm:text-base">
                  <span
                    className={`text-sm font-medium ${
                      row.status === "Not Sent"
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.appealedBy}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination />
    </div>
  );
}
