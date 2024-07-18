import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import type { Employee } from "@/entities/Employee";
import { employeesService } from "@/services/employees";
import { ROLES } from "@/utils/constants";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";
import { formatDate } from "@/utils/formatDate";

const rolesSchema = z.enum(ROLES, {
  required_error: "Selecione o cargo"
});

const schema = z.object({
  name: z.string().min(1, "Preencha o nome do funcionário"),
  role: rolesSchema,
  phone: z.string().min(16, "Preencha o telefone corretamente"),
  entryDate: z
    .string()
    .min(10, "Preencha a data corretamente")
    .refine(
      (value) => {
        const dateObject = parse(value, "dd/MM/yyyy", new Date());

        const isValidDate = isValid(dateObject);

        return isValidDate;
      },
      {
        message: "A data é inválida."
      }
    )
    .refine(
      (value) => {
        const currentDate = new Date();
        const date = parse(value, "dd/MM/yyyy", new Date());

        return isBefore(date, currentDate) || isSameDay(date, currentDate);
      },
      {
        message: "A data deve ser igual ou anterior à data atual"
      }
    ),
  salary: z.union([
    z
      .string()
      .min(1, "Preencha o salário")
      .refine(
        (value) => {
          const numberValue = currencyStringToNumber(value);

          return numberValue >= 100;
        },
        {
          message: "O valor mínimo é R$100"
        }
      ),
    z.number().min(100, "O valor mínimo é R$100")
  ])
});

type FormData = z.infer<typeof schema>;

interface UseModalControllerParams {
  employee: Employee;
  closeModal: () => void;
}

export function useModalController({
  employee,
  closeModal
}: UseModalControllerParams) {
  const { toast } = useToast();

  const router = useRouter();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: employee.name,
      role: employee.role,
      phone: employee.role,
      entryDate: formatDate(employee.entryDate),
      salary: employee.salary
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await employeesService.edit({
        id: employee.id,
        data: {
          ...data,
          salary: currencyStringToNumber(data.salary)
        }
      });

      closeModal();

      toast({
        description: "Funcionário registrado com sucesso!"
      });

      router.refresh();
    } catch (error) {
      if (error instanceof HTTPError) {
        const { message } = await error.response.json();

        toast({
          description: message,
          variant: "destructive"
        });

        return;
      }

      toast({
        description: "Ocorreu um erro ao editar os dados do funcionário.",
        variant: "destructive"
      });
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    ROLES
  };
}
