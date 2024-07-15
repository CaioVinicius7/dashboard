import type { ROLES } from "@/utils/constants";

export interface Employee {
  id: string;
  name: string;
  phone: string;
  role: (typeof ROLES)[number];
  entryDate: string;
  salary: number;
}
