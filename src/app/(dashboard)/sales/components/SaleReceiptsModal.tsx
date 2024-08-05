import { DialogTitle } from "@radix-ui/react-dialog";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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

      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>Comprovantes de pagamento</DialogTitle>
          <DialogDescription>
            Clique em um dos links abaixo para visualizar o comprovante
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3 truncate">
          {hasSaleReceipts &&
            saleReceiptsUrl.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                className="flex max-w-full items-center gap-2 px-0 text-sm text-primary underline-offset-4 hover:underline"
                rel="noreferrer"
              >
                <ExternalLink className="size-5 shrink-0" />
                <span className="truncate">{url}</span>
              </a>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
