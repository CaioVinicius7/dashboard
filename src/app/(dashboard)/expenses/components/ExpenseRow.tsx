import { TableCell, TableRow } from "@/components/ui/table";
import type { Expense } from "@/entities/Expense";
import { capitalizeFirstLetters } from "@/utils/capitalizeFirstLetters";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import { EditExpenseModal } from "./EditExpenseModal";
import { RemoveExpenseModal } from "./RemoveExpenseModal";

interface ExpenseRowProps {
  expense: Expense;
}

export function ExpenseRow({ expense }: ExpenseRowProps) {
  return (
    <TableRow key={expense.id}>
      <TableCell>{capitalizeFirstLetters(expense.title)}</TableCell>
      <TableCell>{formatCurrency(expense.value)}</TableCell>
      <TableCell>{formatDate(expense.dateOfOccurrence)}</TableCell>
      <TableCell>{formatDate(expense.createdAt)}</TableCell>
      <TableCell>{formatDate(expense.updatedAt)}</TableCell>
      <TableCell className="flex items-center gap-2">
        <EditExpenseModal expense={expense} />

        <RemoveExpenseModal expenseId={expense.id} />
      </TableCell>
    </TableRow>
  );
}
