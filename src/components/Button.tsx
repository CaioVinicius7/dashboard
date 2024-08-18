import { LoaderCircle } from "lucide-react";

import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps
} from "./ui/button";

interface ButtonProps extends ShadcnButtonProps {
  isLoading?: boolean;
}

export function Button({ isLoading, children, ...props }: ButtonProps) {
  return (
    <ShadcnButton disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <LoaderCircle className="size-4 w-11 animate-spin" />
      ) : (
        children
      )}
    </ShadcnButton>
  );
}
