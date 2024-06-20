import { httpClient } from "@/lib/ky";
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

export async function edit({
  id,
  data: { name, role, phone, entryDate, salary }
}: RegisterEmployeeParams) {
  const response = await httpClient.put(`employees/edit/${id}`, {
    json: {
      name,
      role: role ? rolesToDB[role] : undefined,
      phone,
      entryDate,
      salary
    }
  });

  return response.ok;
}
