"use client";

import { ChevronLeftIcon, ChevronRightIcon, Filter } from "lucide-react";

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
import { MONTHS } from "@/utils/constants";

import { useFiltersModalController } from "./useFiltersModalController";

export function FiltersModal() {
  const { selectedYear, handleChangeYear } = useFiltersModalController();

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

        <form id="applyFilters" className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Cliente</Label>
            <Input id="name" autoComplete="off" />
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

            <div>
              <Label>Mês</Label>

              <Select>
                <SelectTrigger id="role" className="mt-2 w-full">
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
