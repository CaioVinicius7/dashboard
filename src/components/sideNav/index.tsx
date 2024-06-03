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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
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
    rotate: 360,
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
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleSideNavVisibility}
              className="flex cursor-pointer gap-3 overflow-hidden rounded-md p-2 hover:backdrop-brightness-150"
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

              <span className="whitespace-nowrap">Fechar menu</span>
            </button>
          </TooltipTrigger>

          {!isOpen && (
            <TooltipContent>
              <p>Expandir menu</p>
            </TooltipContent>
          )}
        </Tooltip>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          <NavLink text="Página inicial" href="/" isOpen={isOpen}>
            <Home />
          </NavLink>

          <NavLink text="Vendas" href="/sales" isOpen={isOpen}>
            <BadgeDollarSign />
          </NavLink>

          <NavLink text="Estoque" href="/stock" isOpen={isOpen}>
            <Blocks />
          </NavLink>

          <NavLink text="Funcionários" href="/employees" isOpen={isOpen}>
            <Users />
          </NavLink>
        </nav>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={logout}
              className="flex cursor-pointer gap-3 overflow-hidden rounded-md p-2 hover:backdrop-brightness-150"
            >
              <div>
                <LogOut className="size-6 text-red-500" />
              </div>

              <span className="whitespace-nowrap">Sair</span>
            </button>
          </TooltipTrigger>

          {!isOpen && (
            <TooltipContent>
              <span className="whitespace-nowrap">Sair</span>
            </TooltipContent>
          )}
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  );
}
