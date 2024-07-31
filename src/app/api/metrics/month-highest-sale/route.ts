import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const monthHighestSale = await prisma.sale.findFirst({
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
