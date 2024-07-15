import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

const removeSaleParamsSchema = z.object({
  id: z.string()
});

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = removeSaleParamsSchema.parse(params);

    const saleFromId = await prisma.sale.findUnique({
      where: {
        id
      }
    });

    if (!saleFromId) {
      return NextResponse.json(
        {
          message: "Venda não encontrada."
        },
        {
          status: 400
        }
      );
    }

    await prisma.sale.delete({
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
