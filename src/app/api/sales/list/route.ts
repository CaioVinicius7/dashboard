import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany();

    const formattedSales = sales.map((sale) => ({
      ...sale,
      value: sale.value / 100
    }));

    const response = NextResponse.json(
      {
        sales: formattedSales
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
