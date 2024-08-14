import { ArrowDownNarrowWide } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";

export async function MonthHighestExpenseCard() {
  const { monthHighestExpense } = await metricsService.getMonthHighestExpense();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Maior despesa (mês)
        </CardTitle>

        <ArrowDownNarrowWide className="tex h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formatCurrency(monthHighestExpense.value / 100)}
        </span>

        <p className="truncate text-xs text-muted-foreground">
          A maior despesa foi{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-bold">{monthHighestExpense.title}</span>
              </TooltipTrigger>

              <TooltipContent>
                <p>{monthHighestExpense.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      </CardContent>
    </Card>
  );
}
