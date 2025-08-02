"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Menu, SquarePen, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

interface SidebarProps {
  closeDrawer?: () => void;
  isDrawer?: boolean;
}

export default function Sidebar({ closeDrawer, isDrawer }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  const handleNav = (cb?: () => void) => {
    if (cb) cb();
    if (isDrawer && closeDrawer) closeDrawer();
  };

  return (
    <aside
      className={cn(
        "flex flex-col gap-2 sm:gap-4 p-4 bg-[#f0f4f9] dark:bg-[#282a2c] transition-all duration-300",
        collapsed ? "w-16 " : "w-64 "
      )}
    >
      <div
        className={cn(
          "flex items-center",
          collapsed ? "justify-center " : "justify-between"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNav(() => setCollapsed((c) => !c))}
          className={` flex justify-center items-center hover:!bg-zinc-400/20`}
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="mt-auto">
        <ModeToggle />
      </div>
    </aside>
  );
}
