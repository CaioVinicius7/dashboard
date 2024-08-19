import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { employeesService } from "@/services/employees";

export function useRemoveEmployeeModalController() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const { mutateAsync: removeEmployeeFn, isPending: isLoading } = useMutation({
    mutationFn: employeesService.remove
  });

  function handleChangeModalVisibility() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  async function handleRemoveEmployee(employeeId: string) {
    try {
      await removeEmployeeFn({
        id: employeeId
      });

      toast({
        description: "Funcionário removido com sucesso!"
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
        description: "Ocorreu um erro ao remover o funcionário.",
        variant: "destructive"
      });
    }
  }

  return {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveEmployee,
    isLoading
  };
}
