"use client";

import { MoreHorizontal, Edit, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface ActionsMenuProps {
  rowId: string;
}

export default function ActionsMenu({ rowId }: ActionsMenuProps) {
  const router = useRouter();

  // Action handlers
  const handleEdit = () => {
    router.push(`/appeal-letter/edit/${rowId}`);
  };

  const handleChangeStatus = () => {
    // TODO: Status change
    console.log("Change status for:", rowId);
  };

  const handleDownload = () => {
    // TODO: Download PDF
    console.log("Download PDF for:", rowId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Actions"
          className="h-8 w-8 rounded-full text-gray-600 dark:text-gray-400 hover:text-custom-red hover:bg-custom-red/10"
        >
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="text-custom-teal" />
          Edit Letter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleChangeStatus}
          className="cursor-pointer"
        >
          <Settings className="text-custom-teal" />
          Change Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
          <Download className="text-custom-teal" />
          Download
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
