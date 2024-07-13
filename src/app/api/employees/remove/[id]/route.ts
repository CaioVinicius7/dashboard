import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

const removeEmployeeParamsSchema = z.object({
  id: z.string()
});

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = removeEmployeeParamsSchema.parse(params);

    const employeeFromId = await prisma.employee.findUnique({
      where: {
        id
      }
    });

    if (!employeeFromId) {
      return NextResponse.json(
        {
          message: "Funcionário não encontrado."
        },
        {
          status: 400
        }
      );
    }

    await prisma.employee.delete({
      where: {
        id
      }
    });

    return new NextResponse(undefined, {
      status: 204
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation error.",
          errors: error.flatten().fieldErrors
        },
        {
          status: 400
        }
      );
    }

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
