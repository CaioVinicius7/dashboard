import type { Employee } from "@/entities/Employee";
import { httpClient } from "@/lib/ky";
import { rolesToDB } from "@/utils/constants";
import type { OmitTyped } from "@/utils/typeUtils";

type RegisterEmployeeParams = OmitTyped<Employee, "id">;

export async function register({
  name,
  role,
  phone,
  entryDate,
  salary
}: RegisterEmployeeParams) {
  await httpClient.post("employees/register", {
    json: {
      name,
      role: rolesToDB[role],
      phone,
      entryDate,
      salary
    }
  });
}
