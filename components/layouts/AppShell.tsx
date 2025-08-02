"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100svh] flex flex-col">
      <Header />
      <main className="flex h-full">
        <Sidebar />
        <div className="flex-1 h-full">{children}</div>
      </main>
    </div>
  );
}
