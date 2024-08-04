import { BadgeDollarSign } from "lucide-react";
import type { Metadata } from "next";
import { z } from "zod";

import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { salesService } from "@/services/sales";

import { EmptyView } from "./components/EmptyView";
import { FiltersModal } from "./components/FiltersModal";
import { RegisterSaleModal } from "./components/RegisterSaleModal";
import { SaleRow } from "./components/SaleRow";

export const metadata: Metadata = {
  title: "Vendas"
};

interface SearchProps {
  searchParams: {
    page?: string;
    perPage?: string;
    customer?: string;
    year?: string;
    month?: string;
  };
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().optional(),
  customer: z.string().optional(),
  year: z.coerce.number().optional(),
  month: z.coerce.number().optional()
});

export default async function SalesPage({ searchParams }: SearchProps) {
  const { page, perPage, customer, year, month } =
    searchParamsSchema.parse(searchParams);

  const { sales, meta } = await salesService.list({
    page,
    perPage,
    customer,
    year,
    month
  });

  const hasSales = sales.length !== 0;

  return (
    <>
      <Header title="Vendas" icon={<BadgeDollarSign />} />

      <main className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <FiltersModal />

          <RegisterSaleModal />
        </div>

        {!hasSales && <EmptyView />}

        {hasSales && (
          <ScrollArea className="h-[calc(100vh-230px)] md:h-[calc(100vh-317px)]">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[175px]">valor</TableHead>
                  <TableHead className="w-[175px]">Data da venda</TableHead>
                  <TableHead className="w-[175px]">Data da registro</TableHead>
                  <TableHead className="w-[175px]">
                    Data da atualização
                  </TableHead>
                  <TableHead className="w-[150px]" />
                  <TableHead className="w-[150px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {sales.map((sale) => (
                  <SaleRow key={sale.id} sale={sale} />
                ))}
              </TableBody>
            </Table>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {hasSales && (
          <Pagination
            page={page}
            totalCount={meta.totalCount}
            perPage={meta.perPage}
            pageName="sales"
          />
        )}
      </main>
    </>
  );
}
