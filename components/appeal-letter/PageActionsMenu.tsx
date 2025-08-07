import { MoreVertical, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function PageActionsMenu() {
  const router = useRouter();

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export clicked");
  };

  const handleAddAppealLetter = () => {
    router.push("/appeal-letter/add");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          title="Add Appeal letter"
          size="icon"
          className="text-gray-600 dark:text-gray-400 rounded-full hover:bg-custom-red/10 hover:text-custom-red"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleAddAppealLetter}
          className="cursor-pointer"
        >
          <Plus className="text-custom-teal" />
          Add Appeal Letter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExport} className="cursor-pointer">
          <Download className="text-custom-teal" />
          Export
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
