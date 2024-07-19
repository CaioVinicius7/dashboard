import type { Sale } from "@/entities/Sale";
import { httpClient } from "@/lib/ky";

interface ListSalesParams {
  page?: number;
  perPage?: number;
}

interface ListSalesResponse {
  sales: Sale[];
  meta: {
    totalCount: number;
    page: number;
    perPage: number;
  };
}

export async function list({ page = 1, perPage = 8 }: ListSalesParams) {
  const { sales, meta } = await httpClient
    .get("sales/list", {
      searchParams: {
        page,
        perPage
      }
    })
    .json<ListSalesResponse>();

  return {
    sales,
    meta
  };
}
