import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { employeesService } from "@/services/employees";

export function useRemoveEmployeeModalController() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  async function handleRemoveEmployee(employeeId: string) {
    try {
      setIsLoading(true);

      await await new Promise((resolve) => setTimeout(resolve, 2000));

      const hasSuccess = await employeesService.remove({
        id: employeeId
      });

      if (!hasSuccess) {
        toast({
          description: "Ocorreu um erro ao remover o funcionário.",
          variant: "destructive"
        });

        return;
      }

      toast({
        description: "Funcionário removido com sucesso!"
      });

      router.refresh();
    } catch {
      toast({
        description: "Ocorreu um erro ao remover o funcionário.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleRemoveEmployee, isLoading };
}
