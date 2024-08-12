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
  DialogTitle
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
import { CURRENT_YEAR, MONTHS } from "@/utils/constants";

import { useFiltersModalController } from "./useFiltersModalController";

export function FiltersModal() {
  const {
    isOpen,
    handleChangeModalVisibility,
    register,
    handleSubmit,
    selectedYear,
    handleChangeYear,
    control,
    errors,
    handleResetFilters,
    monthIndex
  } = useFiltersModalController();

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeModalVisibility}>
      <Button
        variant="outline"
        onClick={handleChangeModalVisibility}
        className="flex items-center gap-2"
      >
        <Filter className="size-5" />
        Filtros
      </Button>

      <DialogContent className="w-5/6">
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
            <Label htmlFor="title">Título</Label>

            <Input
              id="title"
              autoComplete="off"
              error={errors.title?.message}
              {...register("title")}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0">
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
                  disabled={selectedYear === CURRENT_YEAR}
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
                    <Select
                      defaultValue={monthIndex ?? undefined}
                      onValueChange={onChange}
                    >
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
                        {MONTHS.map((month, index) => (
                          <SelectItem
                            key={month}
                            value={(index + 1).toString()}
                          >
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
          <Button type="button" variant="ghost" onClick={handleResetFilters}>
            Limpar filtros
          </Button>

          <Button variant="secondary" form="applyFilters">
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
