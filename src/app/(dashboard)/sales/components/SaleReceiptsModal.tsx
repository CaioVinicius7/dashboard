"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";

interface SaleReceiptsModalProps {
  saleReceiptsUrl?: string[];
}

export function SaleReceiptsModal({ saleReceiptsUrl }: SaleReceiptsModalProps) {
  const hasSaleReceipts = saleReceiptsUrl && saleReceiptsUrl?.length >= 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-30 h-10 text-xs"
          disabled={!hasSaleReceipts}
        >
          Ver comprovantes
        </Button>
      </DialogTrigger>

      <DialogContent className="w-fit">
        <DialogTitle>Comprovantes de pagamento</DialogTitle>
        <DialogDescription>
          Clique em um dos links abaixo para visualizar o comprovante
        </DialogDescription>

        <ul className="mt-2 space-y-2">
          {hasSaleReceipts &&
            saleReceiptsUrl.map((url) => (
              <li key={url}>
                <Button variant="link" asChild>
                  <Link href={url} target="_blank" className="flex gap-2 px-0">
                    <ExternalLink className="size-5" />
                    {url}
                  </Link>
                </Button>
              </li>
            ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
