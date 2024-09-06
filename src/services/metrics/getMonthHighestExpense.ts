import type { Expense } from "@/entities/Expense";
import { httpClient } from "@/lib/ky";

interface GetMonthHighestExpenseResponse {
  monthHighestExpense: Expense;
}

export async function getMonthHighestExpense() {
  const { monthHighestExpense } = await httpClient
    .get("metrics/month-highest-expense")
    .json<GetMonthHighestExpenseResponse>();

  return {
    monthHighestExpense
  };
}
