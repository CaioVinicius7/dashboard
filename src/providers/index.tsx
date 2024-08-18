import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";

import { QueryProvider } from "./queryProvider";
import { NextAuthSessionProvider } from "./sessionProvider";
import { ThemeProvider } from "./themeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <NextAuthSessionProvider>
        <ThemeProvider>
          {children}

          <Toaster />
        </ThemeProvider>
      </NextAuthSessionProvider>
    </QueryProvider>
  );
}
