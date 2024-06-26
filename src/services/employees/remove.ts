import { httpClient } from "@/lib/ky";

interface RemoveEmployeeParams {
  id: string;
}

export async function remove({ id }: RemoveEmployeeParams) {
  await httpClient.delete(`employees/remove/${id}`);
}
