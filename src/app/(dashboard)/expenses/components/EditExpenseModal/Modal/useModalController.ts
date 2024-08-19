import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import type { Expense } from "@/entities/Expense";
import { useWindowSize } from "@/hooks/useWindowSize";
import { expensesService } from "@/services/expenses";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";
import type { OmitTyped } from "@/utils/typeUtils";

const schema = z.object({
  title: z
    .string()
    .min(3, "Preencha o título")
    .transform((value) => value.toLowerCase()),
  dateOfOccurrence: z
    .date({
      message: "Selecione a data da despesa"
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
        required_error: "Preencha o valor da despesa"
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
    )
});

type FormData = z.infer<typeof schema>;

interface UseModalControllerParams {
  expense: OmitTyped<Expense, "createdAt" | "updatedAt">;
  closeModal: () => void;
}

export function useModalController({
  expense,
  closeModal
}: UseModalControllerParams) {
  const { width: windowWidth } = useWindowSize();

  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync: editExpenseFn, isPending } = useMutation({
    mutationFn: expensesService.edit
  });

  const windowWidthIsSmOrAbove = windowWidth >= 640;

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: expense.title,
      value: expense.value,
      dateOfOccurrence: windowWidthIsSmOrAbove
        ? new Date(expense.dateOfOccurrence)
        : format(new Date(expense.dateOfOccurrence), "dd/MM/yyyy")
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await editExpenseFn({
        id: expense.id,
        data: {
          ...data,
          value: currencyStringToNumber(data.value),
          dateOfOccurrence:
            data.dateOfOccurrence instanceof Date
              ? data.dateOfOccurrence.toISOString()
              : parse(
                  data.dateOfOccurrence,
                  "dd/MM/yyyy",
                  new Date()
                ).toISOString()
        }
      });

      reset();

      closeModal();

      toast({
        description: "Despesa registrada com sucesso!"
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
        description: "Ocorreu um erro ao registar a despesa.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (windowWidthIsSmOrAbove) {
      setValue("dateOfOccurrence", new Date(expense.dateOfOccurrence));

      clearErrors("dateOfOccurrence");
    } else {
      setValue(
        "dateOfOccurrence",
        format(new Date(expense.dateOfOccurrence), "dd/MM/yyyy")
      );

      clearErrors("dateOfOccurrence");
    }
  }, [windowWidthIsSmOrAbove, setValue, clearErrors, expense.dateOfOccurrence]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    isPending: isPending && isSubmitting
  };
}
