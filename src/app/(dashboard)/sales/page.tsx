import type { Metadata } from "next";

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
import { formatCurrency } from "@/utils/formatCurrency";

import { RegisterSaleModal } from "./components/RegisterSaleModal";

export const metadata: Metadata = {
  title: "Vendas"
};

const sales = [
  {
    id: "926147c3-a67b-4a81-9203-bf3ec40b7e38",
    customer: "Ricky Henderson",
    value: 1000,
    dateOfSale: "09/07/2024"
  },
  {
    id: "1b18cee7-3251-4f23-81dc-2540afa6c5ab",
    customer: "Norman Gill",
    value: 2000,
    dateOfSale: "09/07/2024"
  }
];

export default function SalesPage() {
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
                <TableHead className="w-[150px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.customer}</TableCell>
                  <TableCell>{formatCurrency(sale.value)}</TableCell>
                  <TableCell>{sale.dateOfSale}</TableCell>

                  <TableCell className="flex items-center gap-2"></TableCell>
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
