"use client";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import Sidebar from "./Sidebar";

export default function DrawerSidebar() {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </Button>

      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerContent className="p-0 w-64 h-full">
          <Sidebar closeDrawer={closeDrawer} isDrawer />
        </DrawerContent>
        <DrawerOverlay onClick={closeDrawer} />
      </Drawer>
    </>
  );
}
