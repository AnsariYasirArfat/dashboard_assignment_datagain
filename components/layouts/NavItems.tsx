import React from "react";
import {
  LayoutDashboard,
  Users,
  Flag,
  Target,
  FileText,
  Building2,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setDrawerOpen } from "@/store/reducers/layoutSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  href: string;
}

interface NavItemsProps {
  isDrawer?: boolean;
}

const NavItems = ({ isDrawer }: NavItemsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarCollapsed, drawerOpen } = useAppSelector(
    (state) => state.layout
  );

  const handleNav = (href: string) => {
    router.push(href);

    if (isDrawer && drawerOpen) {
      dispatch(setDrawerOpen(false));
    }
  };

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    { icon: <Users size={20} />, label: "Accounts", href: "/accounts" },
    { icon: <Flag size={20} />, label: "Batches", href: "/batches" },
    { icon: <Target size={20} />, label: "Resolution", href: "/resolution" },
    {
      icon: <FileText size={20} />,
      label: "Assessments",
      href: "/assessments",
    },
    {
      icon: <Building2 size={20} />,
      label: "Appeal Letter",
      badge: "05",
      href: "/appeal-letter",
    },
    { icon: <ListTodo size={20} />, label: "Summary", href: "/summary" },
  ];

  return (
    <nav className="flex-1 px-4 space-y-2 ">
      {navItems.map((item, index) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <div
            onClick={() => handleNav(item.href)}
            key={item.label + index}
            className={cn(
              "flex items-center gap-3 p-2 rounded-md transition-colors relative group cursor-pointer",
              isActive
                ? "bg-gray-200/30"
                : "text-gray-300 hover:bg-gray-200/30 hover:text-white",
              !sidebarCollapsed || isDrawer ? "" : "justify-center"
            )}
          >
            <div
              className={cn(
                "transition-colors",
                isActive ? "text-white" : "text-gray-300 group-hover:text-white"
              )}
            >
              {item.icon}
            </div>
            {(!sidebarCollapsed || isDrawer) && (
              <>
                <span className="flex-1 truncate font-medium">
                  {item.label}
                </span>
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="bg-custom-red text-white text-xs px-2 py-0.5 rounded-full"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default NavItems;
