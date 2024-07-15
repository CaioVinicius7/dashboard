import type { Employee } from "@/entities/Employee";
import { httpClient } from "@/lib/ky";
import { rolesToDB } from "@/utils/constants";

interface RegisterEmployeeParams {
  id: string;
  data: Partial<Employee>;
}

export async function edit({
  id,
  data: { name, role, phone, entryDate, salary }
}: RegisterEmployeeParams) {
  await httpClient.put(`employees/edit/${id}`, {
    json: {
      name,
      role: role ? rolesToDB[role] : undefined,
      phone,
      entryDate,
      salary
    }
  });
}
