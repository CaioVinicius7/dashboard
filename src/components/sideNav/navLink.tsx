import Link from "next/link";
import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface NavLinkProps {
  children: ReactNode;
  text: String;
  href: String;
  isOpen: Boolean;
}

export function NavLink({ children, text, href, isOpen }: NavLinkProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={`${href}`}
          className="flex cursor-pointer items-center gap-3 overflow-hidden rounded-md p-2 hover:backdrop-brightness-150"
        >
          <div className="size-6">{children}</div>

          <span className="whitespace-nowrap">{text}</span>
        </Link>
      </TooltipTrigger>

      {!isOpen && (
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
