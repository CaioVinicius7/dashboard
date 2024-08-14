import { Diff } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";

export async function MonthSalesCountCard() {
  const { monthSalesCount, diffFromPreviousMonth } =
    await metricsService.getMonthSalesCount();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total de vendas (mês)
        </CardTitle>

        <Diff className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {monthSalesCount}
        </span>

        <p className="text-xs text-muted-foreground">
          {diffFromPreviousMonth >= 0 ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              +{diffFromPreviousMonth}
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              {diffFromPreviousMonth}
            </span>
          )}{" "}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
