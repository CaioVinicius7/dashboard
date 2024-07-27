import type { Employee } from "@/entities/Employee";
import { httpClient } from "@/lib/ky";

interface ListEmployeesParams {
  page?: number;
  perPage?: number;
}

interface ListEmployeesResponse {
  employees: Employee[];
  meta: {
    totalCount: number;
    page: number;
    perPage: number;
  };
}

export async function list({ page = 1, perPage = 8 }: ListEmployeesParams) {
  const { employees, meta } = await httpClient
    .get("employees/list", {
      searchParams: {
        page,
        perPage
      }
    })
    .json<ListEmployeesResponse>();

  return {
    employees,
    meta
  };
}
