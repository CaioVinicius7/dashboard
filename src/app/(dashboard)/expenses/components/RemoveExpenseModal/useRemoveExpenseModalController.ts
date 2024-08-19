import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { expensesService } from "@/services/expenses";

export function useRemoveExpenseModalController() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const { mutateAsync: removeExpenseFn, isPending: isLoading } = useMutation({
    mutationFn: expensesService.remove
  });

  function handleChangeModalVisibility() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  async function handleRemoveExpense(expenseId: string) {
    try {
      await removeExpenseFn({
        id: expenseId
      });

      toast({
        description: "Despesa removida com sucesso!"
      });

      handleChangeModalVisibility();

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
        description: "Ocorreu um erro ao remover a Despesa.",
        variant: "destructive"
      });
    }
  }

  return {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveExpense,
    isLoading
  };
}
