import { TableCell, TableRow } from "@/components/ui/table";
import type { Sale } from "@/entities/Sale";
import { capitalizeFirstLetters } from "@/utils/capitalizeFirstLetters";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import { EditSaleModal } from "./EditSaleModal";
import { RemoveSaleModal } from "./RemoveSaleModal";
import { SaleReceiptsModal } from "./SaleReceiptsModal";

interface SaleRowProps {
  sale: Sale;
}

export function SaleRow({ sale }: SaleRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {capitalizeFirstLetters(sale.customer)}
      </TableCell>
      <TableCell>{formatCurrency(sale.value)}</TableCell>
      <TableCell>{formatDate(sale.dateOfSale)}</TableCell>
      <TableCell>{formatDate(sale.createdAt)}</TableCell>
      <TableCell>{formatDate(sale.updatedAt)}</TableCell>

      <TableCell>
        <SaleReceiptsModal saleReceiptsUrl={sale.saleReceiptUrls} />
      </TableCell>

      <TableCell className="flex items-center gap-2">
        <EditSaleModal
          sale={{
            id: sale.id,
            customer: sale.customer,
            dateOfSale: sale.dateOfSale,
            value: sale.value,
            saleReceiptUrls: sale.saleReceiptUrls
          }}
        />

        <RemoveSaleModal saleId={sale.id} />
      </TableCell>
    </TableRow>
  );
}
