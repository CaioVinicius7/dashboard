import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

const getSalesSearchParamsSchema = z.object({
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

    const { page, perPage } = getSalesSearchParamsSchema.parse({
      page: searchParams.get("page") ?? 1,
      perPage: searchParams.get("perPage") ?? 8
    });

    const [sales, totalCount] = await prisma.$transaction([
      prisma.sale.findMany({
        skip: (page - 1) * perPage,
        take: perPage
      }),
      prisma.sale.count()
    ]);

    const formattedSales = sales.map((sale) => ({
      ...sale,
      value: sale.value / 100
    }));

    const response = NextResponse.json(
      {
        sales: formattedSales,
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
