import { httpClient } from "@/lib/ky";

interface GetMonthPendingPaymentsResponse {
  totalPendingPayments: number;
  salesWithPendingPaymentsCount: number;
}

export async function getMonthPendingPayments() {
  const { totalPendingPayments, salesWithPendingPaymentsCount } =
    await httpClient
      .get("metrics/month-payments-pending")
      .json<GetMonthPendingPaymentsResponse>();

  return {
    totalPendingPayments,
    salesWithPendingPaymentsCount
  };
}
