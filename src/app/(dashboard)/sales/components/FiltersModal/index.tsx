"use client";

import { ChevronLeftIcon, ChevronRightIcon, Filter } from "lucide-react";
import { Controller } from "react-hook-form";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/constants";

import { useFiltersModalController } from "./useFiltersModalController";

export function FiltersModal() {
  const {
    register,
    handleSubmit,
    selectedYear,
    handleChangeYear,
    control,
    errors
  } = useFiltersModalController();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="size-5" />
          Filtros
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aplicar Filtros</DialogTitle>
          <DialogDescription>
            Selecione os filtros desejados para refinar os resultados exibidos.
          </DialogDescription>
        </DialogHeader>

        <form
          id="applyFilters"
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

          <div className="mt-4 grid grid-cols-2">
            <div>
              <Label>Ano</Label>

              <div className="mt-2 flex w-52 items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleChangeYear(-1)}
                  className="flex h-12 w-12 items-center justify-center"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>

                <div className="flex-1text-center">
                  <span className="text-sm font-medium tracking-[-0.5px]">
                    {selectedYear}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleChangeYear(1)}
                  disabled={selectedYear === new Date().getFullYear()}
                  className="flex h-12 w-12 items-center justify-center disabled:opacity-50"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mês</Label>

              <div className="w-full space-y-2">
                <Controller
                  control={control}
                  name="month"
                  render={({ field: { onChange } }) => (
                    <Select onValueChange={onChange}>
                      <SelectTrigger
                        id="role"
                        className={cn(
                          "w-full",
                          !!errors.month?.message && "border-red-400"
                        )}
                      >
                        <SelectValue placeholder="escolha o mês" />
                      </SelectTrigger>

                      <SelectContent>
                        {MONTHS.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {!!errors.month?.message && (
                  <span className="text-xs text-red-400">
                    {errors.month?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="ghost">Limpar filtros</Button>

          <Button variant="secondary" form="applyFilters">
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}