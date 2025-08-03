"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "../ui/button";
import DrawerSidebar from "./DrawerSidebar";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "../ui/separator";

export default function Header() {
  return (
    <header className="bg-white dark:bg-black rounded-lg w-full flex items-center justify-between px-6 py-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Drawer Sidebar Button (Mobile) */}
        <div className="lg:hidden">
          <DrawerSidebar />
        </div>

        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center gap-1 cursor-pointer relative h-8 w-56"
        >
          <Image
            src={"/logo.png"}
            fill
            alt="property-tax-plus-logo"
            className="object-contain"
          />
        </Link>
      </div>

      {/* Middle Section */}
      <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
          Client Workspace:
        </span>
        <div className="flex items-center gap-6 rounded border px-2 py-1 cursor-pointer">
          <Image
            src={"/logo_2.png"}
            width={30}
            height={30}
            alt="property-tax-plus-logo"
            className="object-contain"
          />
          <ChevronDown size={16} />
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-custom-teal "
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 h-8">
        <Image
          src={"/logo_2.png"}
          width={50}
          height={50}
          alt="property-tax-plus-logo"
          className="object-contain"
        />
        {/* User Avatar */}
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
          AK
        </div>
        <Separator orientation="vertical"  />
        <ModeToggle />
        <Separator orientation="vertical"  />
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400"
        >
          <Bell size={20} fill="" />
        </Button>
        <Separator orientation="vertical" />
        {/* App Launcher */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400"
        >
          <LayoutGrid fill=""/>
        </Button>
      </div>
    </header>
  );
}
