import { httpClient } from "@/lib/ky";
import type { ROLES } from "@/utils/constants";

interface Employee {
  id: string;
  name: string;
  phone: string;
  role: (typeof ROLES)[number];
  entryDate: string;
  salary: number;
}

interface ListAllEmployeesResponse {
  employees: Employee[];
}

export async function list() {
  const { employees } = await httpClient
    .get("employees/list")
    .json<ListAllEmployeesResponse>();

  return {
    employees
  };
}
