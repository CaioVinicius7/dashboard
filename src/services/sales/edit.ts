import { httpClient } from "@/lib/ky";

interface EditSaleParams {
  id: string;
  data: {
    customer: string;
    dateOfSale: string;
    value: number;
    saleReceiptUrls?: string[];
  };
}

export async function edit({
  id,
  data: { customer, dateOfSale, value, saleReceiptUrls }
}: EditSaleParams) {
  await httpClient.put(`sales/edit/${id}`, {
    json: {
      customer,
      dateOfSale,
      value,
      saleReceiptUrls
    }
  });
}
