import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { employeesService } from "@/services/employees";

export function useRemoveEmployeeModalController() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  function handleChangeModalVisibility() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  async function handleRemoveEmployee(employeeId: string) {
    try {
      setIsLoading(true);

      await employeesService.remove({
        id: employeeId
      });

      handleChangeModalVisibility();

      toast({
        description: "Funcionário removido com sucesso!"
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
        description: "Ocorreu um erro ao remover o funcionário.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveEmployee,
    isLoading
  };
}
