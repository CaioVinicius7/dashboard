import { httpClient } from "@/lib/ky";

interface GetMonthTotalProfitResponse {
  currentMonthProfit: number;
  diffFromPreviousMonth: number;
  diffFromPreviousMonthInPercent: number;
  salesDiffInPercent: number;
  expensesDiffInPercent: number;
}

export async function getMonthTotalProfit() {
  const {
    currentMonthProfit,
    diffFromPreviousMonth,
    diffFromPreviousMonthInPercent,
    salesDiffInPercent,
    expensesDiffInPercent
  } = await httpClient
    .get("metrics/month-total-profit", {
      cache: "no-store"
    })
    .json<GetMonthTotalProfitResponse>();

  return {
    currentMonthProfit,
    diffFromPreviousMonth,
    diffFromPreviousMonthInPercent,
    salesDiffInPercent,
    expensesDiffInPercent
  };
}
