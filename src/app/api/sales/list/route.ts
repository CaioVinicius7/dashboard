import {
  endOfMonth,
  endOfYear,
  parse,
  startOfMonth,
  startOfYear
} from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { CURRENT_YEAR } from "@/utils/constants";

const getSalesSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .transform(Math.abs)
    .transform((value) => (value === 0 ? 1 : value))
    .default(1),
  perPage: z.coerce
    .number()
    .transform(Math.abs)
    .transform((value) => (value === 0 ? 1 : value))
    .default(8),
  customer: z
    .string()
    .optional()
    .transform((value) => value?.toLocaleLowerCase()),
  paymentStatus: z.enum(["all", "complete", "pending"]).default("all"),
  year: z.coerce
    .number()
    .max(CURRENT_YEAR, "O ano não pode ser maior do que o ano atual.")
    .optional(),
  month: z.coerce.number().optional()
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const { page, perPage, customer, paymentStatus, year, month } =
      getSalesSearchParamsSchema.parse(
        Object.fromEntries(searchParams.entries())
      );

    const parsedDate =
      !!year && !!month
        ? parse(`${year}-${month}-01`, "yyyy-MM-dd", new Date())
        : parse(`${year}-01-01`, "yyyy-MM-dd", new Date());

    const dateOfSaleFilter = !year
      ? undefined
      : !!month
        ? {
            gte: startOfMonth(parsedDate),
            lte: endOfMonth(parsedDate)
          }
        : {
            gte: startOfYear(parsedDate),
            lte: endOfYear(parsedDate)
          };

    const paymentStatusFilter = {
      all: undefined,
      complete: true,
      pending: false
    }[paymentStatus];

    const [sales, totalCount] = await prisma.$transaction([
      prisma.sale.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: {
          customer: {
            contains: customer
          },
          paymentIsComplete: paymentStatusFilter,
          occurredAt: dateOfSaleFilter
        },
        orderBy: {
          occurredAt: "desc"
        }
      }),
      prisma.sale.count({
        where: {
          customer: {
            contains: customer
          },
          paymentIsComplete: paymentStatusFilter,
          occurredAt: dateOfSaleFilter
        }
      })
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
