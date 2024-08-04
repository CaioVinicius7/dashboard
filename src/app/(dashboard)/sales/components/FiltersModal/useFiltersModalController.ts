import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
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
  month: z.coerce.number().optional()
});

type FormData = z.infer<typeof schema>;

export function useFiltersModalController() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      year: new Date().getFullYear()
    }
  });

  const selectedYear = watch("year");

  function handleChangeYear(step: number) {
    setValue("year", selectedYear + step);
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const newSearchParams = new URLSearchParams();

    if (!!data.customer) {
      newSearchParams.set("customer", data.customer);
    }

    if (!!data.year) {
      newSearchParams.set("year", data.year.toString());
    }

    if (!!data.month) {
      newSearchParams.set("month", data.month.toString());
    }

    newSearchParams.set("page", "1");

    router.push(`${pathname}?${newSearchParams}`);
  });

  function handleResetFilters() {
    reset();

    router.push(pathname);
  }

  return {
    register,
    handleSubmit,
    selectedYear,
    handleChangeYear,
    control,
    errors,
    handleResetFilters
  };
}
