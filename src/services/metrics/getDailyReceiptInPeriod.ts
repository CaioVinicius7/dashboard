import { httpClient } from "@/lib/ky";

interface GetDailyReceiptInPeriodParams {
  month: number;
  year: number;
}

interface GetDailyReceiptInPeriodResponse {
  data: {
    receipt: number;
    date: string;
  }[];
}

export async function getDailyReceiptInPeriod({
  month,
  year
}: GetDailyReceiptInPeriodParams) {
  const { data } = await httpClient
    .get("metrics/daily-receipt-in-period", {
      searchParams: {
        month,
        year
      },
      cache: "no-store"
    })
    .json<GetDailyReceiptInPeriodResponse>();

  return {
    data
  };
}
