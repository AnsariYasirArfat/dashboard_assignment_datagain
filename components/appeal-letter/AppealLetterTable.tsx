"use client";

import { useState } from "react";
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
import { appealData, appealDataColumns } from "@/data/appeal-letter";
import { cn } from "@/lib/utils";

interface AppealLetterTableProps {
  selectedRows: Set<string>;
  onRowSelection: (rowId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

export function AppealLetterTable({
  selectedRows,
  onRowSelection,
  onSelectAll,
}: AppealLetterTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
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

  const isAllSelected =
    appealData.length > 0 && selectedRows.size === appealData.length;

  return (
    <div className="rounded-t-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[1200px]">
          <TableHeader>
            <TableRow className="bg-[#ecf3f9] dark:bg-gray-700 [&_button]:text-xs">
              <TableHead className="sticky left-0 bg-[#ecf3f9] dark:bg-gray-700 z-10">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
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
          <TableBody>
            {appealData.map((row) => (
              <TableRow
                key={row.id}
                className={selectedRows.has(row.id) ? "bg-custom-teal/10" : ""}
              >
                <TableCell className="sticky left-0 bg-white dark:bg-gray-800 z-10">
                  <Checkbox
                    checked={selectedRows.has(row.id)}
                    onCheckedChange={(checked) =>
                      onRowSelection(row.id, checked as boolean)
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
