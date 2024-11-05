import type { Sale } from "@/entities/Sale";
import { httpClient } from "@/lib/ky";
import type { OmitTyped } from "@/utils/typeUtils";

interface EditSaleParams {
  id: string;
  data: OmitTyped<Sale, "id" | "createdAt" | "updatedAt">;
}

export async function edit({
  id,
  data: {
    customer,
    customerContact,
    occurredAt,
    value,
    paymentIsComplete,
    saleReceiptUrls
  }
}: EditSaleParams) {
  await httpClient.put(`sales/edit/${id}`, {
    json: {
      customer,
      customerContact,
      occurredAt,
      value,
      paymentIsComplete,
      saleReceiptUrls
    }
  });
}
