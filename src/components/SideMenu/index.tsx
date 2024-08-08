"use client";

import { motion } from "framer-motion";
import {
  ArrowDownNarrowWide,
  ArrowRight,
  BadgeDollarSign,
  Home,
  LogOut,
  Users
} from "lucide-react";

import { TooltipProvider } from "../ui/tooltip";
import { ActionButton } from "./ActionButton";
import { NavLink } from "./NavLink";
import { useSideMenuController } from "./useSideMenuController";

const containerVariants = {
  close: {
    width: "4.575rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    width: "11.5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  }
};

const arrowVariants = {
  close: {
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    rotate: 180
  }
};

export function SideMenu() {
  const { handleToggleSideMenuVisibility, logout, isOpen } =
    useSideMenuController();

  return (
    <TooltipProvider>
      <motion.div
        variants={containerVariants}
        animate={isOpen ? "open" : "close"}
        initial="close"
        className="sticky top-0 hidden h-screen flex-col border-r bg-primary-foreground px-4 py-6 xlg:flex"
      >
        <ActionButton
          sideMenuIsOpen={isOpen}
          text="Fechar menu"
          tooltipText="Expandir menu"
          action={handleToggleSideMenuVisibility}
        >
          <motion.div
            variants={arrowVariants}
            animate={isOpen ? "open" : "close"}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="flex size-6 items-center gap-3"
          >
            <ArrowRight />
          </motion.div>
        </ActionButton>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          <NavLink text="Página inicial" href="/" sideMenuIsOpen={isOpen}>
            <Home />
          </NavLink>

          <NavLink text="Vendas" href="/sales" sideMenuIsOpen={isOpen}>
            <BadgeDollarSign />
          </NavLink>

          <NavLink text="Despesas" href="/expenses" sideMenuIsOpen={isOpen}>
            <ArrowDownNarrowWide />
          </NavLink>

          <NavLink
            text="Funcionários"
            href="/employees"
            sideMenuIsOpen={isOpen}
          >
            <Users />
          </NavLink>
        </nav>

        <ActionButton
          sideMenuIsOpen={isOpen}
          text="Sair"
          tooltipText="Sair"
          action={logout}
        >
          <div>
            <LogOut className="size-6 text-red-500" />
          </div>
        </ActionButton>
      </motion.div>
    </TooltipProvider>
  );
}
