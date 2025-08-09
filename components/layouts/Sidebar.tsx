"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, Settings, Power } from "lucide-react";
import { Button } from "../ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { toggleSidebar, setDrawerOpen } from "@/store/reducers/layoutSlice";
import NavItems from "./NavItems";
import ClientWorkspace from "./ClientWorkspace";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  isDrawer?: boolean;
}

export default function Sidebar({ isDrawer }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, drawerOpen } = useAppSelector(
    (state) => state.layout
  );

  const handleNav = () => {
    if (isDrawer && drawerOpen) {
      dispatch(setDrawerOpen(false));
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col rounded-lg bg-[#2c4e6c] text-white transition-all duration-300 h-full relative pt-4",
        sidebarCollapsed ? "w-16" : "w-64",
        isDrawer ? "w-64" : ""
      )}
    >
      {/* Collapse Button */}
      {!isDrawer && (
        <div className="absolute z-10 top-4 -right-4 ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleSidebar())}
            className="w-6 h-6 bg-white rounded-full text-custom-teal hover:bg-gray-100 shadow-lg"
          >
            <ChevronLeft
              size={16}
              strokeWidth={3}
              className={cn(
                "transition-transform duration-300",
                sidebarCollapsed ? "rotate-180" : ""
              )}
            />
          </Button>
        </div>
      )}

      {isDrawer && (
        <Link
          href={"/"}
          className="flex items-center gap-1 cursor-pointer relative h-6 w-44 sm:h-8 sm:w-56 mx-auto my-4"
        >
          <Image
            src={"/logo.png"}
            fill
            alt="property-tax-plus-logo"
            className="object-contain"
          />
        </Link>
      )}

      <div className="flex flex-col justify-between overflow-y-auto h-full">
        {/* Mobile User Actions */}
        <div className="px-4 flex lg:hidden items-center gap-2 xl:gap-4 h-8">
          <UserActions variant="sidebar" className="justify-between w-full" />
        </div>

        {/* Mobile Client Workspace and Search */}
        <div className="my-4 flex lg:hidden flex-col items-center gap-4  justify-center">
          <ClientWorkspace variant="sidebar" />
          <SearchBar variant="sidebar" />
        </div>

        {/* Navigation Items */}
        <NavItems isDrawer={isDrawer} />

        {/* Bottom Section */}
        <div className="p-4 space-y-2 border-t border-gray-700">
          <div
            onClick={handleNav}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer",
              "text-gray-300 hover:bg-gray-700/50 hover:text-white",
              !sidebarCollapsed || isDrawer ? "" : "justify-center"
            )}
          >
            <div>
              <Settings size={20} />
            </div>
            {(!sidebarCollapsed || isDrawer) && <span>Settings</span>}
          </div>

          <Button
            variant="ghost"
            onClick={handleNav}
            className={cn(
              "w-full justify-center gap-3 px-3 py-2 bg-custom-teal hover:bg-custom-teal/80  cursor-pointer",
              !sidebarCollapsed || isDrawer ? "" : "justify-center"
            )}
          >
            <Power size={20} />
            {(!sidebarCollapsed || isDrawer) && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
