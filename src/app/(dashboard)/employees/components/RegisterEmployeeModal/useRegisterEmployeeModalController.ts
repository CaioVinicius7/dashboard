import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
        message: "A data é inválida"
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
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync: registerEmployeeFn, isPending } = useMutation({
    mutationFn: employeesService.register
  });

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
      phone: "",
      entryDate: "",
      salary: ""
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await registerEmployeeFn({
        ...data,
        salary: currencyStringToNumber(data.salary)
      });

      reset();

      handleChangeModalVisibility();

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
        description: "Ocorreu um erro ao registar o funcionário.",
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
    control,
    ROLES,
    isLoading: isPending && isSubmitting
  };
}
