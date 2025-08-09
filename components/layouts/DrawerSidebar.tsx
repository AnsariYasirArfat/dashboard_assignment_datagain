"use client";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import Sidebar from "./Sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setDrawerOpen } from "@/store/reducers/layoutSlice";

export default function DrawerSidebar() {
  const dispatch = useAppDispatch();
  const { drawerOpen } = useAppSelector((state) => state.layout);

  const closeDrawer = () => dispatch(setDrawerOpen(false));
  const openDrawer = () => dispatch(setDrawerOpen(true));

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={openDrawer}
        className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </Button>

      <Drawer open={drawerOpen} onOpenChange={(open) => dispatch(setDrawerOpen(open))} direction="left">
        <DrawerContent className="p-0 h-full data-[vaul-drawer-direction=left]:w-64 data-[vaul-drawer-direction=left]:border-none rounded-lg bg-transparent">
          <Sidebar isDrawer />
        </DrawerContent>
        <DrawerOverlay onClick={closeDrawer} />
      </Drawer>
    </>
  );
}
