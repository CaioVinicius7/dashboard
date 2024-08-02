import {
  BadgeDollarSign,
  Blocks,
  Home,
  LogOut,
  Menu,
  Users2
} from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="xlg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-64 flex-col justify-between xlg:hidden">
        <div>
          <SheetHeader>Menu de navegação</SheetHeader>
          <Button
            variant="ghost"
            asChild
            className="mt-6 flex items-center justify-start gap-2"
          >
            <Link href="/">
              <Home className="size-5" />
              Página inicial
            </Link>
          </Button>

          <Button
            variant="ghost"
            asChild
            className="flex items-center justify-start gap-2"
          >
            <Link href="/sales">
              <BadgeDollarSign className="size-5" />
              Vendas
            </Link>
          </Button>

          <Button
            variant="ghost"
            asChild
            className="flex items-center justify-start gap-2"
          >
            <Link href="/stock">
              <Blocks className="size-5" />
              Estoque
            </Link>
          </Button>

          <Button
            variant="ghost"
            asChild
            className="flex items-center justify-start gap-2"
          >
            <Link href="/employees">
              <Users2 className="size-5" />
              Funcionários
            </Link>
          </Button>
        </div>

        <div>
          <ThemeToggleButton />

          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2"
          >
            <LogOut className="size-5 text-red-500" />
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
