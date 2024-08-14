import { httpClient } from "@/lib/ky";

interface GetMonthTotalProfitResponse {
  currentMonthProfit: number;
  diffFromPreviousMonth: number;
  diffFromPreviousMonthInPercent: number;
}

export async function getMonthTotalProfit() {
  const {
    currentMonthProfit,
    diffFromPreviousMonth,
    diffFromPreviousMonthInPercent
  } = await httpClient
    .get("metrics/month-total-profit")
    .json<GetMonthTotalProfitResponse>();

  return {
    currentMonthProfit,
    diffFromPreviousMonth,
    diffFromPreviousMonthInPercent
  };
}
