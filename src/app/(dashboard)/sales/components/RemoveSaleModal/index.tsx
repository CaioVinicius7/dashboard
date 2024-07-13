"use client";

import { LoaderCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { useRemoveSaleModalController } from "./useRemoveSaleModalController";

interface RemoveSaleModalProps {
  saleId: string;
}

export function RemoveSaleModal({ saleId }: RemoveSaleModalProps) {
  const { handleRemoveSale, isLoading } = useRemoveSaleModalController();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-5" />
          <span className="sr-only">Remover venda</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover venda</DialogTitle>
          <DialogDescription>
            Esta ação é permanente e os dados da venda não poderão ser
            recuperados. Por favor, confirme que você deseja prosseguir com a
            remoção.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={() => handleRemoveSale(saleId)}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="size-4 w-11 animate-spin" />
            ) : (
              "Excluir"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
