import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layouts/AppShell";
import { ThemeProvider } from "@/components/providers/theme-provider";
import StoreProvider from "@/components/providers/StoreProvider";

export const metadata: Metadata = {
  title: "Property Tax Plus",
  description: "Dashboard for Property Tax Plus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
