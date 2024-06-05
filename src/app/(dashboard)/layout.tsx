import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

import { SideNav } from "@/components/SideNav";

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

  return (
    <div className="flex w-screen">
      <SideNav />

      <div className="w-full">{children}</div>
    </div>
  );
}
