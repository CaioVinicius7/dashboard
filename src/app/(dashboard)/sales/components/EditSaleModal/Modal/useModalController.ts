import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import type { Sale } from "@/entities/Sale";
import { useWindowSize } from "@/hooks/useWindowSize";
import { salesService } from "@/services/sales";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";
import type { OmitTyped } from "@/utils/typeUtils";

const schema = z.object({
  customer: z.string().min(3, "Preencha o nome do cliente"),
  customerContact: z
    .string()
    .optional()
    .refine((value) => !value || value.length === 16, {
      message: "Preencha o telefone corretamente"
    })
    .transform((value) => (value === "" ? null : value)),
  occurredAt: z
    .date({
      message: "Selecione a data da venda"
    })
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
    )
    .refine(
      (value) => {
        const currentDate = new Date();

        let date = value;

        if (typeof value === "string") {
          date = parse(value, "dd/MM/yyyy", new Date());
        }

        return isBefore(date, currentDate) || isSameDay(date, currentDate);
      },
      {
        message: "A data deve ser igual ou anterior à data atual"
      }
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
  paymentIsComplete: z
    .union([z.literal("on"), z.literal("off"), z.boolean()])
    .transform((value) => value === true || value === "on")
    .default(false),
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
  const { width: windowWidth } = useWindowSize();

  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync: editSaleFn, isPending } = useMutation({
    mutationFn: salesService.edit
  });

  const windowWidthIsSmOrAbove = windowWidth >= 640;

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
    control,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customer: sale.customer,
      customerContact: sale.customerContact,
      occurredAt: windowWidthIsSmOrAbove
        ? new Date(sale.occurredAt)
        : format(new Date(sale.occurredAt), "dd/MM/yyyy"),
      value: sale.value,
      saleReceiptUrls: sale.saleReceiptUrls?.map((url) => ({ url })),
      paymentIsComplete: sale.paymentIsComplete
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

  const saleReceiptUrls = watch("saleReceiptUrls");
  const hasSalesReceiptFilledIn =
    hasSaleReceiptUrls &&
    saleReceiptUrls?.every((saleReceiptUrl) => saleReceiptUrl.url);

  function appendSaleReceiptField() {
    append({
      url: ""
    });
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await editSaleFn({
        id: sale.id,
        data: {
          ...data,
          occurredAt:
            data.occurredAt instanceof Date
              ? data.occurredAt.toISOString()
              : parse(data.occurredAt, "dd/MM/yyyy", new Date()).toISOString(),
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

  useEffect(() => {
    if (windowWidthIsSmOrAbove) {
      setValue("occurredAt", new Date(sale.occurredAt));
      clearErrors("occurredAt");
    } else {
      setValue("occurredAt", format(new Date(sale.occurredAt), "dd/MM/yyyy"));
      clearErrors("occurredAt");
    }
  }, [windowWidthIsSmOrAbove, setValue, clearErrors, sale.occurredAt]);

  return {
    register,
    handleSubmit,
    errors,
    control,
    hasSaleReceiptUrls,
    saleReceiptUrlsFields,
    appendSaleReceiptField,
    removeSaleReceiptField,
    hasSalesReceiptFilledIn,
    isLoading: isPending && isSubmitting
  };
}
