import { endOfMonth, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET() {
  try {
    const now = new Date();

    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const monthHighestSale = await prisma.sale.findFirst({
      where: {
        dateOfSale: {
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
        monthHighestSale
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
