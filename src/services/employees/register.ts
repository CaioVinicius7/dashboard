import { env } from "@/env";
import { ROLES } from "@/utils/constants";

interface RegisterEmployeeParams {
  name: string;
  role: (typeof ROLES)[number];
  phone: string;
  entryDate: string;
  salary: number;
}

const { NEXT_PUBLIC_APP_API_URL } = env;

export async function register({
  name,
  role,
  phone,
  entryDate,
  salary
}: RegisterEmployeeParams) {
  await fetch(`${NEXT_PUBLIC_APP_API_URL}/employees/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      role,
      phone,
      entryDate,
      salary
    })
  });
}
