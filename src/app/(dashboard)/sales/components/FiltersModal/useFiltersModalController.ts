import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { CURRENT_YEAR } from "@/utils/constants";

const schema = z.object({
  customer: z
    .string()
    .min(3, "O campo precisa ter pelo menos 3 caracteres.")
    .or(z.string().length(0)),
  paymentStatus: z.enum(["all", "complete", "pending"]).default("all"),
  year: z
    .number()
    .max(CURRENT_YEAR, "O ano não pode ser maior do que o ano atual."),
  month: z.coerce.number().optional()
});

type FormData = z.infer<typeof schema>;

export function useFiltersModalController() {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const monthIndex = searchParams.get("month");

  function handleChangeModalVisibility() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customer: searchParams.get("customer") ?? undefined,
      paymentStatus:
        (searchParams.get("paymentStatus") as FormData["paymentStatus"]) ??
        "all",
      year: searchParams.get("year")
        ? Number(searchParams.get("year"))
        : CURRENT_YEAR,
      month: monthIndex ? Number(monthIndex) : undefined
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

    if (!!data.paymentStatus) {
      newSearchParams.set("paymentStatus", data.paymentStatus);
    }

    if (!!data.year) {
      newSearchParams.set("year", data.year.toString());
    }

    if (!!data.month) {
      newSearchParams.set("month", data.month.toString());
    }

    newSearchParams.set("page", "1");

    toast({
      description: "Os filtros foram aplicados com sucesso."
    });

    handleChangeModalVisibility();

    router.push(`${pathname}?${newSearchParams}`);
  });

  function handleResetFilters() {
    toast({
      description: "Os filtros foram limpados com sucesso."
    });

    setValue("year", CURRENT_YEAR);

    handleChangeModalVisibility();

    router.push(pathname);
  }

  return {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    selectedYear,
    handleChangeYear,
    control,
    errors,
    handleResetFilters,
    monthIndex
  };
}
