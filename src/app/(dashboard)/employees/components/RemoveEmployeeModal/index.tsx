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

import { useRemoveEmployeeModalController } from "./useRemoveEmployeeModalController";

interface RemoveEmployeeModalProps {
  employeeId: string;
}

export function RemoveEmployeeModal({ employeeId }: RemoveEmployeeModalProps) {
  const {
    isOpen,
    handleChangeModalVisibility,
    handleRemoveEmployee,
    isLoading
  } = useRemoveEmployeeModalController();

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModalVisibility}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-5" />
          <span className="sr-only">Remover funcionário</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Remover funcionário</DialogTitle>
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
            onClick={() => handleRemoveEmployee(employeeId)}
            isLoading={isLoading}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
