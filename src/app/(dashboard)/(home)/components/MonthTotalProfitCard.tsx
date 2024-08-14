import { HandCoins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthTotalProfitCard() {
  const hasProfit = true;

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
            + R$ 15.750,00
          </strong>
        ) : (
          <strong className="text-2xl font-bold tracking-tight text-rose-500 dark:text-rose-400">
            - R$ 15.750,00
          </strong>
        )}

        <p className="text-muted-foreground">
          O lucro total do mês foi{" "}
          {hasProfit ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              20% maior
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">20% menor</span>
          )}{" "}
          que o mês anterior sendo obtido o valor total de{" "}
          {hasProfit ? (
            <span className="text-emerald-500 dark:text-emerald-400">
              +R$ 5.750,00
            </span>
          ) : (
            <span className="text-rose-500 dark:text-rose-400">
              -R$ 5.750,00
            </span>
          )}{" "}
          em relação ao mês passado,{" "}
          {hasProfit ? "mostrando um crescimento." : "indicando uma queda."}
        </p>
      </CardContent>
    </Card>
  );
}
