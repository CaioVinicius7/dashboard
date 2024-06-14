import { env } from "@/env";
import { ROLES, rolesToDB } from "@/utils/constants";

interface RegisterEmployeeParams {
  id: string;
  data: {
    name?: string;
    role?: (typeof ROLES)[number];
    phone?: string;
    entryDate?: string;
    salary?: number;
  };
}

const { NEXT_PUBLIC_APP_API_URL } = env;

export async function edit({
  id,
  data: { name, role, phone, entryDate, salary }
}: RegisterEmployeeParams) {
  const response = await fetch(
    `${NEXT_PUBLIC_APP_API_URL}/employees/edit/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        role: role ? rolesToDB[role] : undefined,
        phone,
        entryDate,
        salary
      })
    }
  );

  return response.ok;
}
