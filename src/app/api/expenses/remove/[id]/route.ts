import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

const removeExpenseParamsSchema = z.object({
  id: z
    .string()
    .refine(
      (value) => /^[0-9a-fA-F]{24}$/.test(value),
      "O id deve ser um ObjectId válido"
    )
});

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = removeExpenseParamsSchema.parse(params);

    const expenseFromId = await prisma.expense.findUnique({
      where: {
        id
      }
    });

    if (!expenseFromId) {
      return NextResponse.json(
        {
          message: "Despesa não encontrada."
        },
        {
          status: 404
        }
      );
    }

    await prisma.expense.delete({
      where: {
        id
      }
    });

    return new NextResponse(null, {
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
