import { isBefore, isSameDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

const editSaleParamsSchema = z.object({
  id: z.string()
});

const editSaleBodySchema = z.object({
  customer: z
    .string()
    .min(3, "O campo nome precisa ter no mínimo 3 caractere")
    .transform((value) => value.toLocaleLowerCase()),
  dateOfSale: z.coerce
    .date({
      required_error: "O campo é obrigatório"
    })
    .optional(),
  value: z
    .number({
      required_error: "O campo salário precisa ser informado",
      invalid_type_error: "O campo salário precisa ser do tipo numérico"
    })
    .optional(),
  saleReceiptUrls: z
    .array(z.string().url("Preencha com uma URL válida"))
    .optional()
});

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = editSaleParamsSchema.parse(params);

    const body = await req.json();

    const { customer, dateOfSale, value, saleReceiptUrls } =
      editSaleBodySchema.parse(body);

    if (!!dateOfSale) {
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
    }

    await prisma.sale.update({
      where: {
        id
      },
      data: {
        customer,
        dateOfSale,
        value: value ? Math.round(value * 100) : undefined,
        saleReceiptUrls
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
