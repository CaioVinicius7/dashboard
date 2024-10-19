import { endOfMonth, parse, startOfMonth } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

const getMonthReceiptParamsSchema = z.object({
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, "O campo precisa estar no formado MM"),
  year: z.string().regex(/^\d{4}$/, "O ano precisa estar no formato AAAA")
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const { month, year } = getMonthReceiptParamsSchema.parse({
      month: searchParams.get("month"),
      year: searchParams.get("year")
    });

    const parsedMonth = parse(`${year}-${month}-01`, "yyyy-MM-dd", new Date());

    const sales = await prisma.sale.groupBy({
      by: ["occurredAt"],
      _sum: {
        value: true
      },
      where: {
        occurredAt: {
          gte: startOfMonth(parsedMonth),
          lte: endOfMonth(parsedMonth)
        }
      },
      orderBy: {
        occurredAt: "asc"
      }
    });

    const formattedSales = sales.map((sale) => ({
      receipt: (sale._sum.value ?? 0) / 100,
      date: sale.occurredAt
    }));

    const response = NextResponse.json(
      {
        data: formattedSales
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
