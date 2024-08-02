import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

import { nextAuthOptions } from "@/lib/nextAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}
