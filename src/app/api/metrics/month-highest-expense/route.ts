import { endOfMonth, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const monthHighestExpense = await prisma.expense.findFirst({
      where: {
        dateOfOccurrence: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth
        }
      },
      orderBy: {
        value: "desc"
      },
      take: 1
    });

    const response = NextResponse.json(
      {
        monthHighestExpense
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
