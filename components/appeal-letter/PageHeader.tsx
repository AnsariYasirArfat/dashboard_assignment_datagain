"use client";

import { Badge } from "@/components/ui/badge";

export function PageHeader() {
  return (
    <div className="flex items-center gap-3 border-custom-teal border-b-4 pb-4 w-fit ms-4 mt-4">
      <h1 className="text-base font-semibold ">Appeal Letter</h1>
      <Badge
        variant="destructive"
        className="bg-custom-red text-white text-xs px-2 py-0.5 rounded-full"
      >
        05
      </Badge>
    </div>
  );
}
