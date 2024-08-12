import { ArrowDownNarrowWide, Pencil, Trash2 } from "lucide-react";

import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
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

import { FiltersModal } from "./components/FiltersModal";
import { RegisterExpenseModal } from "./components/RegisterExpenseModal";

export default async function ExpensesPage() {
  return (
    <>
      <Header title="Despesas" icon={<ArrowDownNarrowWide />} />

      <main className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <FiltersModal />

          <RegisterExpenseModal />
        </div>

        <ScrollArea>
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[175px]">Título</TableHead>
                <TableHead className="w-[175px]">valor</TableHead>
                <TableHead className="w-[175px]">Data do ocorrido</TableHead>
                <TableHead className="w-[175px]">Data de registro</TableHead>
                <TableHead className="w-[175px]">Data de atualização</TableHead>
                <TableHead className="w-[150px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>Compra de material</TableCell>
                  <TableCell>R$ 2000</TableCell>
                  <TableCell>10/08/2024</TableCell>
                  <TableCell>10/08/2024</TableCell>
                  <TableCell>10/08/2024</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="size-5" />
                      <span className="sr-only">Editar despesa</span>
                    </Button>

                    <Button variant="ghost" size="icon">
                      <Trash2 className="size-5" />
                      <span className="sr-only">Remover despesa</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Pagination page={1} totalCount={8} perPage={8} pageName="expenses" />
      </main>
    </>
  );
}
