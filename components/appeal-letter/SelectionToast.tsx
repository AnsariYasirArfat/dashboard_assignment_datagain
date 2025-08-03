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
    <div className="">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg shadow-lg px-6 py-4 flex items-center gap-6 min-w-[600px]">
        {/* Left side - Selection count */}
        <div className="text-blue-900 dark:text-blue-100 font-medium text-sm w-32">
          {selectedCount} Appeal Letter selected
        </div>

        {/* Middle - Action buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-green-500 text-green-600 hover:bg-green-50 bg-white dark:bg-gray-800 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 h-8 px-3"
          >
            <Download size={14} className="mr-1.5" />
            Export Grid Details
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-green-500 text-green-600 hover:bg-green-50 bg-white dark:bg-gray-800 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 h-8 px-3"
          >
            <FileText size={14} className="mr-1.5" />
            Download Letter
          </Button>

          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
          >
            <Settings size={14} className="mr-1.5" />
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
    </div>
  );
}
