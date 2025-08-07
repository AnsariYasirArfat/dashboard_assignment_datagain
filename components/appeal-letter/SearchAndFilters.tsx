"use client";
import {
  Search,
  MoreVertical,
  SlidersVertical,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setSearchTerm } from "@/store/reducers/appealLetterSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageActionsMenu } from "./PageActionsMenu";

export function SearchAndFilters() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.appealLetter.searchTerm);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="flex items-center gap-4 w-1/2 ml-auto">
      <div className="flex-1 relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          size={16}
        />
        <Input
          type="text"
          placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-custom-teal"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="border-custom-teal dark:border-custom-teal text-custom-teal hover:bg-custom-teal/10"
      >
        <SlidersVertical />
      </Button>

      <PageActionsMenu />
    </div>
  );
}
