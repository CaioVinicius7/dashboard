import { CircleCheck, CircleDashed } from "lucide-react";

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
      <TableCell>{formatDate(sale.occurredAt)}</TableCell>
      <TableCell>
        {sale.customerContact ?? (
          <span className="text-xs text-muted-foreground">Não informado</span>
        )}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {sale.paymentIsComplete ? (
          <>
            <CircleCheck className="size-4 text-emerald-500" />
            <span>Concluído</span>
          </>
        ) : (
          <>
            <CircleDashed className="size-4 text-amber-400" />
            <span>Pendente</span>
          </>
        )}
      </TableCell>

      <TableCell>
        <SaleReceiptsModal saleReceiptsUrl={sale.saleReceiptUrls} />
      </TableCell>

      <TableCell className="flex items-center gap-2">
        <EditSaleModal
          sale={{
            id: sale.id,
            customer: sale.customer,
            customerContact: sale.customerContact,
            occurredAt: sale.occurredAt,
            value: sale.value,
            paymentIsComplete: sale.paymentIsComplete,
            saleReceiptUrls: sale.saleReceiptUrls
          }}
        />

        <RemoveSaleModal saleId={sale.id} />
      </TableCell>
    </TableRow>
  );
}
