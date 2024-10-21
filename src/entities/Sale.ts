export interface Sale {
  id: string;
  customer: string;
  customerContact?: string;
  occurredAt: string;
  value: number;
  saleReceiptUrls?: string[];
  createdAt: string;
  updatedAt: string;
}
