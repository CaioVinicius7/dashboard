import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { useWindowSize } from "@/hooks/useWindowSize";
import { salesService } from "@/services/sales";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";

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

export function useRegisterSaleModalController() {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync: registerSaleFn, isPending } = useMutation({
    mutationFn: salesService.register
  });

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
    setValue,
    reset,
    watch
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

  const hasSaleReceiptUrls = saleReceiptUrlsFields.length >= 1;

  const saleReceiptUrls = watch("saleReceiptUrls");
  const hasSalesReceiptFilledIn =
    hasSaleReceiptUrls &&
    saleReceiptUrls?.every((saleReceiptUrl) => saleReceiptUrl.url);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await registerSaleFn({
        ...data,
        occurredAt:
          data.occurredAt instanceof Date
            ? data.occurredAt.toISOString()
            : parse(data.occurredAt, "dd/MM/yyyy", new Date()).toISOString(),
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
        description: "Ocorreu um erro ao registar a venda.",
        variant: "destructive"
      });
    }
  });

  const { width: windowWidth } = useWindowSize();

  const windowWidthIsSmOrAbove = windowWidth >= 640;

  const watchedValues = useWatch({
    control
  });

  const occurredAt = watchedValues.occurredAt;

  useEffect(() => {
    if (windowWidthIsSmOrAbove && typeof occurredAt === "string") {
      setValue("occurredAt", parse(occurredAt, "dd/MM/yyyy", new Date()));
    }

    if (!windowWidthIsSmOrAbove && occurredAt instanceof Date) {
      setValue("occurredAt", format(occurredAt, "dd/MM/yyyy"));
    }
  }, [windowWidthIsSmOrAbove, setValue, occurredAt]);

  return {
    isOpen,
    handleChangeModalVisibility,
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
