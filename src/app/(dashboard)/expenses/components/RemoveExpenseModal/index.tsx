"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { useRemoveExpenseModalController } from "./useRemoveExpenseModalController";

interface RemoveExpenseModalProps {
  expenseId: string;
}

export function RemoveExpenseModal({ expenseId }: RemoveExpenseModalProps) {
  const {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveExpense,
    isLoading
  } = useRemoveExpenseModalController();

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModalVisibility}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-5" />
          <span className="sr-only">Remover despesa</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Remover despesa</DialogTitle>
          <DialogDescription>
            Confirme que você deseja prosseguir com a remoção.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={() => handleRemoveExpense(expenseId)}
            isLoading={isLoading}
          >
            Remover
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
