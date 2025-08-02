"use client";
import Link from "next/link";
import Image from "next/image";
import DrawerSidebar from "./DrawerSidebar";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 h-16 ">
      <div className="flex items-center gap-1">
        <DrawerSidebar />
        <Link
          href={"/"}
          className="flex items-center gap-1 cursor-pointer relative h-8 w-56"
        >
          <Image
            src={"/logo.png"}
            fill
            alt="property-tax-plus-logo"
            // className="object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4"></div>
    </header>
  );
}
