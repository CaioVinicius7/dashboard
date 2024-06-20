import { httpClient } from "@/lib/ky";

interface RemoveEmployeeParams {
  id: string;
}

export async function remove({ id }: RemoveEmployeeParams) {
  const response = await httpClient.delete(`employees/remove/${id}`);

  return response.ok;
}
