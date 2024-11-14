"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationProps {
  totalCount: number;
  page: number;
  perPage: number;
  pageName: string;
}

export function Pagination({
  totalCount,
  page,
  perPage,
  pageName
}: PaginationProps) {
  const searchParams = useSearchParams();

  const currentSearchParams = Object.fromEntries(searchParams.entries());

  if ("page" in currentSearchParams) {
    delete currentSearchParams["page"];
  }

  const searchParamsWithoutPage = new URLSearchParams(currentSearchParams);

  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between px-4">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="hidden text-sm font-medium md:block">
          Página {page} de {pages}
        </div>

        <PaginationRoot>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href={`${pageName}?${searchParamsWithoutPage}&page=1`}
                disabled={page <= 1}
              >
                <ChevronsLeft className="size-4" />
                <span className="sr-only">Primeira página</span>
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationPrevious
                href={`${pageName}?${searchParamsWithoutPage}&page=${page - 1}`}
                disabled={page <= 1}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href={`${pageName}?${searchParamsWithoutPage}&page=${page + 1}`}
                disabled={page >= pages}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href={`${pageName}?${searchParamsWithoutPage}&page=${pages}`}
                disabled={page >= pages}
              >
                <ChevronsRight className="size-4" />
                <span className="sr-only">Ultima página</span>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </PaginationRoot>
      </div>
    </div>
  );
}
