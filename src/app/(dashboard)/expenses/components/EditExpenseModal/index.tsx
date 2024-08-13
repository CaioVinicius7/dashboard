"use client";

import { useState } from "react";

import type { Expense } from "@/entities/Expense";
import type { OmitTyped } from "@/utils/typeUtils";

import { Modal } from "./Modal";
import { Trigger } from "./Trigger";

interface EditExpenseModalProps {
  expense: OmitTyped<Expense, "createdAt" | "updatedAt">;
}

export function EditExpenseModal({ expense }: EditExpenseModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Trigger onOpen={() => setIsOpen(true)} />

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          expense={expense}
        />
      )}
    </>
  );
}
