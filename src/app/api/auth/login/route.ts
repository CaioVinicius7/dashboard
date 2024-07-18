import { compare } from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";

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

    const response = NextResponse.json({
      user: {
        id: userFromEmail.id,
        name: userFromEmail.name,
        email: userFromEmail.email
      }
    });

    return response;
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation error.",
          errors: error.flatten().fieldErrors
        },
        {
          status: 400
        }
      );
    }

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
