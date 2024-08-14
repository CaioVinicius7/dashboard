import { isBefore, isSameDay, isValid, parse } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { ROLES_IN_DB } from "@/utils/constants";

interface Params {
  id: string;
}

const rolesSchema = z.enum(ROLES_IN_DB, {
  required_error: "Cargo inexistente."
});

const editEmployeeParamsSchema = z.object({
  id: z
    .string()
    .refine(
      (value) => /^[0-9a-fA-F]{24}$/.test(value),
      "O id deve ser um ObjectId válido"
    )
});

const editEmployeeBodySchema = z.object({
  name: z
    .string()
    .min(1, "O campo nome precisa ter no mínimo 1 caractere")
    .transform((value) => value.toLowerCase()),
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

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = editEmployeeParamsSchema.parse(params);

    const employeeFromId = await prisma.employee.findUnique({
      where: {
        id
      }
    });

    if (!employeeFromId) {
      return NextResponse.json(
        {
          message: "Funcionário não encontrado."
        },
        {
          status: 404
        }
      );
    }

    const body = await req.json();

    const { name, role, phone, entryDate, salary } =
      editEmployeeBodySchema.parse(body);

    const employeeFromPhone = await prisma.employee.findUnique({
      where: {
        phone,
        NOT: {
          id: employeeFromId.id
        }
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

    const dateObject = !!entryDate
      ? parse(entryDate, "dd/MM/yyyy", new Date())
      : undefined;

    const isValidDate = isValid(dateObject);

    if (!!entryDate && !isValidDate) {
      return NextResponse.json(
        {
          message: "A data de ingressão é uma data inválida."
        },
        {
          status: 400
        }
      );
    }

    if (!!dateObject) {
      const isBeforeOrSameDate =
        isBefore(dateObject, new Date()) || isSameDay(dateObject, new Date());

      if (!isBeforeOrSameDate) {
        return NextResponse.json(
          {
            message: "A data deve ser igual ou anterior à data atual."
          },
          {
            status: 400
          }
        );
      }
    }

    await prisma.employee.update({
      where: {
        id
      },
      data: {
        name,
        role,
        phone,
        entryDate: dateObject,
        salary: salary ? Math.round(salary * 100) : undefined
      }
    });

    return new NextResponse(null, {
      status: 204
    });
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
