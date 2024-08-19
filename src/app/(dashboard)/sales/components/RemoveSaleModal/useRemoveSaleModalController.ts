import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { salesService } from "@/services/sales";

export function useRemoveSaleModalController() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const { mutateAsync: removeSaleFn, isPending: isLoading } = useMutation({
    mutationFn: salesService.remove
  });

  function handleChangeModalVisibility() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  async function handleRemoveSale(saleId: string) {
    try {
      await removeSaleFn({ id: saleId });

      toast({
        description: "Venda removida com sucesso!"
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
        description: "Ocorreu um erro ao remover a venda.",
        variant: "destructive"
      });
    }
  }

  return {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveSale,
    isLoading
  };
}
