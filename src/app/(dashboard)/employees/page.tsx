import { SearchX } from "lucide-react";

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
import { employeesService } from "@/services/employees";
import { formatCurrency } from "@/utils/formatCurrency";

import { EditEmployeeModal } from "./components/EditEmployeeModal";
import { RegisterEmployeeModal } from "./components/RegisterEmployeeModal";
import { RemoveEmployeeModal } from "./components/RemoveEmployeeModal";

export default async function Employees() {
  const { employees } = await employeesService.list();

  return (
    <>
      <Header title="Funcionários" />

      <main className="space-y-4 p-4">
        <RegisterEmployeeModal />

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

            {!!employees && (
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.entryDate}</TableCell>
                    <TableCell>{formatCurrency(employee.salary)}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <EditEmployeeModal employee={employee} />

                      <RemoveEmployeeModal employeeId={employee.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {employees.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 px-3 pt-16">
            <SearchX className="size-16" />

            <div className="max-w-[550px] space-y-2 text-center">
              <h2 className="text-2xl">Nenhum Funcionário Registrado</h2>

              <p className="text-sm">
                Ainda não há funcionários cadastrados. Por favor, adicione novos
                registros para começar a visualizá-los aqui.
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
