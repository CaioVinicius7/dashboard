import { Users } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function Loading() {
  return (
    <>
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Users />

          <h2 className="text-xl">Funcionários</h2>
        </div>

        <Skeleton className="size-10 rounded-md" />
      </header>

      <main className="space-y-4 p-4">
        <Skeleton className="ml-auto h-10 w-32" />

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
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Skeleton className="h-5 w-72" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>

                <TableCell className="flex items-center gap-2">
                  <Skeleton className="h-10 w-12" />

                  <Skeleton className="h-10 w-12" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
