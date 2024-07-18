"use client";

import { useState } from "react";

import type { Employee } from "@/entities/Employee";

import { Modal } from "./Modal";
import Trigger from "./Trigger";

interface EditEmployeeModalProps {
  employee: Employee;
}

export function EditEmployeeModal({ employee }: EditEmployeeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Trigger onOpen={() => setIsOpen(true)} />

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          employee={employee}
        />
      )}
    </>
  );
}
