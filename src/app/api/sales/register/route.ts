import { isBefore, isSameDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

const registerSaleBodySchema = z.object({
  customer: z
    .string()
    .min(3, "O campo nome precisa ter no mínimo 3 caractere")
    .transform((value) => value?.toLocaleLowerCase()),
  occurredAt: z.coerce.date({
    required_error: "O campo é obrigatório"
  }),
  value: z.number({
    required_error: "O campo valor precisa ser informado",
    invalid_type_error: "O campo valor precisa ser do tipo numérico"
  }),
  saleReceiptUrls: z
    .array(z.string().url("Preencha com uma URL válida"))
    .optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer, occurredAt, value, saleReceiptUrls } =
      registerSaleBodySchema.parse(body);

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

    await prisma.sale.create({
      data: {
        customer,
        occurredAt,
        value: valueInCents,
        saleReceiptUrls
      }
    });

    return new NextResponse(null, {
      status: 201
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
