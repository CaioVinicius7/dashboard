import { ArrowDownNarrowWide, Pencil, Trash2 } from "lucide-react";
import { z } from "zod";

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
import { expensesService } from "@/services/expenses";
import { capitalizeFirstLetters } from "@/utils/capitalizeFirstLetters";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import { FiltersModal } from "./components/FiltersModal";
import { RegisterExpenseModal } from "./components/RegisterExpenseModal";

interface SearchProps {
  searchParams: {
    page?: string;
    perPage?: string;
    title?: string;
    year?: string;
    month?: string;
  };
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().optional(),
  title: z.string().optional(),
  year: z.coerce.number().optional(),
  month: z.coerce.number().optional()
});

export default async function ExpensesPage({ searchParams }: SearchProps) {
  const { page, perPage, title, year, month } =
    searchParamsSchema.parse(searchParams);

  const { expenses, meta } = await expensesService.list({
    page,
    perPage,
    title,
    year,
    month
  });

  const hasExpenses = expenses.length !== 0;

  return (
    <>
      <Header title="Despesas" icon={<ArrowDownNarrowWide />} />

      <main className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <FiltersModal />

          <RegisterExpenseModal />
        </div>

        {hasExpenses && (
          <ScrollArea>
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[175px]">Título</TableHead>
                  <TableHead className="w-[175px]">valor</TableHead>
                  <TableHead className="w-[175px]">Data do ocorrido</TableHead>
                  <TableHead className="w-[175px]">Data de registro</TableHead>
                  <TableHead className="w-[175px]">
                    Data de atualização
                  </TableHead>
                  <TableHead className="w-[150px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {capitalizeFirstLetters(expense.title)}
                    </TableCell>
                    <TableCell>{formatCurrency(expense.value)}</TableCell>
                    <TableCell>
                      {formatDate(expense.dateOfOccurrence)}
                    </TableCell>
                    <TableCell>{formatDate(expense.createdAt)}</TableCell>
                    <TableCell>{formatDate(expense.updatedAt)}</TableCell>
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
        )}

        {hasExpenses && (
          <Pagination
            page={page}
            totalCount={meta.totalCount}
            perPage={meta.perPage}
            pageName="expenses"
          />
        )}
      </main>
    </>
  );
}
