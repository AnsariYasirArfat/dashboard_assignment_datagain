"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, Settings, X } from "lucide-react";
import { toast } from "sonner";

interface SelectionToastProps {
  id: number | string;
  selectedCount: number;
  onClear: () => void;
}

export function SelectionToast({
  id,
  selectedCount,
  onClear,
}: SelectionToastProps) {
  return (
    <div className="bg-blue-50/90 dark:bg-[#2c4e6c] border border-blue-200 dark:border-blue-800 rounded-lg shadow-lg px-6 py-4 flex flex-wrap lg:flex-nowrap items-center gap-6 sm:min-w-[600px]">
      {/* Left side - Selection count */}
      <div className="text-blue-900 dark:text-blue-100 font-medium text-sm w-32">
        {selectedCount} Appeal Letter selected
      </div>

      {/* Middle - Action buttons */}
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-custom-teal text-custom-teal hover:bg-custom-teal/20 bg-white dark:bg-gray-800 dark:border-custom-teal dark:text-custom-teal dark:hover:bg-custom-teal/20 h-8 px-3"
        >
          <Download size={14} />
          Export Grid Details
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="border-custom-teal text-custom-teal hover:bg-custom-teal/20 bg-white dark:bg-gray-800 dark:border-custom-teal dark:text-custom-teal dark:hover:bg-custom-teal/20 h-8 px-3"
        >
          <FileText size={14} />
          Download Letter
        </Button>

        <Button
          size="sm"
          className="bg-custom-teal hover:bg-custom-teal/80 text-white h-8 px-3 cursor-pointer"
          onClick={() => toast.dismiss(id)}
        >
          <Settings size={14} />
          Change Status
        </Button>
      </div>

      {/* Right side - Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          onClear();
          toast.dismiss(id);
        }}
        className="text-gray-50;700 dark:text-gray-400 dark:hover:text-gray-200 h-6 w-6 ml-auto"
      >
        <X size={16} />
      </Button>
    </div>
  );
}
