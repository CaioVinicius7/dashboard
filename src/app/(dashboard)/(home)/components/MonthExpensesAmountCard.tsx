import { ArrowDownNarrowWide } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";

export async function MonthExpensesAmountCard() {
  const { monthExpensesAmount, diffFromPreviousMonth } =
    await metricsService.getMonthExpensesAmount();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Despesas (mês)
        </CardTitle>

        <ArrowDownNarrowWide className="tex h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formatCurrency(monthExpensesAmount / 100)}
        </span>

        <p className="text-xs text-muted-foreground">
          {diffFromPreviousMonth >= 0 ? (
            <span className="text-rose-500 dark:text-rose-400">
              +{formatCurrency(diffFromPreviousMonth / 100)}
            </span>
          ) : (
            <span className="text-emerald-500 dark:text-emerald-400">
              {formatCurrency(diffFromPreviousMonth / 100)}
            </span>
          )}{" "}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
