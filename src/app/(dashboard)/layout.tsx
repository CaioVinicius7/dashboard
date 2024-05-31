import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
