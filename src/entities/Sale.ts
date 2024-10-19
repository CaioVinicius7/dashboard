export interface Sale {
  id: string;
  customer: string;
  occurredAt: string;
  value: number;
  saleReceiptUrls?: string[];
  createdAt: string;
  updatedAt: string;
}
