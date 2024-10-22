export interface Sale {
  id: string;
  customer: string;
  customerContact?: string | null;
  occurredAt: string;
  value: number;
  saleReceiptUrls?: string[];
  createdAt: string;
  updatedAt: string;
}
