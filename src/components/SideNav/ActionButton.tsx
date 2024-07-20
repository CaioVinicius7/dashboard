import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ActionButtonProps {
  children: ReactNode;
  sideNavIsOpen: boolean;
  text: string;
  tooltipText: string;
  action: () => void;
}

export function ActionButton({
  children,
  sideNavIsOpen,
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

      {!sideNavIsOpen && (
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
