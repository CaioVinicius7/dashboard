import { httpClient } from "@/lib/ky";

interface RegisterSaleParams {
  customer: string;
  dateOfSale: Date;
  value: number;
  saleReceiptUrls?: string[];
}

export async function register({
  customer,
  dateOfSale,
  value,
  saleReceiptUrls
}: RegisterSaleParams) {
  await httpClient.post("sales/register", {
    json: {
      customer,
      dateOfSale,
      value,
      saleReceiptUrls
    }
  });
}
