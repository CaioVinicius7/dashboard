import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricsService } from "@/services/metrics";
import { formatCurrency } from "@/utils/formatCurrency";

export const revalidate = 10; // 10 seg

export async function MonthPendingPaymentsCard() {
  const { totalPendingPayments, salesWithPendingPaymentsCount } =
    await metricsService.getMonthPendingPayments();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Pagamentos pendentes (mês)
        </CardTitle>

        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formatCurrency(totalPendingPayments / 100)}
        </span>

        <p className="text-xs text-muted-foreground">
          Este valor é referente á{" "}
          <strong>{salesWithPendingPaymentsCount} vendas </strong>
          com o pagamento pendente
        </p>
      </CardContent>
    </Card>
  );
}
