import { env } from "@/env";

interface RemoveEmployeeParams {
  id: string;
}

const { NEXT_PUBLIC_APP_API_URL } = env;

export async function remove({ id }: RemoveEmployeeParams) {
  const response = await fetch(
    `${NEXT_PUBLIC_APP_API_URL}/employees/remove/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.ok;
}
