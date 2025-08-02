"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-[#f6f7f8] dark:bg-gray-900 p-4 space-y-4">
      <Header />
      <main className="flex h-full overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 h-full overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
