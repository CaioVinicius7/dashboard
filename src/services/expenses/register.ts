import type { Expense } from "@/entities/Expense";
import { httpClient } from "@/lib/ky";
import type { OmitTyped } from "@/utils/typeUtils";

type RegisterExpenseParams = OmitTyped<
  Expense,
  "id" | "createdAt" | "updatedAt"
>;

export async function register({
  title,
  dateOfOccurrence,
  value
}: RegisterExpenseParams) {
  await httpClient.post("expenses/register", {
    json: {
      title,
      dateOfOccurrence,
      value
    }
  });
}
