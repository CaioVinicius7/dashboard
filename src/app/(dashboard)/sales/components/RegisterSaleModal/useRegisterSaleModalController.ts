import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore, isSameDay } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { SalesService } from "@/services/sales";
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

  const { toast } = useToast();

  const router = useRouter();

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
    try {
      await SalesService.register({
        ...data,
        value: currencyStringToNumber(data.value),
        saleReceiptUrls: data.saleReceiptUrls?.map(
          (saleReceiptUrl) => saleReceiptUrl.url
        )
      });

      reset();

      handleChangeModalVisibility();

      toast({
        description: "Venda registrada com sucesso!"
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
    isSubmitting,
    control,
    saleReceiptUrlsFields,
    appendSaleReceiptField,
    removeSaleReceiptField
  };
}
