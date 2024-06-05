"use client";

import { useId } from "react";
import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

interface InputCurrencyProps {
  id?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

export function InputCurrency({
  id: customId,
  value,
  onChange,
  className,
  error
}: InputCurrencyProps) {
  const id = useId();

  return (
    <div className="space-y-2">
      <NumericFormat
        id={customId ?? id}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        allowNegative={false}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        autoComplete="off"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !!error && "border-red-400",
          className
        )}
      />

      {!!error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
