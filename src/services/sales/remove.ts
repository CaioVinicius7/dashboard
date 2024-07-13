import { httpClient } from "@/lib/ky";

interface RemoveSaleParams {
  id: string;
}

export async function remove({ id }: RemoveSaleParams) {
  await httpClient.delete(`sales/remove/${id}`);
}
