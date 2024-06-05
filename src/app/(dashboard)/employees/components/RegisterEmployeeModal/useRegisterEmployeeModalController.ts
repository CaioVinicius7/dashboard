import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { employeesService } from "@/services/employees";
import { ROLES } from "@/utils/constants";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";

const rolesSchema = z.enum(ROLES, {
  required_error: "Selecione o cargo"
});

const schema = z.object({
  name: z.string().min(1, "Preencha o nome do funcionário"),
  role: rolesSchema,
  phone: z.string().min(16, "Preencha o telefone corretamente"),
  entryDate: z.string().min(10, "Preencha a data corretamente"),
  salary: z
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
    )
});

type FormData = z.infer<typeof schema>;

export function useRegisterEmployeeModalController() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      entryDate: "",
      salary: ""
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await employeesService.register({
        ...data,
        salary: currencyStringToNumber(data.salary)
      });

      reset();

      toast({
        description: "Funcionário registrado com sucesso!"
      });
    } catch {
      toast({
        description: "Ocorreu um erro ao registar o funcionário.",
        variant: "destructive"
      });
    }
  });

  function resetFormOnClose(isOpen: boolean) {
    if (!isOpen) {
      reset();
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    resetFormOnClose,
    ROLES
  };
}
