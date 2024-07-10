import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Input as BaseInput } from "./ui/input";

interface InputProps extends ComponentProps<"input"> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <div className="w-full space-y-2">
      <BaseInput
        className={cn(!!error && "border-red-400", className)}
        ref={ref}
        {...props}
      />

      {!!error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
);

Input.displayName = "Input";
