import { Bell, LayoutGrid } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserActionsProps {
  variant?: "header" | "sidebar";
  className?: string;
}

export default function UserActions({
  variant = "header",
  className,
}: UserActionsProps) {
  return (
    <div
      className={cn("flex items-center gap-1 lg:gap-2 xl:gap-4 ", className)}
    >
      <div className="relative h-10 w-10 lg:w-16 lg:h-16">
        <Image
          src={"/logo_2.png"}
          fill
          alt="property-tax-plus-logo"
          className="object-contain w-full h-full"
        />
      </div>
      {/* User Avatar */}
      <div className="h-6 w-6 lg:w-8 lg:h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
        AK
      </div>
      {variant === "header" && <Separator orientation="vertical" />}
      <ModeToggle />
      {variant === "header" && <Separator orientation="vertical" />}
      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600 dark:text-gray-400"
      >
        <Bell size={20} fill={variant === "sidebar" ? "#fff" : ""} />
      </Button>
      {variant === "header" && <Separator orientation="vertical" />}
      {/* App Launcher */}
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600 dark:text-gray-400"
      >
        <LayoutGrid fill={variant === "sidebar" ? "#fff" : ""} />
      </Button>
    </div>
  );
}
