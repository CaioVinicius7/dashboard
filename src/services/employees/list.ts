import type { Employee } from "@/entities/Employee";
import { httpClient } from "@/lib/ky";

interface ListEmployeesResponse {
  employees: Employee[];
}

export async function list() {
  const { employees } = await httpClient
    .get("employees/list")
    .json<ListEmployeesResponse>();

  return {
    employees
  };
}
