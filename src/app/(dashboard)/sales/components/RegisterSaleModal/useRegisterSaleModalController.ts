import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { currencyStringToNumber } from "@/utils/currencyStringToNumber";

const schema = z.object({
  customer: z.string().min(1, "Preencha o nome do cliente"),
  dateOfSale: z.date({
    message: "Selecione a data da venda"
  }),
  value: z
    .string({
      required_error: "Preencha o valor da venda"
    })
    .refine(
      (value) => {
        const numberValue = currencyStringToNumber(value);

        return numberValue >= 1;
      },
      {
        message: "O valor mínimo é R$1"
      }
    )
});

type FormData = z.infer<typeof schema>;

export function useRegisterSaleModalController() {
  const [isOpen, setIsOpen] = useState(false);

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
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  return {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control
  };
}
