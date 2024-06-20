import { isValid, parse } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { ROLES_IN_DB } from "@/utils/constants";

const rolesSchema = z.enum(ROLES_IN_DB, {
  required_error: "Cargo inexistente."
});

const registerEmployeeBodySchema = z.object({
  name: z.string().min(1, "O campo nome precisa ter no mínimo 1 caractere"),
  role: rolesSchema,
  phone: z
    .string()
    .min(16, "O campo telefone precisa ser preenchido corretamente"),
  entryDate: z
    .string()
    .min(10, "O campo data de ingressão precisa ser preenchido corretamente"),
  salary: z.number({
    required_error: "O campo salário precisa ser informado",
    invalid_type_error: "O campo salário precisa ser do tipo numérico"
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, role, phone, entryDate, salary } =
      registerEmployeeBodySchema.parse(body);

    const employeeFromPhone = await prisma.employee.findUnique({
      where: {
        phone
      }
    });

    if (!!employeeFromPhone) {
      return NextResponse.json(
        {
          message: "Esse número de telefone já está em uso."
        },
        {
          status: 409
        }
      );
    }

    const salaryInCents = Math.round(salary * 100);

    const dateObject = parse(entryDate, "dd/MM/yyyy", new Date());

    const isValidDate = isValid(dateObject);

    if (!isValidDate) {
      return NextResponse.json(
        {
          message: "A data de ingressão é uma data inválida."
        },
        {
          status: 400
        }
      );
    }

    await prisma.employee.create({
      data: {
        name,
        role,
        phone,
        entryDate: dateObject,
        salary: salaryInCents
      }
    });

    const response = NextResponse.json(null, {
      status: 201
    });

    return response;
  } catch (error: any) {
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
