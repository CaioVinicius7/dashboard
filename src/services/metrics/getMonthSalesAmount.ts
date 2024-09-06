import { httpClient } from "@/lib/ky";

interface GetMonthSalesAmountResponse {
  monthSalesAmount: number;
  diffFromPreviousMonth: number;
}

export async function getMonthSalesAmount() {
  const { monthSalesAmount, diffFromPreviousMonth } = await httpClient
    .get("metrics/month-sales-amount", {
      next: {
        revalidate: 10 // 10 seg
      }
    })
    .json<GetMonthSalesAmountResponse>();

  return {
    monthSalesAmount,
    diffFromPreviousMonth
  };
}
