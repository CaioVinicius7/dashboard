import { HandCoins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatPercentage } from "@/utils/formatPercentage";

export const revalidate = 10; // 10 seg

export async function MonthTotalProfitCard() {
  const { currentMonthProfit, salesDiffInPercent, expensesDiffInPercent } =
    await metricsService.getMonthTotalProfit();

  const hasProfit = currentMonthProfit > 0;

  return (
    <Card className="w-full md:w-2/6 3xl:w-1/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold md:text-2xl">
          Lucro total (mês)
        </CardTitle>

        <HandCoins className="size-7 md:size-8" />
      </CardHeader>

      <CardContent className="mt-2 flex-1 justify-between space-y-8">
        {hasProfit ? (
          <strong className="text-lg font-bold tracking-tight text-emerald-500 dark:text-emerald-400 md:text-2xl">
            + {formatCurrency(currentMonthProfit / 100)}
          </strong>
        ) : (
          <strong className="text-lg font-bold tracking-tight text-rose-500 dark:text-rose-400 md:text-2xl">
            {formatCurrency(currentMonthProfit / 100)}
          </strong>
        )}

        <div className="space-y-2">
          <p className="text-muted-foreground">
            O valor das <b>vendas</b> foi{" "}
            {salesDiffInPercent >= 0 ? (
              <span className="text-emerald-500 dark:text-emerald-400">
                {formatPercentage(salesDiffInPercent)} maior
              </span>
            ) : (
              <span className="text-rose-500 dark:text-rose-400">
                {formatPercentage(salesDiffInPercent, false)} menor
              </span>
            )}{" "}
            em relação ao mês anterior.
          </p>

          <p className="text-muted-foreground">
            O valor das <b>despesas</b> foi{" "}
            {expensesDiffInPercent >= 0 ? (
              <span className="text-rose-500 dark:text-rose-400">
                {formatPercentage(expensesDiffInPercent)} maior
              </span>
            ) : (
              <span className="text-emerald-500 dark:text-emerald-400">
                {formatPercentage(expensesDiffInPercent, false)} menor
              </span>
            )}{" "}
            em relação ao mês anterior.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
