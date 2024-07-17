import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TriggerProps {
  onOpen: () => void;
}

export default function Trigger({ onOpen }: TriggerProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onOpen}>
      <Pencil className="size-5" />
      <span className="sr-only">Editar venda</span>
    </Button>
  );
}
