"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Blocks,
  Home,
  LogOut,
  Users
} from "lucide-react";

import { TooltipProvider } from "../ui/tooltip";
import { ActionButton } from "./actionButton";
import { NavLink } from "./navLink";
import { useSideNavController } from "./useSideNavController";

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

export function SideNav() {
  const { handleToggleSideNavVisibility, logout, isOpen } =
    useSideNavController();

  return (
    <TooltipProvider>
      <motion.div
        variants={containerVariants}
        animate={isOpen ? "open" : "close"}
        initial="close"
        className="flex h-screen flex-col border-r bg-primary-foreground px-4 py-6"
      >
        <ActionButton
          sideNavIsOpen={isOpen}
          text="Fechar menu"
          action={handleToggleSideNavVisibility}
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
          <NavLink text="Página inicial" href="/" sideNavIsOpen={isOpen}>
            <Home />
          </NavLink>

          <NavLink text="Vendas" href="/sales" sideNavIsOpen={isOpen}>
            <BadgeDollarSign />
          </NavLink>

          <NavLink text="Estoque" href="/stock" sideNavIsOpen={isOpen}>
            <Blocks />
          </NavLink>

          <NavLink text="Funcionários" href="/employees" sideNavIsOpen={isOpen}>
            <Users />
          </NavLink>
        </nav>

        <ActionButton sideNavIsOpen={isOpen} text="Sair" action={logout}>
          <div>
            <LogOut className="size-6 text-red-500" />
          </div>
        </ActionButton>
      </motion.div>
    </TooltipProvider>
  );
}
