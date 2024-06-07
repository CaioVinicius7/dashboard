import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
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

interface useEditEmployeeModalControllerParams {
  employee: {
    id: string;
    name: string;
    role: (typeof ROLES)[number];
    phone: string;
    entryDate: string;
    salary: number;
  };
}

export function useEditEmployeeModalController({
  employee
}: useEditEmployeeModalControllerParams) {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  function handleChangeModalVisibility() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      reset();
      setIsOpen(true);
    }
  }

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: employee.name,
      role: employee.role,
      phone: employee.role,
      entryDate: employee.entryDate,
      salary: employee.salary
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      console.log(JSON.stringify(data, null, 2));
    } catch {
      toast({
        description: "Ocorreu um erro ao editar os dados do funcionário.",
        variant: "destructive"
      });
    }
  });

  return {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    ROLES
  };
}
