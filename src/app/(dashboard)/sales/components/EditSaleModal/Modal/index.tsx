import { format } from "date-fns";
import { Plus, Trash2 } from "lucide-react";
import { Controller } from "react-hook-form";

import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/Input";
import { InputCurrency } from "@/components/InputCurrency";
import { InputMask } from "@/components/InputMask";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Sale } from "@/entities/Sale";
import { cn } from "@/lib/utils";
import type { OmitTyped } from "@/utils/typeUtils";

import { useModalController } from "./useModalController";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: OmitTyped<Sale, "createdAt" | "updatedAt">;
}

export function Modal({ isOpen, onClose, sale }: ModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    hasSaleReceiptUrls,
    saleReceiptUrlsFields,
    appendSaleReceiptField,
    removeSaleReceiptField
  } = useModalController({
    sale,
    closeModal: onClose
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Editar venda</DialogTitle>
          <DialogDescription>
            Insira as novas informações da venda nos campos abaixo para realizar
            a atualização.
          </DialogDescription>
        </DialogHeader>

        <form
          id="editSaleForm"
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

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="hidden space-y-2 sm:block sm:w-1/2">
              <Label htmlFor="dateOfSale">Data da venda</Label>

              <Controller
                control={control}
                name="dateOfSale"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    value={value instanceof Date ? value : undefined}
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

            <div className="block space-y-2 sm:hidden sm:w-1/2">
              <Label htmlFor="dateOfSale">Data da venda</Label>

              <Controller
                control={control}
                name="dateOfSale"
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputMask
                    id="entryDate"
                    mask="99/99/9999"
                    placeholder={format(new Date(), "dd/LL/y")}
                    value={typeof value == "string" ? value : undefined}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.dateOfSale?.message}
                  />
                )}
              />
            </div>

            <div className="space-y-2 sm:w-1/2">
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

          {hasSaleReceiptUrls && (
            <div className="space-y-2">
              <Label>URLs dos comprovantes de venda</Label>

              {saleReceiptUrlsFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder="https://exemplo.com/comprovante"
                    error={errors.saleReceiptUrls?.[index]?.url?.message}
                    {...register(`saleReceiptUrls.${index}.url` as const)}
                  />

                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => removeSaleReceiptField(index)}
                    className="flex items-center justify-center"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {saleReceiptUrlsFields.length < 3 && (
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
          )}
        </form>

        <div className="mt-2 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            variant="secondary"
            form="editSaleForm"
            disabled={isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
