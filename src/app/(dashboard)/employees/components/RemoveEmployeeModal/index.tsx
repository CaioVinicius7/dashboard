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

import { useRemoveEmployeeModalController } from "./useRemoveEmployeeModalController";

interface RemoveEmployeeModalProps {
  employeeId: string;
}

export function RemoveEmployeeModal({ employeeId }: RemoveEmployeeModalProps) {
  const { handleRemoveEmployee, isLoading } =
    useRemoveEmployeeModalController();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center justify-center">
          <Trash2 className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover funcionário</DialogTitle>
          <DialogDescription>
            Esta ação é permanente e os dados do funcionário não poderão ser
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
            onClick={() => handleRemoveEmployee(employeeId)}
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