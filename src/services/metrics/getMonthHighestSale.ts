import type { Sale } from "@/entities/Sale";
import { httpClient } from "@/lib/ky";

interface GetMonthHighestSaleResponse {
  monthHighestSale: Sale;
}

export async function getMonthHighestSale() {
  const { monthHighestSale } = await httpClient
    .get("metrics/month-highest-sale")
    .json<GetMonthHighestSaleResponse>();

  return {
    monthHighestSale
  };
}
