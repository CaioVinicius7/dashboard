import { TableCell, TableRow } from "@/components/ui/table";
import type { ROLES } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatCurrency";

import { EditEmployeeModal } from "./EditEmployeeModal";
import { RemoveEmployeeModal } from "./RemoveEmployeeModal";

interface EmployeeRowProps {
  employee: {
    id: string;
    name: string;
    phone: string;
    role: (typeof ROLES)[number];
    entryDate: string;
    salary: number;
  };
}

export function EmployeeRow({ employee }: EmployeeRowProps) {
  return (
    <TableRow key={employee.id}>
      <TableCell className="font-medium">{employee.name}</TableCell>
      <TableCell>{employee.role}</TableCell>
      <TableCell>{employee.phone}</TableCell>
      <TableCell>{employee.entryDate}</TableCell>
      <TableCell>{formatCurrency(employee.salary)}</TableCell>

      <TableCell className="flex items-center gap-2">
        <EditEmployeeModal employee={employee} />

        <RemoveEmployeeModal employeeId={employee.id} />
      </TableCell>
    </TableRow>
  );
}
