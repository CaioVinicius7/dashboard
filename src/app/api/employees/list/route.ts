import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { rolesToApp } from "@/utils/constants";

const getEmployeesSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .transform(Math.abs)
    .transform((value) => (value === 0 ? 1 : value)),
  perPage: z.coerce
    .number()
    .transform(Math.abs)
    .transform((value) => (value === 0 ? 1 : value))
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const { page, perPage } = getEmployeesSearchParamsSchema.parse({
      page: searchParams.get("page") ?? 1,
      perPage: searchParams.get("perPage") ?? 8
    });

    const [employees, totalCount] = await prisma.$transaction([
      prisma.employee.findMany({
        skip: (page - 1) * perPage,
        take: perPage
      }),
      prisma.employee.count()
    ]);

    const formattedEmployees = employees.map((employee) => ({
      ...employee,
      role: rolesToApp[employee.role],
      salary: employee.salary / 100
    }));

    const response = NextResponse.json(
      {
        employees: formattedEmployees,
        meta: {
          totalCount,
          page,
          perPage
        }
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
