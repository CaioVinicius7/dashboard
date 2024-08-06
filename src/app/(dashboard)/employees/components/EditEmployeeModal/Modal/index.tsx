"use client";

import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Controller } from "react-hook-form";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { Employee } from "@/entities/Employee";
import { cn } from "@/lib/utils";

import { useModalController } from "./useModalController";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export function Modal({ isOpen, onClose, employee }: ModalProps) {
  const { register, handleSubmit, errors, isSubmitting, control, ROLES } =
    useModalController({
      employee,
      closeModal: onClose
    });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="size-5" />
          <span className="sr-only">Editar funcionário</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[92%] px-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Editar funcionário</DialogTitle>
          <DialogDescription>
            Insira as novas informações do funcionário nos campos abaixo para
            realizar a atualização.
          </DialogDescription>
        </DialogHeader>

        <form
          id="editEmployeeForm"
          onSubmit={handleSubmit}
          className="mt-4 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              autoComplete="off"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="role">Cargo</Label>

              <div className="w-full space-y-2">
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { onChange } }) => (
                    <Select
                      onValueChange={onChange}
                      defaultValue={employee.role}
                    >
                      <SelectTrigger
                        id="role"
                        className={cn(
                          "w-full",
                          !!errors.role?.message && "border-red-400"
                        )}
                      >
                        <SelectValue placeholder="escolha o cargo" />
                      </SelectTrigger>

                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {!!errors.role?.message && (
                  <span className="text-xs text-red-400">
                    {errors.role?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-1/2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>

                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur } }) => (
                    <InputMask
                      id="phone"
                      mask="(99) 9 9999-9999"
                      placeholder="(35) 9 9999-9999"
                      onChange={onChange}
                      defaultValue={employee.phone}
                      onBlur={onBlur}
                      error={errors.phone?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="entryDate">Data de ingressão</Label>

              <Controller
                control={control}
                name="entryDate"
                render={({ field: { value, onChange, onBlur } }) => (
                  <InputMask
                    id="entryDate"
                    mask="99/99/9999"
                    placeholder={format(new Date(), "dd/LL/y")}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.entryDate?.message}
                  />
                )}
              />
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="salary">Salário</Label>

              <Controller
                control={control}
                name="salary"
                render={({ field: { value, onChange } }) => (
                  <InputCurrency
                    id="salary"
                    value={value}
                    onChange={onChange}
                    error={errors.salary?.message}
                  />
                )}
              />
            </div>
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            variant="secondary"
            form="editEmployeeForm"
            disabled={isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
