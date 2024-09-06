import { httpClient } from "@/lib/ky";

interface GetMonthExpensesCountResponse {
  monthExpensesCount: number;
  diffFromPreviousMonth: number;
}

export async function getMonthExpensesCount() {
  const { monthExpensesCount, diffFromPreviousMonth } = await httpClient
    .get("metrics/month-expenses-count", {
      cache: "no-store"
    })
    .json<GetMonthExpensesCountResponse>();

  return {
    monthExpensesCount,
    diffFromPreviousMonth
  };
}
