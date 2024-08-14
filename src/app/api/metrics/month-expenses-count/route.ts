import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const previousMonth = subMonths(now, 1);

    const startOfPreviousMonth = startOfMonth(previousMonth);
    const endOfPreviousMonth = endOfMonth(previousMonth);

    const [currentMonthExpensesCount, previousMonthExpensesCount] =
      await prisma.$transaction([
        prisma.expense.count({
          where: {
            dateOfOccurrence: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth
            }
          }
        }),
        prisma.expense.count({
          where: {
            dateOfOccurrence: {
              gte: startOfPreviousMonth,
              lte: endOfPreviousMonth
            }
          }
        })
      ]);

    const diffFromPreviousMonth =
      currentMonthExpensesCount - previousMonthExpensesCount;

    const response = NextResponse.json(
      {
        monthExpensesCount: currentMonthExpensesCount,
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
