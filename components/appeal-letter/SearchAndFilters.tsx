"use client";

import { Search, MoreVertical, SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchAndFilters() {
  return (
    <div className="flex items-center gap-4 w-1/2 ml-auto">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2"  size={16}/>
        <Input
          type="text"
          placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-custom-teal"
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="border-custom-teal dark:border-custom-teal text-custom-teal hover:bg-custom-teal/10"
      >
        <SlidersVertical />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600 dark:text-gray-400 rounded-full" 
      >
        <MoreVertical />
      </Button>
    </div>
  );
}
