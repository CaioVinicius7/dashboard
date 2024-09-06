import { httpClient } from "@/lib/ky";

interface GetMonthSalesCountResponse {
  monthSalesCount: number;
  diffFromPreviousMonth: number;
}

export async function getMonthSalesCount() {
  const { monthSalesCount, diffFromPreviousMonth } = await httpClient
    .get("metrics/month-sales-count", {
      cache: "no-store"
    })
    .json<GetMonthSalesCountResponse>();

  return {
    monthSalesCount,
    diffFromPreviousMonth
  };
}
