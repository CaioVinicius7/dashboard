"use client";

import { Plus, Trash2 } from "lucide-react";
import { Controller } from "react-hook-form";

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
import { cn } from "@/lib/utils";

import { useRegisterSaleModalController } from "./useRegisterSaleModalController";

export function RegisterSaleModal() {
  const {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    saleReceiptUrlsFields,
    appendSaleReceiptField,
    removeSaleReceiptField
  } = useRegisterSaleModalController();

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModalVisibility}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={handleChangeModalVisibility}
          className="ml-auto flex items-center gap-2"
        >
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

        <form
          id="registerSaleForm"
          onSubmit={handleSubmit}
          className="mt-4 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="customer">Cliente</Label>
            <Input
              id="customer"
              autoComplete="off"
              error={errors.customer?.message}
              {...register("customer")}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="dateOfSale">Data da venda</Label>

              <Controller
                control={control}
                name="dateOfSale"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    value={value}
                    onChange={onChange}
                    className={cn(
                      "w-full",
                      !!errors.dateOfSale?.message && "border-red-400"
                    )}
                  />
                )}
              />

              {!!errors.dateOfSale?.message && (
                <span className="text-xs text-red-400">
                  {errors.dateOfSale?.message}
                </span>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="value">Valor</Label>

              <Controller
                control={control}
                name="value"
                render={({ field: { value, onChange } }) => (
                  <InputCurrency
                    id="value"
                    value={value}
                    onChange={onChange}
                    error={errors.value?.message}
                  />
                )}
              />
            </div>
          </div>

          {saleReceiptUrlsFields.length >= 1 && (
            <div className="space-y-2">
              <Label>URLs dos comprovantes de venda</Label>

              {saleReceiptUrlsFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="https://exemplo.com/comprovante"
                    error={errors.saleReceiptUrls?.[index]?.url?.message}
                    {...register(`saleReceiptUrls.${index}.url`)}
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    onClick={() => removeSaleReceiptField(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={appendSaleReceiptField}
            className="gap-1"
          >
            <Plus className="size-4" />
            Adicionar comprovante
          </Button>
        </form>

        <div className="mt-2 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost" onClick={handleChangeModalVisibility}>
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant="secondary"
            form="registerSaleForm"
            disabled={isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}