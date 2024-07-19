import { BadgeDollarSign } from "lucide-react";
import type { Metadata } from "next";
import { z } from "zod";

import { Header } from "@/components/Header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { salesService } from "@/services/sales";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import { EditSaleModal } from "./components/EditSaleModal";
import { RegisterSaleModal } from "./components/RegisterSaleModal";
import { RemoveSaleModal } from "./components/RemoveSaleModal";
import { Pagination } from "./Pagination";

export const metadata: Metadata = {
  title: "Vendas"
};

interface SearchProps {
  searchParams: {
    page?: string;
    perPage?: string;
  };
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(8)
});

export default async function SalesPage({ searchParams }: SearchProps) {
  const { page, perPage } = searchParamsSchema.parse(searchParams);

  const { sales, meta } = await salesService.list({
    page,
    perPage
  });

  return (
    <>
      <Header title="Vendas" icon={<BadgeDollarSign />} />

      <main className="space-y-4 p-4">
        <RegisterSaleModal />

        <ScrollArea className="h-[calc(100vh-317px)]">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[175px]">valor</TableHead>
                <TableHead className="w-[175px]">Data da venda</TableHead>
                <TableHead className="w-[175px]">Data da registro</TableHead>
                <TableHead className="w-[175px]">Data da atualização</TableHead>
                <TableHead className="w-[150px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.customer}</TableCell>
                  <TableCell>{formatCurrency(sale.value)}</TableCell>
                  <TableCell>{formatDate(sale.dateOfSale)}</TableCell>
                  <TableCell>{formatDate(sale.createdAt)}</TableCell>
                  <TableCell>{formatDate(sale.updatedAt)}</TableCell>

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
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Pagination
          page={page}
          totalCount={meta.totalCount}
          perPage={meta.perPage}
        />
      </main>
    </>
  );
}
