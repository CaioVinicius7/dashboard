import { isBefore, isSameDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

const editExpenseParamsSchema = z.object({
  id: z
    .string()
    .refine(
      (value) => /^[0-9a-fA-F]{24}$/.test(value),
      "O id deve ser um ObjectId válido"
    )
});

const editExpenseBodySchema = z.object({
  title: z
    .string()
    .min(3, "O campo nome precisa ter no mínimo 3 caractere")
    .transform((value) => value?.toLocaleLowerCase()),
  occurredAt: z.coerce.date({
    required_error: "O campo é obrigatório"
  }),
  value: z.number({
    required_error: "O campo valor precisa ser informado",
    invalid_type_error: "O campo valor precisa ser do tipo numérico"
  })
});

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = editExpenseParamsSchema.parse(params);

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

    const body = await req.json();

    const { title, occurredAt, value } = editExpenseBodySchema.parse(body);

    const valueInCents = Math.round(value * 100);

    const isBeforeOrSameDate =
      isBefore(occurredAt, new Date()) || isSameDay(occurredAt, new Date());

    if (!isBeforeOrSameDate) {
      return NextResponse.json(
        {
          message: "A data deve ser igual ou anterior à data atual."
        },
        {
          status: 400
        }
      );
    }

    await prisma.expense.update({
      where: {
        id
      },
      data: {
        title,
        occurredAt,
        value: valueInCents
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
