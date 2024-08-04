"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "../ui/button";

export function LogoutButton() {
  async function logout() {
    await signOut();
  }

  return (
    <Button
      variant="ghost"
      onClick={logout}
      className="flex w-full items-center justify-start gap-2"
    >
      <LogOut className="size-5 text-red-500" />
      Sair
    </Button>
  );
}
