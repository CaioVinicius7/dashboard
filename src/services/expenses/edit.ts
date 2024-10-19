import type { Expense } from "@/entities/Expense";
import { httpClient } from "@/lib/ky";
import type { OmitTyped } from "@/utils/typeUtils";

interface EditExpenseParams {
  id: string;
  data: OmitTyped<Expense, "id" | "createdAt" | "updatedAt">;
}

export async function edit({
  id,
  data: { title, occurredAt, value }
}: EditExpenseParams) {
  await httpClient.put(`expenses/edit/${id}`, {
    json: {
      title,
      value,
      occurredAt
    }
  });
}
