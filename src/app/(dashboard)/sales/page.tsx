import { Pencil } from "lucide-react";
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
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

import { RegisterSaleModal } from "./components/RegisterSaleModal";
import { RemoveSaleModal } from "./components/RemoveSaleModal";

export const metadata: Metadata = {
  title: "Vendas"
};

export default async function SalesPage() {
  const { sales } = await salesService.list();

  return (
    <>
      <Header title="Vendas" />

      <main className="space-y-4 p-4">
        <RegisterSaleModal />

        <ScrollArea className="h-[calc(100vh-170px)]">
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
                    <Button variant="ghost" size="icon">
                      <Pencil className="size-5" />
                      <span className="sr-only">Editar venda</span>
                    </Button>

                    <RemoveSaleModal saleId={sale.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </>
  );
}
