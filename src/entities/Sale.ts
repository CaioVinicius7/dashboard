export interface Sale {
  id: string;
  customer: string;
  dateOfSale: string;
  value: number;
  saleReceiptUrls?: string[];
  createdAt: string;
  updatedAt: string;
}
