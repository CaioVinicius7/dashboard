import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ActionButtonProps {
  children: ReactNode;
  sideMenuIsOpen: boolean;
  text: string;
  tooltipText: string;
  action: () => void;
}

export function ActionButton({
  children,
  sideMenuIsOpen,
  text,
  tooltipText,
  action
}: ActionButtonProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          onClick={action}
          className="flex cursor-pointer gap-3 overflow-hidden rounded-md p-2 hover:backdrop-brightness-150"
        >
          {children}

          <span className="whitespace-nowrap">{text}</span>
        </button>
      </TooltipTrigger>

      {!sideMenuIsOpen && (
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
