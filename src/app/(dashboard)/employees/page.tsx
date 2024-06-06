import { Pencil } from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
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

import { RegisterEmployeeModal } from "./components/RegisterEmployeeModal";
import { RemoveEmployeeModal } from "./components/RemoveEmployeeModal";

export default async function Employees() {
  const { employees } = await employeesService.list();

  return (
    <>
      <Header title="Funcionários" />

      <main className="space-y-4 p-4">
        <RegisterEmployeeModal />

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
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.entryDate}</TableCell>
                <TableCell>{formatCurrency(employee.salary)}</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Pencil className="size-5" />
                  </Button>

                  <RemoveEmployeeModal employeeId={employee.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
