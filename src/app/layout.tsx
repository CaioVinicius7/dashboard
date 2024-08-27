import "./globals.css";
import "../lib/dateFns";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Providers } from "@/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: {
    template: "Dashboard | %s",
    default: "Dashboard"
  },
  description: "Dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
