import { BadgeDollarSign } from "lucide-react";

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
          <BadgeDollarSign />

          <h2 className="text-xl">Vendas</h2>
        </div>

        <Skeleton className="size-10 rounded-md" />
      </header>

      <main className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[102px]" />

          <Skeleton className="h-10 w-32" />
        </div>

        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[175px]">Valor</TableHead>
              <TableHead className="w-[175px]">Data da venda</TableHead>
              <TableHead className="w-[175px]">Telefone do cliente</TableHead>
              <TableHead className="w-[175px]">Status do pagamento</TableHead>
              <TableHead className="w-[150px]" />
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

                <TableCell>
                  <Skeleton className="w-30 h-10" />
                </TableCell>

                <TableCell className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10" />

                  <Skeleton className="h-10 w-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
