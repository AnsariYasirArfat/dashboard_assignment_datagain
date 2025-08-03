"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  Flag,
  Target,
  FileText,
  Building2,
  ListTodo,
  Settings,
  Power,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface SidebarProps {
  closeDrawer?: () => void;
  isDrawer?: boolean;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isActive?: boolean;
}

export default function Sidebar({ closeDrawer, isDrawer }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { icon: <Users size={20} />, label: "Accounts" },
    { icon: <Flag size={20} />, label: "Batches" },
    { icon: <Target size={20} />, label: "Resolution" },
    { icon: <FileText size={20} />, label: "Assessments" },
    {
      icon: <Building2 size={20} />,
      label: "Appeal Letter",
      badge: "05",
      isActive: true,
    },
    { icon: <ListTodo size={20} />, label: "Summary" },
  ];

  const handleNav = (href: string) => {
    if (isDrawer && closeDrawer) closeDrawer();
  };

  return (
    <aside
      className={cn(
        "flex flex-col rounded-lg bg-[#2c4e6c] text-white transition-all duration-300 h-full relative pt-8",
        collapsed ? "w-16" : "w-64",
        isDrawer ? "w-64" : ""
      )}
    >
      {/* Collapse Button */}
      {!isDrawer && (
        <div className="absolute z-10 top-4 -right-4 ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 bg-white rounded-full text-custom-teal hover:bg-gray-100 shadow-lg"
          >
            <ChevronLeft
              size={16}
              strokeWidth={3}
              className={cn(
                "transition-transform duration-300",
                collapsed ? "rotate-180" : ""
              )}
            />
          </Button>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item, index) => (
          <div
            onClick={() => handleNav("/settings")}
            key={item.label + index}
            className={cn(
              "flex items-center gap-3  p-2 rounded-md transition-colors relative group cursor-pointer",
              item.isActive
                ? "bg-gray-200/30 "
                : "text-gray-300 hover:bg-gray-200/30  hover:text-white",
              !collapsed || isDrawer ? "" : "justify-center"
            )}
          >
            <div className="">{item.icon}</div>
            {(!collapsed || isDrawer) && (
              <>
                <span className="flex-1 truncate">{item.label}</span>
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
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-2 border-t border-gray-700">
        <div
          onClick={() => handleNav("/settings")}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer",
            "text-gray-300 hover:bg-gray-700/50 hover:text-white",
            !collapsed || isDrawer ? "" : "justify-center"
          )}
        >
          <div>
            <Settings size={20} />
          </div>
          {(!collapsed || isDrawer) && <span>Settings</span>}
        </div>

        <Button
          variant="ghost"
          onClick={() => handleNav("/logout")}
          className={cn(
            "w-full justify-center gap-3 px-3 py-2 bg-custom-teal hover:bg-custom-teal/80  cursor-pointer",
            !collapsed || isDrawer ? "" : "justify-center"
          )}
        >
          <Power size={20} />
          {(!collapsed || isDrawer) && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
