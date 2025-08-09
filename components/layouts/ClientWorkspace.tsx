import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ClientWorkspaceProps {
  variant?: "header" | "sidebar";
  className?: string;
}

export default function ClientWorkspace({ variant = "header", className }: ClientWorkspaceProps) {
  return (
    <div className={cn("flex items-center gap-2 xl:gap-4", className)}>
      <span className="text-sm text-gray-400 dark:text-gray-400 font-semibold">
        Client Workspace:
      </span>
      <div className="flex items-center gap-2 xl:gap-6 rounded border px-2 py-1 cursor-pointer">
        <Image
          src={"/logo_2.png"}
          width={30}
          height={30}
          alt="property-tax-plus-logo"
          className="object-contain"
        />
        <ChevronDown size={16} />
      </div>
    </div>
  );
}
