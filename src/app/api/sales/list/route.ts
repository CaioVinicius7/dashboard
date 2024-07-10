import { format } from "date-fns";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany();

    const formattedSales = sales.map((sale) => ({
      ...sale,
      dateOfSale: format(new Date(sale.dateOfSale), "dd/MM/yyyy"),
      value: sale.value / 100,
      createdAt: format(new Date(sale.createdAt), "dd/MM/yyyy"),
      updatedAt: format(new Date(sale.updatedAt), "dd/MM/yyyy")
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
