import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "header" | "sidebar";
  className?: string;
  placeholder?: string;
}

export default function SearchBar({
  variant = "header",
  className,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-custom-teal",
          variant === "sidebar" ? "placeholder:text-gray-600" : ""
        )}
      />
    </div>
  );
}
