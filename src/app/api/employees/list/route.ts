import { format } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { env } from "@/env";
import { prisma } from "@/lib/prisma";

const { NEXTAUTH_SECRET } = env;

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: NEXTAUTH_SECRET
    });

    if (!token) {
      return NextResponse.json(
        {
          message: "Token inválido ou inexistente. "
        },
        {
          status: 401
        }
      );
    }

    const employees = await prisma.employee.findMany();

    const formattedEmployees = employees.map((employee) => ({
      ...employee,
      entryDate: format(new Date(employee.entryDate), "dd/MM/yyyy"),
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
