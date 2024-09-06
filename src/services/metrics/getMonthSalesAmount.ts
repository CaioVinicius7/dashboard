import { httpClient } from "@/lib/ky";

interface GetMonthSalesAmountResponse {
  monthSalesAmount: number;
  diffFromPreviousMonth: number;
}

export async function getMonthSalesAmount() {
  const { monthSalesAmount, diffFromPreviousMonth } = await httpClient
    .get("metrics/month-sales-amount")
    .json<GetMonthSalesAmountResponse>();

  return {
    monthSalesAmount,
    diffFromPreviousMonth
  };
}
