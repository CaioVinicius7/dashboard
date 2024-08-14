import { httpClient } from "@/lib/ky";

interface GetMonthExpensesCountResponse {
  monthExpensesCount: number;
  diffFromPreviousMonth: number;
}

export async function getMonthExpensesCount() {
  const { monthExpensesCount, diffFromPreviousMonth } = await httpClient
    .get("metrics/month-expenses-count")
    .json<GetMonthExpensesCountResponse>();

  return {
    monthExpensesCount,
    diffFromPreviousMonth
  };
}
