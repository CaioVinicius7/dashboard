"use client";

import type { InputHTMLAttributes } from "react";
import InputMaskPrimitive from "react-input-mask";

import { cn } from "@/lib/utils";

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  error?: string;
}

export function InputMask({
  mask,
  error,
  defaultValue,
  className,
  ...props
}: InputMaskProps) {
  return (
    <div className="space-y-2">
      <InputMaskPrimitive
        mask={mask}
        maskChar=""
        defaultValue={defaultValue}
        autoComplete="off"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !!error && "border-red-400",
          className
        )}
        {...props}
      />

      {!!error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
