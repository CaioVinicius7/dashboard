import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { rolesToApp } from "@/utils/constants";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();

    const formattedEmployees = employees.map((employee) => ({
      ...employee,
      role: rolesToApp[employee.role],
      salary: employee.salary / 100
    }));

    const response = NextResponse.json(
      {
        employees: formattedEmployees
      },
      {
        status: 200
      }
    );

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 500
      }
    );
  }
}
