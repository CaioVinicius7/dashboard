"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface RevenueChartProps {
  chartData: {
    receipt: number;
    date: string;
  }[];
}

export function RevenueChart({ chartData }: RevenueChartProps) {
  const allDatesAreEqual = chartData.every(
    (item) => item.date === chartData[0].date
  );

  const hasMinChartData = chartData.length >= 1 && !allDatesAreEqual;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Receita do mês</CardTitle>

        <CardDescription>Receita diária do mês atual</CardDescription>
      </CardHeader>

      <CardContent>
        {!hasMinChartData && (
          <div className="flex h-[240px] items-center justify-center">
            <p className="sm:text-md w-[570px] text-center text-sm text-muted-foreground">
              Continue registrando suas vendas para visualizar as informações no
              gráfico.
            </p>
          </div>
        )}

        {hasMinChartData && (
          <ChartContainer config={{}} className="h-[240px] w-full">
            <LineChart
              data={chartData}
              style={{
                fontSize: 12
              }}
            >
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                dy={16}
                tickFormatter={formatDate}
              />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={formatCurrency}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                dataKey="receipt"
                strokeWidth={2}
                stroke={colors["blue"][500]}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(Number(value))}
                    labelClassName="text-muted-foreground"
                    labelFormatter={formatDate}
                  />
                }
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
