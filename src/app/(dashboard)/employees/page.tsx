import { Pencil, Trash2 } from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { CreateEmployeeModal } from "./components/CreateEmployeeModal";

export default function Employees() {
  return (
    <>
      <Header title="Funcionários" />

      <main className="space-y-4 p-4">
        <CreateEmployeeModal />

        <Table className="min-w-[1000px]">
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
          </TableBody>
        </Table>
      </main>
    </>
  );
}
