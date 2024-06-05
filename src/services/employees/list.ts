"use server";

import { cookies } from "next/headers";

import { env } from "@/env";
import { ROLES } from "@/utils/constants";

const { NEXTAUTH_URL } = env;

interface ListEmployeesResponse {
  employees: {
    id: string;
    name: string;
    phone: string;
    role: (typeof ROLES)[number];
    entryDate: string;
    salary: number;
  }[];
}

export async function list(): Promise<ListEmployeesResponse> {
  const cookieStore = cookies();

  const token = cookieStore.get("next-auth.session-token");

  const response = await fetch(`${NEXTAUTH_URL}/api/employees/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`
    },
    cache: "no-store"
  });

  const { employees } = await response.json();

  return {
    employees
  };
}
