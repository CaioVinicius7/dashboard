import type { Sale } from "@/entities/Sale";
import { httpClient } from "@/lib/ky";

interface ListSalesResponse {
  sales: Sale[];
}

export async function list() {
  const { sales } = await httpClient
    .get("sales/list")
    .json<ListSalesResponse>();

  return {
    sales
  };
}
