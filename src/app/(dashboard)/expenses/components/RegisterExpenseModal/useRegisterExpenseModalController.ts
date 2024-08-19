import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, isBefore, isSameDay, isValid, parse } from "date-fns";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { useWindowSize } from "@/hooks/useWindowSize";
import { expensesService } from "@/services/expenses";
import { currencyStringToNumber } from "@/utils/currencyStringToNumber";

const schema = z.object({
  title: z.string().min(3, "Preencha o título"),
  dateOfOccurrence: z
    .date({
      message: "Selecione a data da despesa"
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
      required_error: "Preencha o valor da despesa"
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

export function useRegisterExpenseModalController() {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync: registerExpenseFn, isPending } = useMutation({
    mutationFn: expensesService.register
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
    setValue,
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await registerExpenseFn({
        ...data,
        dateOfOccurrence:
          data.dateOfOccurrence instanceof Date
            ? data.dateOfOccurrence.toISOString()
            : parse(
                data.dateOfOccurrence,
                "dd/MM/yyyy",
                new Date()
              ).toISOString(),
        value: currencyStringToNumber(data.value)
      });

      reset();

      handleChangeModalVisibility();

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

  const { width: windowWidth } = useWindowSize();

  const windowWidthIsSmOrAbove = windowWidth >= 640;

  const watchedValues = useWatch({
    control
  });

  const dateOfOccurrence = watchedValues.dateOfOccurrence;

  useEffect(() => {
    if (windowWidthIsSmOrAbove && typeof dateOfOccurrence === "string") {
      setValue(
        "dateOfOccurrence",
        parse(dateOfOccurrence, "dd/MM/yyyy", new Date())
      );
    }

    if (!windowWidthIsSmOrAbove && dateOfOccurrence instanceof Date) {
      setValue("dateOfOccurrence", format(dateOfOccurrence, "dd/MM/yyyy"));
    }
  }, [windowWidthIsSmOrAbove, setValue, dateOfOccurrence]);

  return {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    errors,
    control,
    isLoading: isPending && isSubmitting
  };
}
