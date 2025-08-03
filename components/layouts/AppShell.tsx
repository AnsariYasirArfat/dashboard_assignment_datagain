"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-custom-gray dark:bg-gray-900 p-4 gap-4">
      <Header />
      <main className="flex h-full overflow-hidden gap-4">
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
