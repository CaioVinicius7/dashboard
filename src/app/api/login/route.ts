import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(JSON.stringify(body, null, 2));

  return NextResponse.json({
    message: "Autenticado com sucesso!"
  });
}
