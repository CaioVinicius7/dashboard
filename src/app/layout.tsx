import "./globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/themeProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="@dashboard-theme"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
