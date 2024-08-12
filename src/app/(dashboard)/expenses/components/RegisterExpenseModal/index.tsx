"use client";

import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { Plus } from "lucide-react";
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
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useRegisterExpenseModalController } from "./useRegisterExpenseModalController";

export function RegisterExpenseModal() {
  const {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control
  } = useRegisterExpenseModalController();

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModalVisibility}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="size-6" />
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Registrar despesa</DialogTitle>
          <DialogDescription>Preencha os dados da despesa.</DialogDescription>
        </DialogHeader>

        <form
          id="registerExpenseForm"
          onSubmit={handleSubmit}
          className="mt-4 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              autoComplete="off"
              error={errors.title?.message}
              {...register("title")}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="hidden space-y-2 sm:block sm:w-1/2">
              <Label htmlFor="dateOfOccurrence">Data do ocorrido</Label>

              <Controller
                control={control}
                name="dateOfOccurrence"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    value={value instanceof Date ? value : undefined}
                    onChange={onChange}
                    className={cn(
                      "w-full",
                      !!errors.dateOfOccurrence?.message && "border-red-400"
                    )}
                  />
                )}
              />

              {!!errors.dateOfOccurrence?.message && (
                <span className="text-xs text-red-400">
                  {errors.dateOfOccurrence?.message}
                </span>
              )}
            </div>

            <div className="block space-y-2 sm:hidden sm:w-1/2">
              <Label htmlFor="dateOfOccurrence">Data do ocorrido</Label>

              <Controller
                control={control}
                name="dateOfOccurrence"
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputMask
                    id="entryDate"
                    mask="99/99/9999"
                    placeholder={format(new Date(), "dd/LL/y")}
                    value={typeof value == "string" ? value : undefined}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.dateOfOccurrence?.message}
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
        </form>

        <div className="mt-2 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            variant="secondary"
            form="registerExpenseForm"
            disabled={isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
