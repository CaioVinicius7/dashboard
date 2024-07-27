import { Users } from "lucide-react";
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
import { employeesService } from "@/services/employees";

import { EmployeeRow } from "./components/EmployeeRow";
import { EmptyView } from "./components/EmptyView";
import { RegisterEmployeeModal } from "./components/RegisterEmployeeModal";

export const metadata: Metadata = {
  title: "Funcionários"
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

export default async function EmployeesPage({ searchParams }: SearchProps) {
  const { page, perPage } = searchParamsSchema.parse(searchParams);

  const { employees, meta } = await employeesService.list({
    page,
    perPage
  });

  const hasEmployees = employees.length !== 0;

  return (
    <>
      <Header title="Funcionários" icon={<Users />} />

      <main className="space-y-4 p-4">
        <RegisterEmployeeModal buttonShouldPulse={!hasEmployees} />

        {!hasEmployees && <EmptyView />}

        {hasEmployees && (
          <ScrollArea className="h-[calc(100vh-317px)]">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-[175px]">Cargo</TableHead>
                  <TableHead className="w-[175px]">Contato</TableHead>
                  <TableHead className="w-[175px]">Data de ingressão</TableHead>
                  <TableHead className="w-[150px]">Salário</TableHead>
                  <TableHead className="w-[150px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {employees.map((employee) => (
                  <EmployeeRow key={employee.id} employee={employee} />
                ))}
              </TableBody>
            </Table>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {hasEmployees && (
          <Pagination
            page={page}
            totalCount={meta.totalCount}
            perPage={meta.perPage}
            pageName="employees"
          />
        )}
      </main>
    </>
  );
}
