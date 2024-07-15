import { httpClient } from "@/lib/ky";

interface Sale {
  id: string;
  customer: string;
  value: number;
  dateOfSale: string;
  saleReceiptUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

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
