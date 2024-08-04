import { isBefore, isSameDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

const registerSaleBodySchema = z.object({
  customer: z
    .string()
    .min(3, "O campo nome precisa ter no mínimo 3 caractere")
    .transform((value) => value?.toLocaleLowerCase()),
  dateOfSale: z.coerce.date({
    required_error: "O campo é obrigatório"
  }),
  value: z.number({
    required_error: "O campo salário precisa ser informado",
    invalid_type_error: "O campo salário precisa ser do tipo numérico"
  }),
  saleReceiptUrls: z
    .array(z.string().url("Preencha com uma URL válida"))
    .optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer, dateOfSale, value, saleReceiptUrls } =
      registerSaleBodySchema.parse(body);

    const valueInCents = Math.round(value * 100);

    const isBeforeOrSameDate =
      isBefore(dateOfSale, new Date()) || isSameDay(dateOfSale, new Date());

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
        dateOfSale,
        value: valueInCents,
        saleReceiptUrls
      }
    });

    return new NextResponse(undefined, {
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
