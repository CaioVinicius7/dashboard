import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import type { Sale } from "@/entities/Sale";
import { salesService } from "@/services/sales";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";
import type { OmitTyped } from "@/utils/typeUtils";

const schema = z.object({
  customer: z.string().min(3, "Preencha o nome do cliente"),
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
    )
    .or(
      z
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
        )
    ),
  value: z
    .union([
      z.string({
        required_error: "Preencha o valor da venda"
      }),
      z.number()
    ])

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

interface UseModalControllerParams {
  sale: OmitTyped<Sale, "createdAt" | "updatedAt">;
  closeModal: () => void;
}

export function useModalController({
  sale,
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
      customer: sale.customer,
      dateOfSale: new Date(sale.dateOfSale),
      value: sale.value,
      saleReceiptUrls: sale.saleReceiptUrls?.map((url) => ({ url }))
    }
  });

  const {
    fields: saleReceiptUrlsFields,
    append,
    remove: removeSaleReceiptField
  } = useFieldArray({
    name: "saleReceiptUrls",
    control
  });

  const hasSaleReceiptUrls = saleReceiptUrlsFields.length >= 1;

  function appendSaleReceiptField() {
    append({
      url: ""
    });
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await salesService.edit({
        id: sale.id,
        data: {
          ...data,
          dateOfSale:
            data.dateOfSale instanceof Date
              ? data.dateOfSale.toISOString()
              : parse(data.dateOfSale, "dd/MM/yyyy", new Date()).toISOString(),
          value: currencyStringToNumber(data.value),
          saleReceiptUrls: data.saleReceiptUrls?.map(
            (saleReceiptUrl) => saleReceiptUrl.url
          )
        }
      });

      toast({
        description: "Venda editada com sucesso!"
      });

      router.refresh();

      closeModal();
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
        description: "Ocorreu um erro ao editar a venda.",
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
    hasSaleReceiptUrls,
    saleReceiptUrlsFields,
    appendSaleReceiptField,
    removeSaleReceiptField
  };
}
