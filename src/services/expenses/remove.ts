import { httpClient } from "@/lib/ky";

interface RemoveExpenseParams {
  id: string;
}

export async function remove({ id }: RemoveExpenseParams) {
  await httpClient.delete(`expenses/remove/${id}`);
}
