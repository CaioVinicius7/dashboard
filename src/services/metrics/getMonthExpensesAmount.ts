import { httpClient } from "@/lib/ky";

interface GetMonthExpensesAmountResponse {
  monthExpensesAmount: number;
  diffFromPreviousMonth: number;
}

export async function getMonthExpensesAmount() {
  const { monthExpensesAmount, diffFromPreviousMonth } = await httpClient
    .get("metrics/month-expenses-amount", {
      next: {
        revalidate: 10 // 10 seg
      }
    })
    .json<GetMonthExpensesAmountResponse>();

  return {
    monthExpensesAmount,
    diffFromPreviousMonth
  };
}
