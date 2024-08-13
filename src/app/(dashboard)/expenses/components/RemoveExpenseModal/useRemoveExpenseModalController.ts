import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { expensesService } from "@/services/expenses";

export function useRemoveExpenseModalController() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  async function handleRemoveExpense(expenseId: string) {
    try {
      setIsLoading(true);

      await expensesService.remove({
        id: expenseId
      });

      toast({
        description: "Despesa removida com sucesso!"
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
        description: "Ocorreu um erro ao remover a Despesa.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleRemoveExpense,
    isLoading
  };
}
