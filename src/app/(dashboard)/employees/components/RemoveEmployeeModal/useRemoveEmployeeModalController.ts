import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { employeesService } from "@/services/employees";

export function useRemoveEmployeeModalController() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  function handleToggleModalVisibility() {
    setIsOpen((state) => !state);
  }

  async function handleRemoveEmployee(employeeId: string) {
    try {
      setIsLoading(true);

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

      handleToggleModalVisibility();

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

  return {
    isOpen,
    handleToggleModalVisibility,
    handleRemoveEmployee,
    isLoading
  };
}
