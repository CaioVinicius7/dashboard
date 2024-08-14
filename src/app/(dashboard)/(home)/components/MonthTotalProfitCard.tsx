import { HandCoins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatPercentage } from "@/utils/formatPercentage";

export async function MonthTotalProfitCard() {
  const {
    currentMonthProfit,
    diffFromPreviousMonth,
    diffFromPreviousMonthInPercent
  } = await metricsService.getMonthTotalProfit();

  const hasProfit = currentMonthProfit > 0;

  const currentProfitIsGreaterThanPreviousProfit = diffFromPreviousMonth >= 0;

  return (
    <Card className="w-1/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold">
          Lucro total (mês)
        </CardTitle>

        <HandCoins className="size-8" />
      </CardHeader>

      <CardContent className="mt-2 justify-between space-y-8">
        {hasProfit ? (
          <strong className="text-2xl font-bold tracking-tight text-emerald-500 dark:text-emerald-400">
            + {formatCurrency(currentMonthProfit / 100)}
          </strong>
        ) : (
          <strong className="text-2xl font-bold tracking-tight text-rose-500 dark:text-rose-400">
            {formatCurrency(currentMonthProfit / 100)}
          </strong>
        )}

        <p className="text-muted-foreground">
          O lucro total do mês foi{" "}
          {currentProfitIsGreaterThanPreviousProfit ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              {formatPercentage(diffFromPreviousMonthInPercent)} maior
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              {formatPercentage(diffFromPreviousMonthInPercent, false)} menor
            </span>
          )}{" "}
          que o mês anterior sendo obtido o valor total de{" "}
          {currentProfitIsGreaterThanPreviousProfit ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              +{formatCurrency(diffFromPreviousMonth / 100)}
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              {formatCurrency(diffFromPreviousMonth / 100)}
            </span>
          )}{" "}
          em relação ao mês passado,{" "}
          {hasProfit ? "mostrando um crescimento." : "indicando uma queda."}
        </p>
      </CardContent>
    </Card>
  );
}
