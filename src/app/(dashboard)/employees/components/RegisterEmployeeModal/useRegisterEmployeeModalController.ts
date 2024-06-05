import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(
      JSON.stringify(
        {
          ...data,
          salary: currencyStringToNumber(data.salary)
        },
        null,
        2
      )
    );
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
