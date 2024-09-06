import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET() {
  try {
    const now = new Date();

    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const previousMonth = subMonths(now, 1);

    const startOfPreviousMonth = startOfMonth(previousMonth);
    const endOfPreviousMonth = endOfMonth(previousMonth);

    const [currentMonthSalesCount, previousMonthSalesCount] =
      await prisma.$transaction([
        prisma.sale.count({
          where: {
            dateOfSale: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth
            }
          }
        }),
        prisma.sale.count({
          where: {
            dateOfSale: {
              gte: startOfPreviousMonth,
              lte: endOfPreviousMonth
            }
          }
        })
      ]);

    const diffFromPreviousMonth =
      currentMonthSalesCount - previousMonthSalesCount;

    const response = NextResponse.json(
      {
        monthSalesCount: currentMonthSalesCount,
        diffFromPreviousMonth
      },
      {
        status: 200
      }
    );

    return response;
  } catch (error: any) {
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
