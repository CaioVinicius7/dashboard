import { Header } from "@/components/Header";
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

export default async function EmployeesPage() {
  const { employees } = await employeesService.list();

  const hasEmployees = employees.length !== 0;

  return (
    <>
      <Header title="Funcionários" />

      <main className="space-y-4 p-4">
        <RegisterEmployeeModal buttonShouldPulse={!hasEmployees} />

        {!hasEmployees && <EmptyView />}

        {hasEmployees && (
          <ScrollArea className="h-[calc(100vh-170px)]">
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
      </main>
    </>
  );
}
