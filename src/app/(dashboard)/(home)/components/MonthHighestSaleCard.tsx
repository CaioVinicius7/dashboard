import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";

export const dynamic = "force-dynamic";

export async function MonthHighestSaleCard() {
  const { monthHighestSale } = await metricsService.getMonthHighestSale();

  const hasMonthHighestSale = !!monthHighestSale;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Maior venda (mês)
        </CardTitle>

        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {!hasMonthHighestSale && (
          <p className="truncate text-xs text-muted-foreground">
            Nenhuma venda foi registrada no mês atual.
          </p>
        )}

        {hasMonthHighestSale && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(monthHighestSale.value / 100)}
            </span>

            <p className="truncate text-xs text-muted-foreground">
              Venda realizada para{" "}
              <span className="font-bold">{monthHighestSale.customer}</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
