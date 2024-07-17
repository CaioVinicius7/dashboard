"use client";

import { useState } from "react";

import type { Sale } from "@/entities/Sale";
import type { OmitTyped } from "@/utils/typeUtils";

import { Modal } from "./Modal";
import EditSaleModalTrigger from "./Trigger";

interface EditSaleModalProps {
  sale: OmitTyped<Sale, "createdAt" | "updatedAt">;
}

export function EditSaleModal({ sale }: EditSaleModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EditSaleModalTrigger onOpen={() => setIsOpen(true)} />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} sale={sale} />
      )}
    </>
  );
}
