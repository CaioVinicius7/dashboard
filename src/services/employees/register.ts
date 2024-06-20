import { httpClient } from "@/lib/ky";
import { ROLES, rolesToDB } from "@/utils/constants";

interface RegisterEmployeeParams {
  name: string;
  role: (typeof ROLES)[number];
  phone: string;
  entryDate: string;
  salary: number;
}

export async function register({
  name,
  role,
  phone,
  entryDate,
  salary
}: RegisterEmployeeParams) {
  const response = await httpClient.post("employees/register", {
    json: {
      name,
      role: rolesToDB[role],
      phone,
      entryDate,
      salary
    }
  });

  return response.ok;
}
