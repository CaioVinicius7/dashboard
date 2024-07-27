"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import colors from "tailwindcss/colors";

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
    <ResponsiveContainer width="100%" height={240}>
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
      </LineChart>
    </ResponsiveContainer>
  );
}
