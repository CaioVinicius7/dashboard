import { TableCell, TableRow } from "@/components/ui/table";
import type { Employee } from "@/entities/Employee";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import { EditEmployeeModal } from "./EditEmployeeModal";
import { RemoveEmployeeModal } from "./RemoveEmployeeModal";

interface EmployeeRowProps {
  employee: Employee;
}

export function EmployeeRow({ employee }: EmployeeRowProps) {
  return (
    <TableRow key={employee.id}>
      <TableCell className="font-medium">{employee.name}</TableCell>
      <TableCell>{employee.role}</TableCell>
      <TableCell>{employee.phone}</TableCell>
      <TableCell>{formatDate(employee.entryDate)}</TableCell>
      <TableCell>{formatCurrency(employee.salary)}</TableCell>

      <TableCell className="flex items-center gap-2">
        <EditEmployeeModal employee={employee} />

        <RemoveEmployeeModal employeeId={employee.id} />
      </TableCell>
    </TableRow>
  );
}
