import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore, isSameDay } from "date-fns";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { currencyStringToNumber } from "@/utils/currencyStringToNumber";

const schema = z.object({
  customer: z.string().min(1, "Preencha o nome do cliente"),
  dateOfSale: z
    .date({
      message: "Selecione a data da venda"
    })
    .refine(
      (value) => {
        const currentDate = new Date();

        return isBefore(value, currentDate) || isSameDay(value, currentDate);
      },
      {
        message: "A data deve ser igual ou anterior à data atual"
      }
    ),
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
    ),
  saleReceiptUrls: z
    .array(
      z.object({
        url: z.string().url("Preencha com uma URL válida")
      })
    )
    .optional()
});

type FormData = z.infer<typeof schema>;

export function useRegisterSaleModalController() {
  const [isOpen, setIsOpen] = useState(false);

  function handleChangeModalVisibility() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      reset();
      removeSaleReceiptField();
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

  const {
    fields: saleReceiptUrlsFields,
    append,
    remove: removeSaleReceiptField
  } = useFieldArray({
    name: "saleReceiptUrls",
    control
  });

  function appendSaleReceiptField() {
    append({
      url: ""
    });
  }

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
    control,
    saleReceiptUrlsFields,
    appendSaleReceiptField,
    removeSaleReceiptField
  };
}
