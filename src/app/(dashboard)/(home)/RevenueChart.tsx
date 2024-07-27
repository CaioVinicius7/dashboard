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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Receita do mês</CardTitle>

        <CardDescription>Receita diária do mês atual</CardDescription>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}
