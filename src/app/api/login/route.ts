import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/env";
import { prisma } from "@/lib/prisma";

const { JWT_SECRET } = env;

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = loginBodySchema.parse(body);

    const userFromEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!userFromEmail) {
      return NextResponse.json(
        {
          message: "Credenciais incorretas."
        },
        {
          status: 400
        }
      );
    }

    const isPasswordValid = await compare(password, userFromEmail.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Credenciais incorretas."
        },
        {
          status: 400
        }
      );
    }

    const token = sign({}, JWT_SECRET, {
      subject: userFromEmail.id,
      expiresIn: "1d"
    });

    const response = NextResponse.json({});

    response.cookies.set("@dashboard-auth-token", token, {
      httpOnly: true,
      sameSite: "strict",
      expires: 60 * 60 * 24, // 1d
      path: "/"
    });

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
