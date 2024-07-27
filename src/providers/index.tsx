import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";

import { NextAuthSessionProvider } from "./sessionProvider";
import { ThemeProvider } from "./themeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextAuthSessionProvider>
      <ThemeProvider>
        {children}

        <Toaster />
      </ThemeProvider>
    </NextAuthSessionProvider>
  );
}
