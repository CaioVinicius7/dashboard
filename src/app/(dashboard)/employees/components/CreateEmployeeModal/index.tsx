import { format } from "date-fns";
import { UserPlus } from "lucide-react";

import { InputCurrency } from "@/components/InputCurrency";
import { InputMask } from "@/components/InputMask";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function CreateEmployeeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto flex items-center gap-2">
          <UserPlus className="size-6" />
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar funcionário</DialogTitle>
          <DialogDescription>
            Preencha os dados do funcionário que deseja cadastrar.
          </DialogDescription>
        </DialogHeader>

        <form id="CreateEmployeeForm" className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="role">Cargo</Label>

              <div className="w-full">
                <Select>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="escolha o cargo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="serrador">Serrador</SelectItem>
                    <SelectItem value="motorista">Motorista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-1/2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>

                <InputMask
                  id="phone"
                  mask="(99) 9 9999-9999"
                  placeholder="(35) 9 9999-9999"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="entryDate">Data de ingressão</Label>

              <InputMask
                id="entryDate"
                mask="99/99/9999"
                placeholder={format(new Date(), "dd/LL/y")}
              />
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="salary">Salário</Label>
              <InputCurrency id="salary" />
            </div>
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button variant="secondary" form="CreateEmployeeForm">
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
