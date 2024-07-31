import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  customer: z
    .string()
    .min(3, "O campo precisa ter pelo menos 3 caracteres.")
    .or(z.string().length(0)),
  year: z
    .number()
    .max(
      new Date().getFullYear(),
      "O ano não pode ser maior do que o ano atual."
    ),
  month: z.string({
    required_error: "Selecione um mês."
  })
});

type FormData = z.infer<typeof schema>;

export function useFiltersModalController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      year: new Date().getFullYear()
    }
  });

  const selectedYear = watch("year");

  function handleChangeYear(step: number) {
    reset(
      {
        year: selectedYear + step
      },
      {
        keepErrors: true
      }
    );
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  return {
    register,
    handleSubmit,
    selectedYear,
    handleChangeYear,
    control,
    errors
  };
}
