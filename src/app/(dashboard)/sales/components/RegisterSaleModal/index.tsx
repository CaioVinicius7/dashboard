"use client";

import { Plus } from "lucide-react";

import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/Input";
import { InputCurrency } from "@/components/InputCurrency";
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
import { Label } from "@/components/ui/label";

export function RegisterSaleModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto flex items-center gap-2">
          <Plus className="size-6" />
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar venda</DialogTitle>
          <DialogDescription>
            Preencha os dados da venda realizada.
          </DialogDescription>
        </DialogHeader>

        <form id="registerSaleForm" className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customer">Cliente</Label>
            <Input id="customer" autoComplete="off" />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="dateOfSale">Data da venda</Label>

              <DatePicker className="w-full" />
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="value">Valor</Label>

              <InputCurrency id="value" />
            </div>
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button variant="secondary" form="registerSaleForm">
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
