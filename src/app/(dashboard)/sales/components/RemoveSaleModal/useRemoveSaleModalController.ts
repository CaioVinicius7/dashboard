import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { salesService } from "@/services/sales";

export function useRemoveSaleModalController() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  function handleChangeModalVisibility() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  async function handleRemoveSale(saleId: string) {
    try {
      setIsLoading(true);

      await salesService.remove({
        id: saleId
      });

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
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveSale,
    isLoading
  };
}
