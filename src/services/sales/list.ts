import type { Sale } from "@/entities/Sale";
import { httpClient } from "@/lib/ky";

interface ListSalesParams {
  page?: number;
  perPage?: number;
  customer?: string;
  year?: number;
  month?: number;
}

interface ListSalesResponse {
  sales: Sale[];
  meta: {
    totalCount: number;
    page: number;
    perPage: number;
  };
}

export async function list({
  page = 1,
  perPage = 8,
  customer,
  year,
  month
}: ListSalesParams) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString()
  });

  if (!!customer) {
    searchParams.set("customer", customer);
  }

  if (!!year) {
    searchParams.set("year", year.toString());
  }

  if (!!month) {
    searchParams.set("month", month.toString());
  }

  const { sales, meta } = await httpClient
    .get("sales/list", {
      searchParams
    })
    .json<ListSalesResponse>();

  return {
    sales,
    meta
  };
}
