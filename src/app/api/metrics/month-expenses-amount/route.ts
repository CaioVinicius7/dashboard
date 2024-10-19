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

    const [currentMonthExpensesAmount, previousMonthExpensesAmount] =
      await prisma.$transaction([
        prisma.expense.aggregate({
          _sum: {
            value: true
          },
          where: {
            occurredAt: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth
            }
          }
        }),
        prisma.expense.aggregate({
          _sum: {
            value: true
          },
          where: {
            occurredAt: {
              gte: startOfPreviousMonth,
              lte: endOfPreviousMonth
            }
          }
        })
      ]);

    const currentTotal = currentMonthExpensesAmount._sum.value ?? 0;
    const previousTotal = previousMonthExpensesAmount._sum.value ?? 0;

    const diffFromPreviousMonth = currentTotal - previousTotal;

    const response = NextResponse.json(
      {
        monthExpensesAmount: currentTotal,
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
