"use client";

import { useState } from "react";

import type { Sale } from "@/entities/Sale";
import type { OmitTyped } from "@/utils/typeUtils";

import { Modal } from "./Modal";
import { Trigger } from "./Trigger";

interface EditSaleModalProps {
  sale: OmitTyped<Sale, "createdAt" | "updatedAt">;
}

export function EditSaleModal({ sale }: EditSaleModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Trigger onOpen={() => setIsOpen(true)} />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} sale={sale} />
      )}
    </>
  );
}
