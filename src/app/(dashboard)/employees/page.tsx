import { format } from "date-fns";
import { Pencil, Trash2, UserPlus } from "lucide-react";

import { Header } from "@/components/Header";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function Employees() {
  return (
    <>
      <Header title="Funcionários" />

      <main className="space-y-4 p-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto flex items-center gap-2"
              >
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

              <form className="mt-4 space-y-6">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2 space-y-2">
                    <Label>Cargo</Label>

                    <div className="w-full">
                      <Select>
                        <SelectTrigger className="w-full">
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
                      <Label>Telefone</Label>

                      <InputMask
                        mask="(99) 9 9999-9999"
                        placeholder="(35) 9 9999-9999"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2 space-y-2">
                    <Label>Data de ingressão</Label>

                    <InputMask
                      mask="99/99/9999"
                      placeholder={format(new Date(), "dd/LL/y")}
                    />
                  </div>

                  <div className="w-1/2 space-y-2">
                    <Label>Salário</Label>
                    <InputCurrency />
                  </div>
                </div>
              </form>

              <div className="mt-6 flex justify-end gap-4">
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>

                <Button variant="secondary">Enviar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px]">Cargo</TableHead>
                <TableHead className="w-[150px]">Contato</TableHead>
                <TableHead className="w-[175px]">Data de ingressão</TableHead>
                <TableHead className="w-[150px]">Salário</TableHead>
                <TableHead className="w-[150px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Ellen Cristina Pimentel Diógenes de Carvalho
                </TableCell>
                <TableCell>Serrador</TableCell>
                <TableCell>(12) 9 4002-8922</TableCell>
                <TableCell>03/06/2024</TableCell>
                <TableCell>R$ 1250.00</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Pencil className="size-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Ellen Cristina Pimentel Diógenes de Carvalho
                </TableCell>
                <TableCell>Serrador</TableCell>
                <TableCell>(12) 9 4002-8922</TableCell>
                <TableCell>03/06/2024</TableCell>
                <TableCell>R$ 1250.00</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Pencil className="size-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">
                  Ellen Cristina Pimentel Diógenes de Carvalho
                </TableCell>
                <TableCell>Serrador</TableCell>
                <TableCell>(12) 9 4002-8922</TableCell>
                <TableCell>03/06/2024</TableCell>
                <TableCell>R$ 1250.00</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Pencil className="size-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
