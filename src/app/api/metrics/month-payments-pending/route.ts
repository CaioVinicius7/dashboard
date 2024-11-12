import { endOfMonth, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET() {
  try {
    const now = new Date();

    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const [currentMonthPendingPaymentsAmount, salesWithPendingPaymentsCount] =
      await prisma.$transaction([
        prisma.sale.aggregate({
          _sum: {
            value: true
          },
          where: {
            occurredAt: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth
            },
            paymentIsComplete: false
          }
        }),
        prisma.sale.count({
          where: {
            occurredAt: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth
            },
            paymentIsComplete: false
          }
        })
      ]);

    const totalPendingPayments =
      currentMonthPendingPaymentsAmount._sum.value ?? 0;

    const response = NextResponse.json(
      {
        totalPendingPayments,
        salesWithPendingPaymentsCount
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
