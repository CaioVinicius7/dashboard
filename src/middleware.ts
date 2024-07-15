import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { env } from "./env";

const { NEXTAUTH_SECRET } = env;

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: NEXTAUTH_SECRET
  });

  if (!token) {
    return NextResponse.json(
      {
        message: "Token inválido ou inexistente."
      },
      {
        status: 401
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/employees/:path*", "/api/sales/:path*"]
};
