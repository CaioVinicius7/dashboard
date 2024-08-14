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

    const [
      currentMonthSalesAmount,
      previousMonthSalesAmount,
      currentMonthExpensesAmount,
      previousMonthExpensesAmount
    ] = await prisma.$transaction([
      prisma.sale.aggregate({
        _sum: {
          value: true
        },
        where: {
          dateOfSale: {
            gte: startOfCurrentMonth,
            lte: endOfCurrentMonth
          }
        }
      }),
      prisma.sale.aggregate({
        _sum: {
          value: true
        },
        where: {
          dateOfSale: {
            gte: startOfPreviousMonth,
            lte: endOfPreviousMonth
          }
        }
      }),
      prisma.expense.aggregate({
        _sum: {
          value: true
        },
        where: {
          dateOfOccurrence: {
            gte: startOfCurrentMonth,
            lte: startOfCurrentMonth
          }
        }
      }),
      prisma.expense.aggregate({
        _sum: {
          value: true
        },
        where: {
          dateOfOccurrence: {
            gte: startOfPreviousMonth,
            lte: endOfPreviousMonth
          }
        }
      })
    ]);

    const currentSalesAmountTotal = currentMonthSalesAmount._sum.value ?? 0;
    const currentExpensesAmountTotal =
      currentMonthExpensesAmount._sum.value ?? 0;

    const currentMonthProfit =
      currentSalesAmountTotal - currentExpensesAmountTotal;

    const previousSalesAmountTotal = previousMonthSalesAmount._sum.value ?? 0;
    const previousExpensesAmountTotal =
      previousMonthExpensesAmount._sum.value ?? 0;

    const previousMonthProfit =
      previousSalesAmountTotal - previousExpensesAmountTotal;

    const diffFromPreviousMonth = currentMonthProfit - previousMonthProfit;
    const diffFromPreviousMonthInPercent =
      previousMonthProfit !== 0
        ? ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) *
          100
        : 0;

    const response = NextResponse.json(
      {
        currentMonthProfit,
        diffFromPreviousMonth,
        diffFromPreviousMonthInPercent
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
