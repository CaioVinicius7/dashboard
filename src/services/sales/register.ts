import type { Sale } from "@/entities/Sale";
import { httpClient } from "@/lib/ky";
import type { OmitTyped } from "@/utils/typeUtils";

type RegisterSaleParams = OmitTyped<Sale, "id" | "createdAt" | "updatedAt">;

export async function register({
  customer,
  customerContact,
  occurredAt,
  value,
  paymentIsComplete,
  saleReceiptUrls
}: RegisterSaleParams) {
  await httpClient.post("sales/register", {
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
