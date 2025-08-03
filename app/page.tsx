"use client";

import { useState } from "react";
import { AppealLetterTable } from "@/components/appeal-letter/AppealLetterTable";
import { SearchAndFilters } from "@/components/appeal-letter/SearchAndFilters";
import { PageHeader } from "@/components/appeal-letter/PageHeader";
import { SelectionToast } from "@/components/appeal-letter/SelectionToast";
import { appealData } from "@/data/appeal-letter";
import { toast } from "sonner";

export default function HomePage() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleRowSelection = (rowId: string, isSelected: boolean) => {
    const newSelection = new Set(selectedRows);
    if (isSelected) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    toast.custom(
      (id) => (
        <SelectionToast
          id={id}
          selectedCount={newSelection.size}
          onClear={clearSelection}
        />
      ),
      { position: "bottom-center" }
    );
    setSelectedRows(newSelection);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allIds = appealData.map((item) => item.id);
      toast.custom(
        (id) => (
          <SelectionToast
            id={id}
            selectedCount={allIds.length}
            onClear={clearSelection}
          />
        ),
        { position: "bottom-center" }
      );
      setSelectedRows(new Set(allIds));
    } else {
      setSelectedRows(new Set());
    }
  };

  const clearSelection = () => {
    setSelectedRows(new Set());
  };

  return (
    <section>
      {/* Page Header */}
      <PageHeader />

      <div className="bg-white dark:bg-black rounded-lg p-4 space-y-6">
        {/* Search and Filters */}
        <SearchAndFilters />

        {/* Data Table */}
        <AppealLetterTable
          selectedRows={selectedRows}
          onRowSelection={handleRowSelection}
          onSelectAll={handleSelectAll}
        />

        {/* Selection Toast */}
        {/* {selectedRows.size > 0 && (
          <SelectionToast
            selectedCount={selectedRows.size}
            onClear={clearSelection}
          />
        )} */}
      </div>
    </section>
  );
}
