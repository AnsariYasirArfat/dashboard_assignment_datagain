"use client";
import Link from "next/link";
import Image from "next/image";
import DrawerSidebar from "./DrawerSidebar";
import ClientWorkspace from "./ClientWorkspace";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function Header() {
  return (
    <header className="bg-white dark:bg-black rounded-lg w-full flex flex-wrap items-center justify-between px-2 xl:px-6 py-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center gap-1 cursor-pointer relative h-6 w-44 sm:h-8 sm:w-56"
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
      <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-1 justify-center">
        <ClientWorkspace variant="header" />
        <SearchBar variant="header" />
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex">
        <UserActions variant="header" className="h-8" />
      </div>

      <div className="lg:hidden ml-auto">
        <DrawerSidebar />
      </div>
    </header>
  );
}
