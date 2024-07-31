import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";

export async function MonthHighestSaleCard() {
  const { monthHighestSale } = await metricsService.getMonthHighestSale();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Maior venda (mês)
        </CardTitle>

        <DollarSign className="tex h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formatCurrency(monthHighestSale.value / 100)}
        </span>

        <p className="text-xs text-muted-foreground">
          Venda realizada para{" "}
          <span className="font-bold">{monthHighestSale.customer}</span>
        </p>
      </CardContent>
    </Card>
  );
}
