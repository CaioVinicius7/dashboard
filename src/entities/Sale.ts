export interface Sale {
  id: string;
  customer: string;
  customerContact?: string | null;
  occurredAt: string;
  value: number;
  paymentIsComplete: boolean;
  saleReceiptUrls?: string[];
  createdAt: string;
  updatedAt: string;
}
